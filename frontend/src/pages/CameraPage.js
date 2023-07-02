import React, { useEffect, useRef, useState } from "react";
import Select from "react-select";

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
function CameraPage() {
  const [theme, setTheme] = useState([]);
  const [option, setOption] = useState("0");
  const [option1, setOption1] = useState("");
  const [upscale, setUpscale] = useState(false);
  const [loading, setLoading] = useState(false);
  const audioInputRef = useRef(null);
  const [selectedLanguage, setSelectedLanguage] = useState({ value: "English", label: "English" });
  const [translatedAudioURL, setTranslatedAudioURL] = useState(null);
  const [flaggg, setflaggg] = useState(true);

  const handleThemeClick = (selectedTheme) => {
    if (theme.includes(selectedTheme))
      setTheme(theme.filter((theme) => theme !== selectedTheme));
    else setTheme((prev) => [...prev, selectedTheme]);
  };
  const handleradioButton = (option) => {
    setOption1(option);
  };

  const handleOptionSelect = (event) => {
    const selectedOption = event.target.value;
    setOption(selectedOption);
  };

  const handleUpscaleCheckbox = (event) => {
    const checked = event.target.checked;
    setUpscale(checked);
  };
  

  var myArray = artist;

  //audio recorder function
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  // const [cropURL, setCroppedURL] = useState(null);
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
    // event.preventDefault(); // prevent the default form submission behavior
    const formData = new FormData(); // get the form data
    const url = `${base_url}/submit_form`; // replace this with your URL
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
      // setflaggg(false)
      formData.append("audio", audioTemp, "temp.wav");
      console.log(selectedLanguage.value, "heyehey");
      formData.append("selectedLanguage", selectedLanguage.value);
      setLoading(true);
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });
      // console.log("efr"+response);
      console.log(response.headers.get("Content-Type"));
      // const task = await response.json();
      // console.log(task, "hello");
      // const id = task.id;
      // console.log(id);
      if (response.ok) {
        const responseData = await response.blob();

      // Extract the audio and translated text from the response data
      const translatedAudioURL = URL.createObjectURL(responseData);
      // const translatedText = responseData.translated_text;

      setTranslatedAudioURL(translatedAudioURL);
      // console.log(translatedText)
      // setTranslatedText(translatedText);
      setLoading(false);
      } else {
        console.error("Error:", response.status);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(loading);

  const languageOptions = [
    { value: "Afrikaans", label: "Afrikaans" },
    { value: "Albanian", label: "Albanian" },
    { value: "Arabic", label: "Arabic" },
    { value: "Armenian", label: "Armenian" },
    { value: "Catalan", label: "Catalan" },
    { value: "Chinese", label: "Chinese" },
    { value: "Chinese (Mandarin/China)", label: "Chinese (Mandarin/China)" },
    { value: "Chinese (Mandarin/Taiwan)", label: "Chinese (Mandarin/Taiwan)" },
    { value: "Chinese (Cantonese)", label: "Chinese (Cantonese)" },
    { value: "Croatian", label: "Croatian" },
    { value: "Czech", label: "Czech" },
    { value: "Danish", label: "Danish" },
    { value: "Dutch", label: "Dutch" },
    { value: "English", label: "English" },
    { value: "English (Australia)", label: "English (Australia)" },
    { value: "English (United Kingdom)", label: "English (United Kingdom)" },
    { value: "English (United States)", label: "English (United States)" },
    { value: "Esperanto", label: "Esperanto" },
    { value: "Finnish", label: "Finnish" },
    { value: "French", label: "French" },
    { value: "German", label: "German" },
    { value: "Greek", label: "Greek" },
    { value: "Haitian Creole", label: "Haitian Creole" },
    { value: "Hindi", label: "Hindi" },
    { value: "Hungarian", label: "Hungarian" },
    { value: "Icelandic", label: "Icelandic" },
    { value: "Indonesian", label: "Indonesian" },
    { value: "Italian", label: "Italian" },
    { value: "Japanese", label: "Japanese" },
    { value: "Korean", label: "Korean" },
    { value: "Latin", label: "Latin" },
    { value: "Latvian", label: "Latvian" },
    { value: "Macedonian", label: "Macedonian" },
    { value: "Norwegian", label: "Norwegian" },
    { value: "Polish", label: "Polish" },
    { value: "Portuguese", label: "Portuguese" },
    { value: "Portuguese (Brazil)", label: "Portuguese (Brazil)" },
    { value: "Romanian", label: "Romanian" },
    { value: "Russian", label: "Russian" },
    { value: "Serbian", label: "Serbian" },
    { value: "Slovak", label: "Slovak" },
    { value: "Spanish", label: "Spanish" },
    { value: "Spanish (Spain)", label: "Spanish (Spain)" },
    { value: "Spanish (United States)", label: "Spanish (United States)" },
    { value: "Swahili", label: "Swahili" },
    { value: "Swedish", label: "Swedish" },
    { value: "Tamil", label: "Tamil" },
    { value: "Thai", label: "Thai" },
    { value: "Turkish", label: "Turkish" },
    { value: "Vietnamese", label: "Vietnamese" },
    { value: "Welsh", label: "Welsh" },
  ];

  const handleLanguageChange = (selectedOption) => {
    console.log(selectedOption, "hello");
    setSelectedLanguage(selectedOption);
  };
  useEffect(() => {
    if (selectedLanguage && audioURL) {
      console.log("fakiueee");
      handleSubmit();
    }
  }, [selectedLanguage, audioURL]);
  return (
    <>
      <Sidenav />
      <div className="Form">
        <Backdrop open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
        <div className="heading">Speech to Speech translator</div>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="Form-group">
            <div className="inline-flex">
              <label>Translation Language :</label>{" "}
              <Select
                className="dropDownCont"
                styles={customStyles}
                value={selectedLanguage}
                onChange={handleLanguageChange}
                options={languageOptions}
                isSearchable
              />
            </div>
          </div>
          <div className="Form-group">
            <label >Record or Upload Audio:</label>
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
          
          {/* <button type="submit" className="recording-btn">
            Translate
          </button> */}
        </form>
        {translatedAudioURL && (
          <AudioWaveform fileUrl={translatedAudioURL} setTime={setTime} style={{ zIndex:-1 }}/>
        )}
      </div>
    </>
  );
}

export default CameraPage;
