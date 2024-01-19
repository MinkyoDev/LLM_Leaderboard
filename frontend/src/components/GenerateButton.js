import React from 'react';
import { MDBBtn } from 'mdbreact';
import { sendRequestToModel } from '../services/apiService';

const GenerateButton = ({ content, models, updateModelResponse, handleGenerate, openAIKey, googleAPIKey }) => {
  const handleSubmit = async () => {
    console.log(`OpenAI Key: ${openAIKey}`);
    console.log(`Google API Key: ${googleAPIKey}`);

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
      return sendRequestToModel(model, content, openAIKey, googleAPIKey)
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
