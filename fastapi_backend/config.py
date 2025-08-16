from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    mongo_url: str
    secret_key: str
    firebase_api_key: str
    firebase_auth_domain: str
    firebase_project_id: str
    firebase_storage_bucket: str
    firebase_messaging_sender_id: str
    firebase_app_id: str
    firebase_measurement_id: str

    class Config:
        env_file = ".env"

settings = Settings()
