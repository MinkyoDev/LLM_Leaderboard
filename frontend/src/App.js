// src/App.js
import React, { useState } from 'react';
import LeaderBoard from './components/LeaderBoard';
import KeyButton from './components/KeyButton';

const App = () => {
  const [apiKeys, setApiKeys] = useState({
    openAIKey: '',
    googleAPIKey: '',
  });

  const handleKeyChange = (keyName, keyValue) => {
    setApiKeys(prevKeys => ({
      ...prevKeys,
      [keyName]: keyValue
    }));
  };

  return (
    <div className="App">
      <LeaderBoard apiKeys={apiKeys} />
      <KeyButton
        apiKeys={apiKeys}
        setKeyChange={handleKeyChange}
      />
    </div>
  );
};

export default App;
