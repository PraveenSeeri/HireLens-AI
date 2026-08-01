import os

from dotenv import load_dotenv

load_dotenv()


class Settings:
    GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
    GEMINI_MODEL = os.getenv("GEMINI_MODEL")

    UPLOAD_FOLDER = "uploads"

    MAX_FILE_SIZE = 5 * 1024 * 1024  # 5 MB


settings = Settings()