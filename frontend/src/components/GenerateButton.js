// src/components/GenerateButton.js

import React from 'react';
import { MDBBtn } from 'mdbreact';

const GenerateButton = ({ content }) => {
  const handleSubmit = async () => {
    const url = "http://127.0.0.1:8000/api/management/test";
    const data = { content };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error(`Request failed: ${response.status} ${response.statusText}`);
      }

      const jsonResponse = await response.json();
      console.log(jsonResponse); // 응답 처리
    } catch (error) {
      alert(`Network error: ${error.message}`); // 에러 메시지를 팝업으로 표시
    }
  };

  return (
    <MDBBtn color="primary" onClick={handleSubmit}>
      Generate
    </MDBBtn>
  );
};

export default GenerateButton;
