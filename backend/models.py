from sqlalchemy import Column, Integer, String, Date, Text
from database import Base

class Job(Base):
    __tablename__ = "jobs"

    id = Column(Integer, primary_key=True, index=True)
    company = Column(String, nullable=False)
    title = Column(String, nullable=False)
    status = Column(String, default="Applied")
    date_applied = Column(Date)
    notes = Column(Text)
