// src/services/apiService.js
const BASE_URL = 'http://221.163.19.218:9091';

export const fetchModelOptions = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/management/model_list`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Fetching model options failed:", error);
      throw error;
    }
};

export const sendRequestToModel = async (model, content, apiKeys, apiUrls) => {
  const url = `${BASE_URL}${apiUrls}`;

  let key = '';
  if (model.type === "Langchain") {
      key = apiKeys.openAIKey;
  } else if (model.type === "Gemini") {
      key = apiKeys.googleAPIKey;
  } else if (model.type === "OpenAI") {
      key = apiKeys.openAIKey;
  }
  // 여기서 model.type에 따라 다른 키를 추가할 수 있습니다.

  const data = {
      content: content,
      model: model.model,
      secretKey: key // 'key' 항목 추가
  };

  return fetch(url, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
  })
  .then(response => {
      if (!response.ok) {
          throw new Error(`Request failed: ${response.status} ${response.statusText}`);
      }
      return response.json();
  })
  .catch(error => {
      console.error(`Error in model ${model.id}: ${error.message}`);
      throw error;
  });
};