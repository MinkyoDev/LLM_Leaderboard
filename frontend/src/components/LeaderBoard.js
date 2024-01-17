// src/components/LeaderBoard.js
import React, { useState, useEffect } from 'react';
import PromptInput from './PromptInput';
import ModelCard from './ModelCard';
import GenerateButton from './GenerateButton';
import AddModelDropdown from './AddModelDropdown';
import fetchModelOptions from '../utils/fetchModelOptions';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';

const LeaderBoard = () => {
    const [modelOptions, setModelOptions] = useState({});
    const [models, setModels] = useState([]);
    const [prompt, setPrompt] = useState('');

    useEffect(() => {
        const getModelOptions = async () => {
            try {
                const options = await fetchModelOptions();
                setModelOptions(options);
                initializeModels(options);
            } catch (error) {
                console.error("Error fetching model options:", error);
            }
        };

        getModelOptions();
    }, []);

    const initializeModels = (options) => {
        const initialModels = Object.entries(options).map(([type, models], index) => ({
            id: index,
            type,
            model: models[0],
            response: '',
            isLoading: false
        }));
        setModels(initialModels);
    };

    const addNewModel = (modelType) => {
        const newId = models.length > 0 ? Math.max(...models.map(m => m.id)) + 1 : 1;
        const newModel = { 
            id: newId, 
            type: modelType, 
            model: modelOptions[modelType][0],
            response: ''
        };
        setModels([...models, newModel]);
    };

    const removeModel = (modelId) => {
        setModels(models.filter(model => model.id !== modelId));
    };

    const handleModelChange = (modelId, newModel) => {
        setModels(models.map(model => model.id === modelId ? { ...model, model: newModel } : model));
    };

    const modelTypes = Object.keys(modelOptions);

    const handlePromptChange = (value) => {
        setPrompt(value);
    };

    const updateModelResponse = (modelId, response) => {
        console.log(response);
        setModels(prevModels => prevModels.map(model => 
            model.id === modelId ? { ...model, response: response.answer, isLoading: false } : model
        ));
    };

    const handleGenerate = () => {
        setModels(models.map(model => ({ ...model, isLoading: true })));
    };

    return (
        <MDBContainer>
            <MDBRow>
                <MDBCol size="12">
                    <h1 className="text-center my-4">LLM LEADER BOARD</h1>
                    <h4 className="mb-2">Prompt</h4>
                    <PromptInput value={prompt} onChange={handlePromptChange} />
                    <MDBRow className="align-items-center my-4">
                        <MDBCol>
                            <h4>Models</h4>
                        </MDBCol>
                        <MDBCol className="text-right">
                            <AddModelDropdown onAddModel={addNewModel} modelOptions={modelTypes} />
                        </MDBCol>
                    </MDBRow>
                    {models.map(model => (
                        <ModelCard
                            key={model.id}
                            id={model.id}
                            type={model.type}
                            response={model.response}
                            onRemove={removeModel}
                            onModelChange={handleModelChange}
                            modelOptions={modelOptions[model.type]}
                            isLoading={model.isLoading}
                        />
                    ))}
                    <MDBRow>
                        <MDBCol className="text-center my-4">
                        <GenerateButton 
                            content={prompt} 
                            models={models} 
                            updateModelResponse={updateModelResponse}
                            handleGenerate={handleGenerate}
                        />
                    </MDBCol>
                </MDBRow>
            </MDBCol>
        </MDBRow>
    </MDBContainer>
  );
};

export default LeaderBoard;
