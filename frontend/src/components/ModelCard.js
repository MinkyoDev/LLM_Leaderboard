// src/components/ModelCard.js
import React, { useState, useEffect } from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon  } from 'mdbreact';

const ModelCard = ({ id, type, response, onRemove, onModelChange, modelOptions, isLoading }) => {
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
    <MDBCard style={{ marginTop: "1rem", marginBottom: "1rem" }}>
      {isLoading && (
        <div className="spinner-overlay">
          <div className="spinner"></div>
        </div>
      )}
      <MDBCardBody>
        <div style={{ display: 'flex' }}>
          {/* type과 드롭다운 */}
          <div style={{ flexDirection: 'column', justifyContent: 'center', marginTop: '10px' }}>
            <h5 style={{ margin: '6px' }}>{type}</h5>
            <MDBDropdown>
              <MDBDropdownToggle style={{ fontSize: '0.7rem', padding: '5px 10px', minWidth: '150px' }} caret color="light">
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
          </div>

          <div style={{ flexGrow: 1, flexDirection: 'column', marginLeft: '20px', position: 'relative' }}>
            {/* Answer 섹션 */}
            <MDBCard style={{ boxShadow: 'none', border: '1px solid #ddd', marginTop: '23px', minHeight: "50px" }}>
              <div style={{
                position: 'absolute',
                top: '-10px',
                left: '15px',
                backgroundColor: '#fff',
                padding: '0 10px'
              }}>
                <h7>Answer</h7>
              </div>
              {!isLoading && response && (
                <MDBCardBody>
                  <p className="card-text">{response.text}</p>
                </MDBCardBody>
              )}
            </MDBCard>
          

            {/* Infomation 섹션 */}
            <MDBCard style={{ boxShadow: 'none', border: '1px solid #ddd', marginTop: '23px', minHeight: "50px" }}>
              <div style={{
                position: 'absolute',
                top: '-10px',
                left: '15px',
                backgroundColor: '#fff',
                padding: '0 10px'
              }}>
                <h7>Infomation</h7>
              </div>
              {!isLoading && response && (
                <MDBCardBody>
                  <p className="card-text">Total tokens : {response.tokens.totalTokens}</p>
                  <p className="card-text">Prompt tokens : {response.tokens.promptTokens}</p>
                  <p className="card-text">Completion tokens : {response.tokens.completionTokens}</p>
                  <p className="card-text">Execution time : {response.executionTime} s</p>
                </MDBCardBody>
              )}
            </MDBCard>
          
          </div>
        </div>

        {/* 삭제 버튼 */}
        <MDBBtn color="white" style={{
                  position: "absolute",
                  top: "8px",
                  right: "8px",
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
