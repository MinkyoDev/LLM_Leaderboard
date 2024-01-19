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

export const sendRequestToModel = async (model, content, openAIKey, googleAPIKey) => {
    let url;
    let secretKey = '';
  
    if (model.type === "Langchain") {
      url = `${BASE_URL}/api/chatbot/langchain`;
      secretKey = openAIKey;
    } else if (model.type === "Gemini") {
      url = `${BASE_URL}/api/chatbot/gemini`;
      secretKey = googleAPIKey;
    } else {
      return Promise.resolve();
    }
  
    const data = { content: content, model: model.model, secretKey: secretKey };
  
    console.log(`Sending request to model ${model.id}`);
  
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
