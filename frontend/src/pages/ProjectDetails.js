import React, { useEffect, useRef, useState } from "react";
import "./CameraPage.css";
import Sidenav from "./Sidenav";
import { Backdrop } from "@mui/material";
import { CircularProgress } from "@mui/material";
import artist from "../assests/Artists";
import AudioWaveform from "../components/AudioWave";
import { bufferToWav, cropBuffer, urlToBuffer } from "../assests/assist";
const customStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: "#f2f2f2",
    border: "1px solid #ffe446",
    innerWidth: "10em",
    outerWidth: "10em",
    zIndex:5
    // ...
  }),
  // ...
};
export default function ProjectDetails() {
  const [theme, setTheme] = useState([]);
  const [option, setOption] = useState("0");
  const [option1, setOption1] = useState("");
  const [upscale, setUpscale] = useState(false);
  const [loading, setLoading] = useState(false);
  const audioInputRef = useRef(null);
  const [translatedAudioURL, setTranslatedAudioURL] = useState(null);
  const handleradioButton = (option) => {
    setOption1(option);
  };

  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recordingButtonClass, setRecordingButtonClass] =
    useState("recording-button");
  const [time, setTime] = useState([0, 0]);

  const chunks = [];
  const startRecording = () => {
    setAudioURL(null);
    setRecordingButtonClass("recording-btn recording");
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const recorder = new MediaRecorder(stream);
        recorder.start();
        setRecording(true);
        setMediaRecorder(recorder);

        recorder.addEventListener("dataavailable", (event) => {
          chunks.push(event.data);
        });

        recorder.addEventListener("stop", () => {
          const blob = new Blob(chunks);
          const file = new File([blob], "recording.wav", { type: "audio/wav" });
          // audioInputRef.current.files = [file];
          const dataTransfer = new DataTransfer();
          dataTransfer.items.add(file);

          const fileList = dataTransfer.files;
          audioInputRef.current.files = fileList;
          const url = URL.createObjectURL(blob);
          setAudioURL(url);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const stopRecording = () => {
    mediaRecorder.stop();
    setRecording(false);
    mediaRecorder.stop();
    setRecordingButtonClass("recording-btn");
  };

  const downloadAudio = () => {
    const link = document.createElement("a");
    link.href = audioURL;
    link.download = "recording.wav";
    document.body.appendChild(link);
    link.click();
  };

  const handleAudioUpload = (event) => {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    setAudioURL(url);
  };
  console.log(time);
  const base_url = "http://localhost:5000";
  const handleSubmit = async (event) => {
    event.preventDefault(); // prevent the default form submission behavior
    const formData = new FormData(); // get the form data
    const url = `${base_url}/askqns`; // replace this with your URL
    formData.delete("audio")
    try {
      const buffer = await urlToBuffer(audioURL);
      const croppedBuffer = cropBuffer(buffer, time[0], time[1]);
      const wavBytes = bufferToWav(croppedBuffer);
      const wav = new Blob([wavBytes], { type: "audio/wav" });
      const audioTemp = new File([wav], "my-audio-file.wav", {
        type: "audio/wav",
      });
      console.log(audioTemp);
      formData.append("audio", audioTemp, "temp.wav");
      setLoading(true);
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });
      console.log(response.headers.get("Content-Type"));
      if (response.ok) {
        const translatedAudioBlob = await response.blob();
        const translatedAudioURL = URL.createObjectURL(translatedAudioBlob);
        setTranslatedAudioURL(translatedAudioURL);
        setLoading(false);
      } else {
        console.error("Error:", response.status);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
    setclickFlag(false);
  };
  console.log(loading);

const [clickFlag, setclickFlag] = useState(false);
  // const handleButtonClick= () => {
  //   setclickFlag(true);
  // };
  useEffect(() => {
    if (clickFlag && audioURL) {
      console.log("fakiueee");
      handleSubmit();
    }
  }, [clickFlag, audioURL]);

  return (
    <>
      <Sidenav />
      <div className="Form">
        <Backdrop open={loading}>
          <CircularProgress color="inherit"/>
        </Backdrop>
        <div className="heading">Ask ChatGPT any question</div>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="Form-group">
            <label >Record or upload a recorded question:</label>
            <div>
              <div className="optionsgg">
                <input
                  type="radio"
                  name="audioOption"
                  value="record"
                  onClick={() => handleradioButton("record")}
                />{" "}
                Record
                <input
                  type="radio"
                  name="audioOption"
                  value="upload"
                  onClick={() => handleradioButton("upload")}
                />{" "}
                Upload
              </div>
              {option1 === "record" && (
                <div>
                  {" "}
                  <div>
                    <label htmlFor="record">Record Audio:</label>
                    <input
                      type="file"
                      id="audio"
                      name="audio"
                      accept="audio/*"
                      style={{ display: "none" }}
                      ref={audioInputRef}
                    />
                    {audioURL && (
                      <div style={{ height: 0 }}>
                        <button
                          onClick={downloadAudio}
                          className="download-button"
                          type="button"
                        >
                          Download Audio
                        </button>
                      </div>
                    )}

                    {recording ? (
                      <div>
                        Recording...
                        <div className="Stop">
                          <button
                            type="button"
                            className={recordingButtonClass}
                            onClick={stopRecording}
                          >
                            Stop Recording
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        className="recording-btn"
                        onClick={startRecording}
                        type="button"
                      >
                        Start Recording
                      </button>
                    )}
                    {!recording && (
                      <button
                        type="button"
                        onClick={() => setAudioURL(null)}
                        className="recording-btn"
                      >
                        Record Another
                      </button>
                    )}
                  </div>
                </div>
              )}
              {option1 === "upload" && (
                <div>
                  <label className="choose-file-button" htmlFor="audio">
                    Choose file
                  </label>
                  <input
                    type="file"
                    id="audio"
                    name="audio"
                    accept="audio/*"
                    onChange={handleAudioUpload}
                    style={{ display: "none" }}
                  />
                </div>
              )}
            </div>
            {audioURL && <AudioWaveform fileUrl={audioURL} setTime={setTime} />}
          </div>
          
          <button type="submit" className="recording-btn" >
            Ask
          </button>
        </form>
        {translatedAudioURL && (
          <AudioWaveform fileUrl={translatedAudioURL} setTime={setTime} style={{ zIndex:-1 }}/>
        )}
      </div>
    </>
  );
}
