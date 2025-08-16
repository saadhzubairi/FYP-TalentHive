from motor.motor_asyncio import AsyncIOMotorClient
from pymongo import MongoClient
from gridfs import GridFS
from .config import settings

# Async client (for your normal collections)
client = AsyncIOMotorClient(settings.mongo_url)
db = client.main  # async database

# Sync client (needed for GridFS)
sync_client = MongoClient(settings.mongo_url)
sync_db = sync_client["main"]
fs = GridFS(sync_db)
