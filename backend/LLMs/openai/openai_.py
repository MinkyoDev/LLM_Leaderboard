from openai import OpenAI
import dotenv

dotenv.load_dotenv()

client = OpenAI()

response = client.chat.completions.create(
  model="gpt-3.5-turbo-1106",
  # model="gpt-4-1106-preview",
  response_format={ "type": "json_object" },
  messages=[
    {"role": "system", "content": 'You are a helpful assistant designed to output JSON. Provide your answer in JSON structure like this {"answer": "<you are answer>"}'},
    {"role": "user", "content": "피보나치 수열이 뭐야?"}
  ]
)

print(response.choices[0].message.content)