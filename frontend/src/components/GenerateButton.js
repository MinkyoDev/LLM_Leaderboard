// src/components/GenerateButton.js
import React from 'react';
import { MDBBtn } from 'mdbreact';

const GenerateButton = ({ content, models, updateModelResponse, handleGenerate }) => {
  const handleSubmit = async () => {
    if (!content.trim()) {
      alert("Content cannot be empty.");
      return;
    }

    handleGenerate();

    if (!models || models.length === 0) {
      alert("No models available.");
      return;
    }

    const fetchPromises = models.map(model => {
      let url;
      if (model.type === "Langchain") {
        url = "http://127.0.0.1:8000/api/chatbot/langchain";
      } else if (model.type === "Gemini") {
        url = "http://127.0.0.1:8000/api/chatbot/gemini";
      } else {
        return Promise.resolve();
      }

      const data = { content: content, model: model.model };

      console.log(`Sending request to model ${model.id}`); // 요청 보내기 전에 로그 찍기

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
      .then(jsonResponse => {
        console.log(`Received response from model ${model.id}`);
        updateModelResponse(model.id, jsonResponse);
      })
      .catch(error => {
        console.error(`Error in model ${model.id}: ${error.message}`);
        updateModelResponse(model.id, { error: error.message });
      });
    });

    await Promise.all(fetchPromises);
  };
    
  return (
    <MDBBtn color="primary" onClick={handleSubmit}>
      Generate
    </MDBBtn>
  );
};

export default GenerateButton;

