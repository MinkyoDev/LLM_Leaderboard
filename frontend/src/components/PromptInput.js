// src/components/PromptInput.js
import React from 'react';
import { MDBInput } from 'mdbreact';

const PromptInput = ({ value, onChange }) => {
    return (
        <MDBInput
          type="textarea"
          label="Enter your prompt"
          rows="4"
          outline
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
    );
};

export default PromptInput;
