import os
from pathlib import Path
import vertexai
from vertexai.preview.generative_models import GenerativeModel

current_file_path = Path(__file__).resolve()
current_directory = current_file_path.parent.parent.parent
file_path = current_directory / Path("resources/secret") / "gemini-api-410603-b4ee00038dea.json"
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = file_path.as_posix()

location = "asia-northeast1"
project_id = "gemini-api-410603"

vertexai.init(project=project_id, location=location)

 
def chat_gemini(prompts):
    model_name = "gemini-pro"
 
    model = GenerativeModel(model_name)
    response = model.generate_content(prompts)

    answer = response.candidates[0].content.parts[0].text
    finish_reason = str(response.candidates[0].finish_reason).split('.')[-1]
    return answer, finish_reason