from pydantic import BaseModel
from typing import List

class AnalysisResponse(BaseModel):
    transcript: str
    summary: str
    key_points: List[str]
    tasks: List[str]
    tags: List[str]
    mind_map: str

