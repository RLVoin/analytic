from src.auth.auth import auth_backend, current_user, fastapi_users
from src.database import User
from src.auth.schemas import UserRead, UserCreate
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from src.analytics.router import router as analytic_router

app = FastAPI()

app.include_router(
    fastapi_users.get_auth_router(auth_backend),
    prefix="/auth/jwt",
    tags=["auth"],
)
app.include_router(
    fastapi_users.get_register_router(UserRead, UserCreate),
    prefix="/auth",
    tags=["auth"],
)

app.include_router(analytic_router)

# app.include_router(
#     fastapi_users.get_verify_router(UserRead),
#     prefix="/auth",
#     tags=["auth"],
# )

origins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/user")
def user(user: User = Depends(current_user)):
    return {
        'username': user.username,
        'email': user.email,
        'role_id': user.role_id,
        'is_superuser': user.is_superuser
    }


# @app.get("/test")
# def test(user: User = Depends(current_user)):
#     print(1)
#
#
# @app.get("/unprotected-route")
# def unprotected_route():
#     return f"Hello, anonym"
