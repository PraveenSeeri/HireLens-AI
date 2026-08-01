import os
import uuid


def save_uploaded_file(file):
    # Create uploads folder if it doesn't exist
    os.makedirs("uploads", exist_ok=True)

    # Generate unique filename
    unique_filename = f"{uuid.uuid4()}_{file.filename}"

    # Create full file path
    file_path = os.path.join("uploads", unique_filename)

    # Save the uploaded file
    with open(file_path, "wb") as buffer:
        buffer.write(file.file.read())

    return file_path, unique_filename