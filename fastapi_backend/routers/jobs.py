from fastapi import APIRouter, Body, HTTPException, status
from fastapi.responses import JSONResponse
from typing import List
from ..database import db
from ..schemas import JobSchema

router = APIRouter()

@router.post("/", response_description="Add new job", response_model=JobSchema)
async def create_job(job: JobSchema = Body(...)):
    job_dict = job.dict(by_alias=True)
    new_job = await db["jobs"].insert_one(job_dict)
    created_job = await db["jobs"].find_one({"_id": new_job.inserted_id})
    return JSONResponse(status_code=status.HTTP_201_CREATED, content=created_job)

@router.get("/", response_description="Get all jobs", response_model=List[JobSchema])
async def list_jobs():
    jobs = await db["jobs"].find().to_list(1000)
    return jobs

@router.get("/{id}", response_description="Get a single job", response_model=JobSchema)
async def show_job(id: str):
    if (job := await db["jobs"].find_one({"_id": id})) is not None:
        return job

    raise HTTPException(status_code=404, detail=f"Job {id} not found")

@router.put("/{id}", response_description="Update a job", response_model=JobSchema)
async def update_job(id: str, job: JobSchema = Body(...)):
    job_dict = job.dict(by_alias=True)
    await db["jobs"].update_one({"_id": id}, {"$set": job_dict})
    if (updated_job := await db["jobs"].find_one({"_id": id})) is not None:
        return updated_job

    raise HTTPException(status_code=404, detail=f"Job {id} not found")

@router.delete("/{id}", response_description="Delete a job")
async def delete_job(id: str):
    delete_result = await db["jobs"].delete_one({"_id": id})

    if delete_result.deleted_count == 1:
        return JSONResponse(status_code=status.HTTP_200_OK, content={"message": "Job deleted successfully"})

    raise HTTPException(status_code=404, detail=f"Job {id} not found")
