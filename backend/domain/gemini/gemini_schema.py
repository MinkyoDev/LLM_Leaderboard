from typing import Optional
from pydantic import BaseModel

class GeneratorSchema(BaseModel):
    content: str