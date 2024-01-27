// src/components/KeyButton.js
import React from 'react';
import { MDBBtn, MDBModal, MDBModalBody, MDBIcon, MDBInput } from 'mdbreact';

const KeyButton = ({ apiKeys, setKeyChange }) => {
    const [modal, setModal] = React.useState(false);

    const toggleModal = () => {
        setModal(!modal);
    };

    return (
        <>
            <MDBBtn color='primary' style={{
                position: 'fixed',
                right: '10%',
                bottom: '10%',
                borderRadius: '50%',
                padding: '15px',
                fontSize: '30px',
            }} onClick={toggleModal}>
                🔑
            </MDBBtn>

            <MDBModal isOpen={modal} toggle={toggleModal} centered className="modal-lg">
                <MDBModalBody style={{ margin: '10px' }}>
                    <h4 style={{ marginTop: '10px', marginBottom: '20px' }}><strong>Secret Key</strong></h4>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ marginRight: '20px',  minWidth: '130px' }}>OPENAI API KEY</span>
                        <div style={{ width: '90%' }}>
                            <MDBInput 
                                style={{ flex: 1, width: '100%' }} 
                                label="OPENAI_API_KEY"
                                value={apiKeys.openAIKey}
                                onChange={(e) => setKeyChange('openAIKey', e.target.value)}
                            />
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ marginRight: '20px', minWidth: '130px' }}>GOOGLE API KEY</span>
                        <div style={{ width: '90%' }}>
                            <MDBInput 
                                style={{ flex: 1, width: '100%' }} 
                                label="GOOGLE_API_KEY"
                                value={apiKeys.googleAPIKey}
                                onChange={(e) => setKeyChange('googleAPIKey', e.target.value)}
                            />
                        </div>
                    </div>
                </MDBModalBody>
                <MDBBtn color="white" style={{
                        position: "absolute",
                        top: "8px",
                        right: "8px",
                        padding: "5px 10px",
                        boxShadow: "none",
                        color: "grey",
                        }}
                        size="sm"
                        onClick={toggleModal}>
                    <MDBIcon icon="times" />
                </MDBBtn>
            </MDBModal>

            {modal && <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.3)'
            }} />}
        </>
    );
}

export default KeyButton;
