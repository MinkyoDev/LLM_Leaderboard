// src/components/ModelCard.js
import React, { useState, useEffect } from 'react';
import { MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';

const ModelCard = ({ id, type, onRemove, onModelChange, modelOptions }) => {
  const [selectedModel, setSelectedModel] = useState('');

  useEffect(() => {
    if (modelOptions && modelOptions.length > 0 && selectedModel === '') {
      const initialModel = modelOptions[0];
      setSelectedModel(initialModel);
      onModelChange(id, initialModel);
    }
  }, [id, modelOptions, onModelChange, selectedModel]);

  const handleModelChange = (e) => {
    const newModel = e.target.value;
    setSelectedModel(newModel);
    onModelChange(id, newModel);
  };

  return (
    <MDBCard style={{ width: "22rem", marginTop: "1rem" }}>
      <MDBCardBody>
        <h3>{type}</h3>
        {/* 드롭다운과 버튼 */}
        <MDBBtn color="danger" onClick={() => onRemove(id)}>Remove</MDBBtn>
      </MDBCardBody>
    </MDBCard>
  );
};

export default ModelCard;
