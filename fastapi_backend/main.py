from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import companies, hrms, jobs, jobApplications, candidates, auth, upload

app = FastAPI()

# Configure CORS
origins = [
    "http://localhost:3000",
    "http://localhost:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(companies.router, tags=["companies"], prefix="/api/company")
app.include_router(hrms.router, tags=["hrms"], prefix="/api/hrms")
app.include_router(jobs.router, tags=["jobs"], prefix="/api/jobs")
app.include_router(jobApplications.router, tags=["jobApplications"], prefix="/api/jobApplications")
app.include_router(candidates.router, tags=["candidates"], prefix="/api/candidate")
app.include_router(auth.router, tags=["auth"], prefix="/api/auth")
app.include_router(upload.router, tags=["upload"], prefix="/api/upload")

@app.get("/")
def read_root():
    return {"message": "Welcome to TalentHive FastAPI Backend"}
