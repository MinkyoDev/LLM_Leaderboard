// src/components/ModelCard.js
import React, { useState, useEffect } from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon  } from 'mdbreact';

const ModelCard = ({ id, type, onRemove, onModelChange, modelOptions }) => {
  const [selectedModel, setSelectedModel] = useState('');

  useEffect(() => {
    if (modelOptions && modelOptions.length > 0 && selectedModel === '') {
      const initialModel = modelOptions[0];
      setSelectedModel(initialModel);
      onModelChange(id, initialModel);
    }
  }, [id, modelOptions, onModelChange, selectedModel]);

  const handleModelChange = (newModel) => {
    setSelectedModel(newModel);
    onModelChange(id, newModel);
  };

  return (
      <MDBCard style={{ margin: "1rem" }}>
      <MDBCardBody>
        <h3>{type}</h3>
        <MDBDropdown>
          <MDBDropdownToggle style={{ fontSize: '0.8rem', padding: '5px 10px', minWidth: '150px' }} caret color="light">
            {selectedModel}
          </MDBDropdownToggle>
          <MDBDropdownMenu basic>
            {modelOptions.map((model, index) => (
          <MDBDropdownItem key={index} onClick={() => handleModelChange(model)}>
            {model}
          </MDBDropdownItem>
          ))}
          </MDBDropdownMenu>
        </MDBDropdown>
        <MDBBtn color="white" style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  padding: "5px 10px",
                  boxShadow: "none",
                  color: "grey",
                }}
                size="sm"
                onClick={() => onRemove(id)}>
          <MDBIcon icon="times" />
        </MDBBtn>
      </MDBCardBody>
    </MDBCard>
  );
};

export default ModelCard;
