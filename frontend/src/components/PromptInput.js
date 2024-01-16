import React from 'react';
import { MDBInput } from 'mdbreact';

const PromptInput = () => {
    return (
        <MDBInput type="textarea" label="Enter your prompt" rows="4" outline />
    );
};

export default PromptInput;
