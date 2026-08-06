from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.auth.schemas import (
    Token,
    UserRegister,
    UserResponse,
)

from app.auth.service import (
    authenticate_user,
    create_user,
    get_user_by_email,
    get_user_by_username,
)

from app.auth.utils import create_access_token
from app.database.database import get_db

router = APIRouter()


@router.get("/")
def auth_home():
    return {
        "message": "Authentication API Working!"
    }


@router.post(
    "/register",
    response_model=UserResponse,
)
def register(
    user: UserRegister,
    db: Session = Depends(get_db),
):
    """
    Register a new user.
    """

    existing_email = get_user_by_email(
        db,
        user.email,
    )

    if existing_email:
        raise HTTPException(
            status_code=400,
            detail="Email already registered.",
        )

    existing_username = get_user_by_username(
        db,
        user.username,
    )

    if existing_username:
        raise HTTPException(
            status_code=400,
            detail="Username already taken.",
        )

    return create_user(
        db,
        user,
    )


@router.post(
    "/login",
    response_model=Token,
)
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
):
    """
    Login user and return JWT token + user details.
    """

    db_user = authenticate_user(
        db,
        form_data.username,
        form_data.password,
    )

    if db_user is None:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password.",
        )

    access_token = create_access_token(
        {
            "sub": db_user.email,
            "id": db_user.id,
        }
    )

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": db_user.id,
            "username": db_user.username,
            "email": db_user.email,
        },
    }