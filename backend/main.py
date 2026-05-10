import json
import math
from pathlib import Path

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, field_validator

app = FastAPI(title="Mithril Plastics Quote API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://mithrilplastics.com",
        "https://www.mithrilplastics.com",
        "http://localhost:3000",  # remove after dev
    ],
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

with open(Path(__file__).parent / "config.json") as f:
    CONFIG = json.load(f)


class QuoteRequest(BaseModel):
    volume_cm3: float
    bbox: dict  # {"x": float, "y": float, "z": float} in mm
    process: str
    material: str
    quantity: int

    @field_validator("volume_cm3")
    @classmethod
    def positive_volume(cls, v):
        if v <= 0:
            raise ValueError("Volume must be positive")
        return round(v, 4)

    @field_validator("quantity")
    @classmethod
    def positive_qty(cls, v):
        if v < 1:
            raise ValueError("Quantity must be at least 1")
        return v


def get_discount(quantity: int) -> float:
    for tier in CONFIG["quantity_breaks"]:
        if quantity >= tier["min"] and (tier["max"] is None or quantity <= tier["max"]):
            return tier["discount"]
    return 0.0


def fits_in_volume(bbox: dict, process: str) -> bool:
    """Check fit allowing any orientation by comparing sorted dimensions."""
    part_dims = sorted([bbox["x"], bbox["y"], bbox["z"]])
    bv = CONFIG["build_volumes"][process]
    build_dims = sorted([bv["x"], bv["y"], bv["z"]])
    return all(p <= b for p, b in zip(part_dims, build_dims))


def estimate_lead_time(quantity: int, print_hours_each: float) -> int:
    total_hours = quantity * print_hours_each
    # 16 productive machine-hours per day
    production_days = math.ceil(total_hours / 16)
    return max(3, production_days + 2)  # min 3 days for handling + QC


@app.get("/health")
def health():
    return {"status": "ok"}


@app.get("/materials/{process}")
def get_materials(process: str):
    if process not in CONFIG["materials"]:
        raise HTTPException(status_code=400, detail=f"Unknown process: {process}")
    return {k: v["label"] for k, v in CONFIG["materials"][process].items()}


@app.post("/quote")
def calculate_quote(req: QuoteRequest):
    if req.process not in CONFIG["materials"]:
        raise HTTPException(status_code=400, detail=f"Unknown process: {req.process}")

    process_materials = CONFIG["materials"][req.process]
    if req.material not in process_materials:
        raise HTTPException(
            status_code=400,
            detail=f"Material '{req.material}' not available for {req.process}",
        )

    if not fits_in_volume(req.bbox, req.process):
        bv = CONFIG["build_volumes"][req.process]
        raise HTTPException(
            status_code=422,
            detail=f"Part exceeds {req.process} build volume "
                   f"({bv['x']} × {bv['y']} × {bv['z']} mm)",
        )

    mat = process_materials[req.material]
    machine = CONFIG["machine_rates"][req.process]

    material_cost = req.volume_cm3 * mat["rate"]
    print_hours = req.volume_cm3 / machine["cm3_per_hr"]
    machine_cost = print_hours * machine["rate_per_hr"]
    base_unit_price = material_cost + machine_cost

    discount = get_discount(req.quantity)
    unit_price = base_unit_price * (1 - discount)
    total = unit_price * req.quantity

    return {
        "process": req.process,
        "material_label": mat["label"],
        "volume_cm3": req.volume_cm3,
        "base_unit_price": round(base_unit_price, 2),
        "unit_price": round(unit_price, 2),
        "quantity": req.quantity,
        "discount_pct": int(discount * 100),
        "total": round(total, 2),
        "lead_time_days": estimate_lead_time(req.quantity, print_hours),
    }
