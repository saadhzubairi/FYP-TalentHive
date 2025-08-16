from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
from datetime import datetime
from bson import ObjectId

class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid objectid")
        return ObjectId(v)

    @classmethod
    def __get_pydantic_json_schema__(
        cls,
        core_schema
    ) :
        json_schema = super().__get_pydantic_json_schema__(
            core_schema
        )
        json_schema.update(type="string")
        return json_schema

class CompanySchema(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    name: str
    location: str
    phone: str
    email: EmailStr
    website: str
    industry: str
    description: str
    logoUrl: str
    HRAdmin: str
    HRs: List[str] = []
    jobs: List[str] = []
    createdAt: Optional[datetime] = None
    updatedAt: Optional[datetime] = None

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}

class HRMSchema(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    firstName: str
    lastName: str
    email: EmailStr
    password: str
    isAdmin: bool = False
    bio: Optional[str] = ""
    pfpURL: Optional[str] = ""
    companyId: str
    LinkedInProfile: Optional[str] = ""
    jobsCreated: List[str] = []
    userType: int = 2
    createdAt: Optional[datetime] = None
    updatedAt: Optional[datetime] = None

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}

class EducationSchema(BaseModel):
    degree: str
    institution: str
    start_date: datetime
    end_date: Optional[datetime] = None
    grade: Optional[str] = ""
    status: str

class WorkExperienceSchema(BaseModel):
    title: str
    company: str
    start_date: datetime
    end_date: Optional[datetime] = None
    stillWorking: Optional[bool] = False
    description: str

class NameSchema(BaseModel):
    fname: str
    lname: str

class CandidateSchema(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    name: NameSchema
    email: EmailStr
    password: str
    linkedin: str
    phone_number: str
    other_links: List[str] = []
    education: List[EducationSchema] = []
    work_experience: List[WorkExperienceSchema] = []
    city: Optional[str] = None
    skills: List[str] = []
    resume_link: Optional[str] = None
    profile_picture: Optional[str] = None
    userType: int = 3

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}

class JobSchema(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    jobTitle: str
    workplace: str = "On-site"
    location: str
    type: str = "Full Time"
    skills: List[str] = []
    description: str
    requiremets: str
    companyId: str
    HRCreatorId: str
    spots: int = 1
    applications: List[str] = []
    createdAt: Optional[datetime] = None
    updatedAt: Optional[datetime] = None

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}

class JobApplicationSchema(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    candidateId: str
    jobId: str
    message1: Optional[str] = ""
    message2: Optional[str] = ""
    rating: Optional[float] = 1.0
    status: int = 1
    interview: Optional[str] = ""
    createdAt: Optional[datetime] = None
    updatedAt: Optional[datetime] = None

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}

class RegisterCandidateSchema(BaseModel):
    name: NameSchema
    email: EmailStr
    password: str
    linkedin: str
    phone_number: str
    other_links: List[str] = []
    education: List[EducationSchema] = []
    work_experience: List[WorkExperienceSchema] = []
    city: Optional[str] = None
    skills: List[str] = []
    resume_link: Optional[str] = None
    profile_picture: Optional[str] = None
    userType: int = 3

class RegisterHRMSchema(BaseModel):
    firstName: str
    lastName: str
    email: EmailStr
    password: str
    isAdmin: bool = False
    bio: Optional[str] = ""
    pfpURL: Optional[str] = ""
    companyId: str
    LinkedInProfile: Optional[str] = ""
    jobsCreated: List[str] = []
    userType: int = 2
