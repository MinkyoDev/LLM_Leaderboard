from typing import Optional
from pydantic import BaseModel

class GeneratorSchema(BaseModel):
    content: str
    model: Optional[str] = "gemini-pro"
    secretKey: str