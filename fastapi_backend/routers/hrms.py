from fastapi import APIRouter, Body, HTTPException, status
from fastapi.responses import JSONResponse
from typing import List
from ..database import db
from ..schemas import HRMSchema
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

router = APIRouter()

@router.post("/admin", response_description="Add new admin HRM", response_model=HRMSchema)
async def create_admin_hrm(hrm: HRMSchema = Body(...)):
    hrm.password = pwd_context.hash(hrm.password)
    hrm.isAdmin = True
    hrm_dict = hrm.dict(by_alias=True)
    new_hrm = await db["hrms"].insert_one(hrm_dict)
    created_hrm = await db["hrms"].find_one({"_id": new_hrm.inserted_id})
    return JSONResponse(status_code=status.HTTP_201_CREATED, content=created_hrm)

@router.post("/", response_description="Add new HRM", response_model=HRMSchema)
async def create_hrm(hrm: HRMSchema = Body(...)):
    hrm.password = pwd_context.hash(hrm.password)
    hrm_dict = hrm.dict(by_alias=True)
    new_hrm = await db["hrms"].insert_one(hrm_dict)
    created_hrm = await db["hrms"].find_one({"_id": new_hrm.inserted_id})
    return JSONResponse(status_code=status.HTTP_201_CREATED, content=created_hrm)

@router.get("/", response_description="Get all HRMs", response_model=List[HRMSchema])
async def list_hrms():
    hrms = await db["hrms"].find().to_list(1000)
    return hrms

@router.get("/{id}", response_description="Get a single HRM", response_model=HRMSchema)
async def show_hrm(id: str):
    if (hrm := await db["hrms"].find_one({"_id": id})) is not None:
        return hrm

    raise HTTPException(status_code=404, detail=f"HRM {id} not found")

@router.put("/{id}", response_description="Update a HRM", response_model=HRMSchema)
async def update_hrm(id: str, hrm: HRMSchema = Body(...)):
    hrm_dict = hrm.dict(by_alias=True)
    await db["hrms"].update_one({"_id": id}, {"$set": hrm_dict})
    if (updated_hrm := await db["hrms"].find_one({"_id": id})) is not None:
        return updated_hrm

    raise HTTPException(status_code=404, detail=f"HRM {id} not found")

@router.delete("/{id}", response_description="Delete a HRM")
async def delete_hrm(id: str):
    delete_result = await db["hrms"].delete_one({"_id": id})

    if delete_result.deleted_count == 1:
        return JSONResponse(status_code=status.HTTP_200_OK, content={"message": "HRM deleted successfully"})

    raise HTTPException(status_code=404, detail=f"HRM {id} not found")
