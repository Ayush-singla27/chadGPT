import React, { Component } from 'react';
import MicRecorder from 'mic-recorder-to-mp3';

class Recorder extends Component {
  state = {
    isRecording: false,
    isPlaying: false,
    blobURL: null,
    mp3BlobURL: null,
    recorder: null
  };

  startRecording = () => {
    const recorder = new MicRecorder({
      bitRate: 128
    });

    recorder.start().then(() => {
      this.setState({
        isRecording: true,
        recorder: recorder
      });
    }).catch((error) => {
      console.log(error);
    });
  };

  stopRecording = () => {
    this.state.recorder.stop().getMp3().then(([buffer, blob]) => {
      const blobURL = URL.createObjectURL(blob);
      const mp3BlobURL = URL.createObjectURL(new Blob([buffer], { type: 'audio/mp3' }));

      this.setState({
        isRecording: false,
        blobURL: blobURL,
        mp3BlobURL: mp3BlobURL,
        recorder: null
      });
    }).catch((error) => {
      console.log(error);
    });
  };

  playAudio = () => {
    if (this.state.mp3BlobURL) {
      const audio = new Audio(this.state.mp3BlobURL);
      
      console.log(this.state.mp3BlobURL);

      audio.play().then(() => {
        this.setState({
          isPlaying: true
        });
      }).catch((error) => {
        console.log(error);
      });
    }
  };

  downloadAudio = () => {
    const link = document.createElement('a');
    link.href = this.state.mp3BlobURL;
    link.download = 'recording.mp3';
    document.body.appendChild(link);
    link.click();
  };

  render() {
    return (
      <div>
        {this.state.isRecording ? (
          <button onClick={this.stopRecording}>Stop</button>
        ) : (
          <button onClick={this.startRecording}>Record</button>
        )}

        {this.state.mp3BlobURL && (
          <div>
            {/* <button onClick={this.playAudio}>{this.state.isPlaying ? 'Pause' : 'Play'}</button>
            <button onClick={this.downloadAudio}>Download</button> */}
            <audio src={this.state.mp3BlobURL} controls />
          </div>
        )}
      </div>
    );
  }
}

export default Recorder;
