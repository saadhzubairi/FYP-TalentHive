from fastapi import APIRouter, File, UploadFile
from fastapi.responses import JSONResponse
import firebase_admin
from firebase_admin import storage
import datetime

from .. import firebase_app

router = APIRouter()

@router.post("/")
async def upload_file(file: UploadFile = File(...)):
    try:
        bucket = storage.bucket()
        blob = bucket.blob(file.filename + "ua" + str(datetime.datetime.now()))
        blob.upload_from_file(file.file, content_type=file.content_type)
        blob.make_public()
        return JSONResponse(content={"message": "file uploaded to firebase storage", "name": file.filename, "type": file.content_type, "downloadURL": blob.public_url})
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=400)
