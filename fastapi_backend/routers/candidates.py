from fastapi import APIRouter, Body, HTTPException, status
from fastapi.responses import JSONResponse
from typing import List
from ..database import db
from ..schemas import CandidateSchema, EducationSchema, WorkExperienceSchema
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

router = APIRouter()

@router.post("/", response_description="Add new candidate", response_model=CandidateSchema)
async def create_candidate(candidate: CandidateSchema = Body(...)):
    candidate.password = pwd_context.hash(candidate.password)
    candidate_dict = candidate.dict(by_alias=True)
    new_candidate = await db["candidates"].insert_one(candidate_dict)
    created_candidate = await db["candidates"].find_one({"_id": new_candidate.inserted_id})
    return JSONResponse(status_code=status.HTTP_201_CREATED, content=created_candidate)

@router.get("/", response_description="Get all candidates", response_model=List[CandidateSchema])
async def list_candidates():
    candidates = await db["candidates"].find().to_list(1000)
    return candidates

@router.get("/{id}", response_description="Get a single candidate", response_model=CandidateSchema)
async def show_candidate(id: str):
    if (candidate := await db["candidates"].find_one({"_id": id})) is not None:
        return candidate

    raise HTTPException(status_code=404, detail=f"Candidate {id} not found")

@router.put("/{id}", response_description="Update a candidate", response_model=CandidateSchema)
async def update_candidate(id: str, candidate: CandidateSchema = Body(...)):
    candidate_dict = candidate.dict(by_alias=True)
    await db["candidates"].update_one({"_id": id}, {"$set": candidate_dict})
    if (updated_candidate := await db["candidates"].find_one({"_id": id})) is not None:
        return updated_candidate

    raise HTTPException(status_code=404, detail=f"Candidate {id} not found")

@router.delete("/{id}", response_description="Delete a candidate")
async def delete_candidate(id: str):
    delete_result = await db["candidates"].delete_one({"_id": id})

    if delete_result.deleted_count == 1:
        return JSONResponse(status_code=status.HTTP_200_OK, content={"message": "Candidate deleted successfully"})

    raise HTTPException(status_code=404, detail=f"Candidate {id} not found")

# Nested CRUD for work experience
@router.post("/{id}/jobs", response_description="Add new work experience", response_model=CandidateSchema)
async def add_work_experience(id: str, work_experience: WorkExperienceSchema = Body(...)):
    await db["candidates"].update_one({"_id": id}, {"$push": {"work_experience": work_experience.dict()}})
    if (updated_candidate := await db["candidates"].find_one({"_id": id})) is not None:
        return updated_candidate
    raise HTTPException(status_code=404, detail=f"Candidate {id} not found")

@router.put("/{id}/jobs/{job_id}", response_description="Update work experience", response_model=CandidateSchema)
async def update_work_experience(id: str, job_id: str, work_experience: WorkExperienceSchema = Body(...)):
    await db["candidates"].update_one({"_id": id, "work_experience._id": job_id}, {"$set": {"work_experience.$": work_experience.dict()}})
    if (updated_candidate := await db["candidates"].find_one({"_id": id})) is not None:
        return updated_candidate
    raise HTTPException(status_code=404, detail=f"Candidate {id} not found")

@router.delete("/{id}/jobs/{job_id}", response_description="Delete work experience")
async def delete_work_experience(id: str, job_id: str):
    await db["candidates"].update_one({"_id": id}, {"$pull": {"work_experience": {"_id": job_id}}})
    if (updated_candidate := await db["candidates"].find_one({"_id": id})) is not None:
        return updated_candidate
    raise HTTPException(status_code=404, detail=f"Candidate {id} not found")

# Nested CRUD for education
@router.post("/{id}/edus", response_description="Add new education", response_model=CandidateSchema)
async def add_education(id: str, education: EducationSchema = Body(...)):
    await db["candidates"].update_one({"_id": id}, {"$push": {"education": education.dict()}})
    if (updated_candidate := await db["candidates"].find_one({"_id": id})) is not None:
        return updated_candidate
    raise HTTPException(status_code=404, detail=f"Candidate {id} not found")

@router.put("/{id}/edus/{edu_id}", response_description="Update education", response_model=CandidateSchema)
async def update_education(id: str, edu_id: str, education: EducationSchema = Body(...)):
    await db["candidates"].update_one({"_id": id, "education._id": edu_id}, {"$set": {"education.$": education.dict()}})
    if (updated_candidate := await db["candidates"].find_one({"_id": id})) is not None:
        return updated_candidate
    raise HTTPException(status_code=404, detail=f"Candidate {id} not found")

@router.delete("/{id}/edus/{edu_id}", response_description="Delete education")
async def delete_education(id: str, edu_id: str):
    await db["candidates"].update_one({"_id": id}, {"$pull": {"education": {"_id": edu_id}}})
    if (updated_candidate := await db["candidates"].find_one({"_id": id})) is not None:
        return updated_candidate
    raise HTTPException(status_code=404, detail=f"Candidate {id} not found")

# Nested CRUD for skills
@router.post("/{id}/skills", response_description="Add new skill", response_model=CandidateSchema)
async def add_skill(id: str, skill: str = Body(...)):
    await db["candidates"].update_one({"_id": id}, {"$addToSet": {"skills": skill}})
    if (updated_candidate := await db["candidates"].find_one({"_id": id})) is not None:
        return updated_candidate
    raise HTTPException(status_code=404, detail=f"Candidate {id} not found")

@router.delete("/{id}/skills/{skill}", response_description="Delete skill")
async def delete_skill(id: str, skill: str):
    await db["candidates"].update_one({"_id": id}, {"$pull": {"skills": skill}})
    if (updated_candidate := await db["candidates"].find_one({"_id": id})) is not None:
        return updated_candidate
    raise HTTPException(status_code=404, detail=f"Candidate {id} not found")
