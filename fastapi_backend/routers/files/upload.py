from fastapi import APIRouter, File, UploadFile
from fastapi.responses import JSONResponse
from bson import ObjectId
from ..db import fs  # GridFS instance from your db.py
import datetime

router = APIRouter()

@router.post("/")
async def upload_file(file: UploadFile = File(...)):
    try:
        # Save file into GridFS
        file_id = fs.put(
            file.file,
            filename=file.filename,
            content_type=file.content_type,
            upload_date=datetime.datetime.utcnow()
        )

        # Build a "download URL" for frontend
        # This points to another FastAPI route that you’ll implement to serve files
        download_url = f"/files/{file_id}"

        return JSONResponse(content={
            "message": "file uploaded to MongoDB GridFS",
            "name": file.filename,
            "type": file.content_type,
            "downloadURL": download_url
        })
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=400)
