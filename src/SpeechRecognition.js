









import React, { useState, useEffect } from 'react';
import { useSpeechRecognition } from 'react-speech-recognition';
import './SpeechRecognition.css'; // Import the CSS file

const SpeechRecognition = () => {
  const [spokenText, setSpokenText] = useState('');
  const [microphoneAllowed, setMicrophoneAllowed] = useState(false);

  const handleSpokenText = (event) => {
    setSpokenText(event.results[0][0].transcript);
  };

  const { listening, browserSupportsSpeechRecognition } = useSpeechRecognition({
    onResult: handleSpokenText,
  });

  useEffect(() => {
    if (listening) {
      setMicrophoneAllowed(true);
    } else {
      setMicrophoneAllowed(false);
    }
  }, [listening]);

  const handleMicrophonePermission = () => {
    if (!microphoneAllowed) {
      if (browserSupportsSpeechRecognition) {
        window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
        const recognition = new window.SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = false;
        recognition.onresult = handleSpokenText;
        recognition.start();
      } else {
        console.log('Speech recognition is not supported in this browser.');
      }
    } else {
      window.SpeechRecognition.stop();
    }
  };

  const handleClearText = () => {
    setSpokenText('');
  };

  return (
    <div className="container">
      <h1 className="heading">Speech Recognition</h1>
      <div className="card">
        <p className="text">{spokenText}</p>
        <div className="button-group">
          <button className="button" onClick={handleMicrophonePermission} disabled={!browserSupportsSpeechRecognition}>
            {microphoneAllowed ? 'Stop Listening' : 'Start Listening'}
          </button>
          <button className="button" onClick={handleClearText}>
            Clear Text
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpeechRecognition;





