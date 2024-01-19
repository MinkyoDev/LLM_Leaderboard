from typing import Optional
from pydantic import BaseModel

class GeneratorSchema(BaseModel):
    content: str
    model: Optional[str] = "gpt-3.5-turbo-1106"
    secretKey: str