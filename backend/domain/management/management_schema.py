from typing import Optional
from pydantic import BaseModel

class testSchema(BaseModel):
    content: str
    model: Optional[str] = "gemini-pro"