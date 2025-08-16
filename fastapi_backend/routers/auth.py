from fastapi import APIRouter, Body, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from typing import Any
from passlib.context import CryptContext
from datetime import timedelta

from .. import schemas
from ..database import db
from . import security

router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

@router.post("/login")
async def login(form_data: OAuth2PasswordRequestForm = Depends()) -> Any:
    """
    OAuth2 compatible token login, get an access token for future requests
    """
    user = await db["hrms"].find_one({"email": form_data.username})
    if not user:
        user = await db["candidates"].find_one({"email": form_data.username})
    
    if not user or not pwd_context.verify(form_data.password, user["password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=security.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = security.create_access_token(
        data={"sub": user["email"]}, expires_delta=access_token_expires
    )

    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/register/candidate", response_model=schemas.CandidateSchema)
async def register_candidate(candidate: schemas.RegisterCandidateSchema) -> Any:
    existing_candidate = await db["candidates"].find_one({"email": candidate.email})
    if existing_candidate:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Candidate with this email already exists",
        )
    
    hashed_password = security.get_password_hash(candidate.password)
    candidate_data = candidate.model_dump()
    candidate_data["password"] = hashed_password
    candidate_data["createdAt"] = datetime.utcnow()
    candidate_data["updatedAt"] = datetime.utcnow()

    new_candidate = await db["candidates"].insert_one(candidate_data)
    created_candidate = await db["candidates"].find_one({"_id": new_candidate.inserted_id})
    return created_candidate

@router.post("/register/hrm", response_model=schemas.HRMSchema)
async def register_hrm(hrm: schemas.RegisterHRMSchema) -> Any:
    existing_hrm = await db["hrms"].find_one({"email": hrm.email})
    if existing_hrm:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="HRM with this email already exists",
        )
    
    hashed_password = security.get_password_hash(hrm.password)
    hrm_data = hrm.model_dump()
    hrm_data["password"] = hashed_password
    hrm_data["createdAt"] = datetime.utcnow()
    hrm_data["updatedAt"] = datetime.utcnow()

    new_hrm = await db["hrms"].insert_one(hrm_data)
    created_hrm = await db["hrms"].find_one({"_id": new_hrm.inserted_id})
    return created_hrm
