from fastapi import APIRouter, Body, HTTPException, status
from fastapi.responses import JSONResponse
from typing import List
from ..database import db
from ..schemas import CompanySchema

router = APIRouter()

@router.post("/", response_description="Add new company", response_model=CompanySchema)
async def create_company(company: CompanySchema = Body(...)):
    company_dict = company.dict(by_alias=True)
    new_company = await db["companies"].insert_one(company_dict)
    created_company = await db["companies"].find_one({"_id": new_company.inserted_id})
    return JSONResponse(status_code=status.HTTP_201_CREATED, content=created_company)

@router.get("/", response_description="Get all companies", response_model=List[CompanySchema])
async def list_companies():
    companies = await db["companies"].find().to_list(1000)
    return companies

@router.get("/{id}", response_description="Get a single company", response_model=CompanySchema)
async def show_company(id: str):
    if (company := await db["companies"].find_one({"_id": id})) is not None:
        return company

    raise HTTPException(status_code=404, detail=f"Company {id} not found")

@router.put("/{id}", response_description="Update a company", response_model=CompanySchema)
async def update_company(id: str, company: CompanySchema = Body(...)):
    company_dict = company.dict(by_alias=True)
    await db["companies"].update_one({"_id": id}, {"$set": company_dict})
    if (updated_company := await db["companies"].find_one({"_id": id})) is not None:
        return updated_company

    raise HTTPException(status_code=404, detail=f"Company {id} not found")

@router.delete("/{id}", response_description="Delete a company")
async def delete_company(id: str):
    delete_result = await db["companies"].delete_one({"_id": id})

    if delete_result.deleted_count == 1:
        return JSONResponse(status_code=status.HTTP_200_OK, content={"message": "Company deleted successfully"})

    raise HTTPException(status_code=404, detail=f"Company {id} not found")
