from fastapi import FastAPI

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
        "name": "hello",
        "description": "기본적인 연결 테스트를 위한 \"Hello, World!\" API입니다.",
    },
    {
        "name": "conversation_with_user",
        "description": "npc와 user간의 대화를 위한 API입니다.",
    },
    {
        "name": "conversation_between_npcs",
        "description": "npc와 npc간의 대화를 생성해 주는 API입니다.",
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

app.include_router(langchain_router.router)
app.include_router(gemini_router.router)