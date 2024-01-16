from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from domain.management import management_router
from domain.langchain import langchain_router
from domain.gemini import gemini_router

description = """

## Chatbot

기능 목록:

* **Say Hello** (_completely implemented_).
* **Conversation with User** (_not implemented_).
* **Conversation between Npcs** (_not implemented_).
"""

tags_metadata = [
    {
        "name": "LLMs",
        "description": "LLM에서 답변을 받기 위한 API입니다.",
    },
    {
        "name": "management",
        "description": "부가 기능들을 위한 API입니다.",
    },
]

app = FastAPI(
    title="LLM Leaderboard",
    description=description,
    version="0.0.1",
    license_info={
        "name": "Apache 2.0",
        "url": "https://www.apache.org/licenses/LICENSE-2.0.html",
    },
    openapi_tags=tags_metadata
)

# Add CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 모든 오리진 허용
    allow_credentials=True,
    allow_methods=["*"],  # 모든 HTTP 메소드 허용
    allow_headers=["*"],  # 모든 HTTP 헤더 허용
)

app.include_router(management_router.router)
app.include_router(langchain_router.router)
app.include_router(gemini_router.router)