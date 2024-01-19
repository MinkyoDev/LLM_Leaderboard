// src/App.js
import React, { useState } from 'react';
import LeaderBoard from './components/LeaderBoard';
import KeyButton from './components/KeyButton';

const App = () => {
  const [openAIKey, setOpenAIKey] = useState('');
  const [googleAPIKey, setGoogleAPIKey] = useState('');

  return (
    <div className="App">
      <LeaderBoard 
        openAIKey={openAIKey} 
        googleAPIKey={googleAPIKey}
        setOpenAIKey={setOpenAIKey}
        setGoogleAPIKey={setGoogleAPIKey}
      />
      <KeyButton
        openAIKey={openAIKey}
        setOpenAIKey={setOpenAIKey}
        googleAPIKey={googleAPIKey}
        setGoogleAPIKey={setGoogleAPIKey}
      />
    </div>
  );
}

export default App;