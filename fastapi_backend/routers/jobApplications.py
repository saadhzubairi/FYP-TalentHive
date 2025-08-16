from fastapi import APIRouter, Body, HTTPException, status
from fastapi.responses import JSONResponse
from typing import List
from ..database import db
from ..schemas import JobApplicationSchema

router = APIRouter()

@router.post("/", response_description="Add new job application", response_model=JobApplicationSchema)
async def create_job_application(job_application: JobApplicationSchema = Body(...)):
    job_application_dict = job_application.dict(by_alias=True)
    new_job_application = await db["jobapplications"].insert_one(job_application_dict)
    created_job_application = await db["jobapplications"].find_one({"_id": new_job_application.inserted_id})
    return JSONResponse(status_code=status.HTTP_201_CREATED, content=created_job_application)

@router.get("/", response_description="Get all job applications", response_model=List[JobApplicationSchema])
async def list_job_applications():
    job_applications = await db["jobapplications"].find().to_list(1000)
    return job_applications

@router.get("/{id}", response_description="Get a single job application", response_model=JobApplicationSchema)
async def show_job_application(id: str):
    if (job_application := await db["jobapplications"].find_one({"_id": id})) is not None:
        return job_application

    raise HTTPException(status_code=404, detail=f"Job application {id} not found")

@router.put("/{id}", response_description="Update a job application", response_model=JobApplicationSchema)
async def update_job_application(id: str, job_application: JobApplicationSchema = Body(...)):
    job_application_dict = job_application.dict(by_alias=True)
    await db["jobapplications"].update_one({"_id": id}, {"$set": job_application_dict})
    if (updated_job_application := await db["jobapplications"].find_one({"_id": id})) is not None:
        return updated_job_application

    raise HTTPException(status_code=404, detail=f"Job application {id} not found")

@router.delete("/{id}", response_description="Delete a job application")
async def delete_job_application(id: str):
    delete_result = await db["jobapplications"].delete_one({"_id": id})

    if delete_result.deleted_count == 1:
        return JSONResponse(status_code=status.HTTP_200_OK, content={"message": "Job application deleted successfully"})

    raise HTTPException(status_code=404, detail=f"Job application {id} not found")
