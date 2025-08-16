from fastapi.responses import StreamingResponse
from gridfs.errors import NoFile

@router.get("/files/{file_id}")
async def get_file(file_id: str):
    try:
        grid_out = fs.get(ObjectId(file_id))
        return StreamingResponse(
            grid_out, 
            media_type=grid_out.content_type,
            headers={"Content-Disposition": f"inline; filename={grid_out.filename}"}
        )
    except NoFile:
        return JSONResponse({"error": "File not found"}, status_code=404)
