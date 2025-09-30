# backend/schemas.py
from pydantic import BaseModel
from datetime import date
from typing import Optional

class JobBase(BaseModel):
    company: str
    title: str
    status: str = "Applied"
    date_applied: Optional[date] = None
    notes: Optional[str] = None

class JobCreate(JobBase):
    pass

class JobUpdate(BaseModel):
    status: Optional[str] = None
    notes: Optional[str] = None

class Job(JobBase):   # <- THIS is what FastAPI expects
    id: int

    class Config:
        orm_mode = True
