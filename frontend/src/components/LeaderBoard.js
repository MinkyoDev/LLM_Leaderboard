// src/components/LeaderBoard.js
import React, { useState } from 'react';
import PromptInput from './PromptInput';
import ModelCard from './ModelCard';
import GenerateButton from './GenerateButton';
import AddModelDropdown from './AddModelDropdown';
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';

const LeaderBoard = () => {
    const modelOptions = {
        'Langchain': ['model1-1', 'model1-2', 'model1-3'],
        'Hama-2': ['model2-1', 'model2-2', 'model3-3'],
        'Gemini': ['model24-1', 'model42-2', 'model43-3'],
        // ... 추가 타입과 모델 정의
      };
    
      // 각 타입의 첫 번째 모델을 기본값으로 사용하여 초기 모델 상태를 생성합니다.
      const initialModels = Object.entries(modelOptions).map(([type, models], index) => ({
        id: index + 1,
        type,
        model: models[0]
      }));
    
      const [models, setModels] = useState(initialModels);
    
      const addNewModel = (modelType) => {
        const newId = models.length > 0 ? Math.max(...models.map(m => m.id)) + 1 : 1;
        const newModel = { 
          id: newId, 
          type: modelType, 
          model: modelOptions[modelType][0] // 첫 번째 모델을 기본값으로 설정
        };
        setModels([...models, newModel]);
      };

  const removeModel = (modelId) => {
    setModels(models.filter(model => model.id !== modelId));
  };

  const handleModelChange = (modelId, newModel) => {
    setModels(models.map((model) =>
      model.id === modelId ? { ...model, model: newModel } : model
    ));
  };

  const modelTypes = Object.keys(modelOptions);

  return (
    <MDBContainer>
        <MDBRow>
            <MDBCol size="12">
                <h1 className="text-center my-4">LLM LEADER BOARD</h1>
                <h4 className="mb-2">Prompt</h4>
                <PromptInput />
                <MDBRow className="align-items-center my-4">
                    <MDBCol>
                        <h4>Models</h4>
                    </MDBCol>
                    <MDBCol className="text-right">
                        <AddModelDropdown onAddModel={addNewModel} modelOptions={modelTypes} />
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol size="12" style={{ display: 'flex', overflowX: 'auto' }}>
                        {models.map((model) => (
                            <ModelCard
                                key={model.id}
                                id={model.id}
                                type={model.type}
                                onRemove={removeModel}
                                onModelChange={handleModelChange}
                                modelOptions={modelOptions[model.type]}
                            />
                        ))}
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBCol className="text-center my-4">
              <MDBBtn color="primary">Generate</MDBBtn>
            </MDBCol>
          </MDBRow>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default LeaderBoard;
