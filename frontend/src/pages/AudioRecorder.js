import React, { useState } from 'react';

const AudioRecorder = () => {
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [transcription, setTranscription] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('');

  const startRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        const recorder = new MediaRecorder(stream);
        recorder.start();
        setRecording(true);
        setMediaRecorder(recorder);

        const chunks = [];
        recorder.addEventListener('dataavailable', event => {
          chunks.push(event.data);
        });

        recorder.addEventListener('stop', () => {
          const blob = new Blob(chunks);
          const url = URL.createObjectURL(blob);
          setAudioURL(url);
          convertAudioToText(blob, selectedLanguage);
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  const stopRecording = () => {
    mediaRecorder.stop();
    setRecording(false);
  };

  const playAudio = () => {
    const audio = new Audio(audioURL);
    audio.play();
  };

  const downloadAudio = () => {
    const link = document.createElement('a');
    link.href = audioURL;
    link.download = 'recording.wav';
    document.body.appendChild(link);
    link.click();
  };

  const convertAudioToText = (audioBlob, language) => {
    const formData = new FormData();
    formData.append('audio', audioBlob);
    formData.append('language', language); // Add the language parameter to the form data

    fetch('/api/audio-to-text', {
      method: 'POST',
      body: formData,
      responseType: 'blob'
    })
      .then(response => response.blob())
      .then(data => {
        setTranscription(data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const playTranscribedAudio = () => {
    if (transcription) {
      const audio = new Audio(URL.createObjectURL(transcription));
      audio.play();
    }
  };

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  return (
    <div>
      {recording ? (
        <button onClick={stopRecording}>Stop Recording</button>
      ) : (
        <button onClick={startRecording}>Start Recording</button>
      )}

      {audioURL && (
        <div>
          <button onClick={playAudio}>Play Audio</button>
          <button onClick={downloadAudio}>Download Audio</button>
          <audio src={audioURL} controls />
        </div>
      )}

      <div>
        <h3>Select Language:</h3>
        <select value={selectedLanguage} onChange={handleLanguageChange}>
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          {/* Add more language options as needed */}
        </select>
      </div>

      {transcription && (
        <div>
          <h3>Transcribed Audio:</h3>
          <button onClick={playTranscribedAudio}>Play Transcribed Audio</button>
        </div>
      )}
    </div>
  );
};

export default AudioRecorder;
