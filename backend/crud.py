# backend/crud.py
from sqlalchemy.orm import Session
import models, schemas

def get_jobs(db: Session):
    return db.query(models.Job).all()

def get_job(db: Session, job_id: int):
    return db.query(models.Job).filter(models.Job.id == job_id).first()

def create_job(db: Session, job: schemas.JobCreate):
    db_job = models.Job(**job.dict())
    db.add(db_job)
    db.commit()
    db.refresh(db_job)
    return db_job

def update_job(db: Session, job_id: int, job_update: schemas.JobUpdate):
    db_job = get_job(db, job_id)
    if not db_job:
        return None
    for field, value in job_update.dict(exclude_unset=True).items():
        setattr(db_job, field, value)
    db.commit()
    db.refresh(db_job)
    return db_job

def delete_job(db: Session, job_id: int):
    db_job = get_job(db, job_id)
    if db_job:
        db.delete(db_job)
        db.commit()
    return db_job
