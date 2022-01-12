import './App.css';
import { React, useState } from "react";
import { FitToViewport } from 'react-fit-to-viewport';
import { Button, TextField, Checkbox, createTheme, ThemeProvider } from '@mui/material';
import { orange } from '@mui/material/colors';

function App() {
  const [hoursText, setHoursText] = useState("");
  const [minutesText, setMinutesText] = useState("");
  const [secondsText, setSecondsText] = useState("");
  const [fileSizeText, setFileSizeText] = useState("3000");
  const [bitrateText, setBitrateText] = useState("8");
  const [outputFieldText, setOutputFieldText] = useState("");
  const [uploadSpeedText, setUploadSpeedText] = useState("30");
  const [videosEnabledBool, setVideosEnabledBool] = useState(false);

  const calculate = () => {
    console.log("calculating");
    console.log("videos " + (videosEnabledBool ? "enabled" : "disabled"));

    // fileSize converted to megabits from megabytes, hence the *8
    const fileSize = Number(fileSizeText) * 8;
    const uploadSpeed = Number(uploadSpeedText);
    let uploadTime;

    if (videosEnabledBool === true) {
      const hours = Number(hoursText);
      const minutes = Number(minutesText);
      const seconds = Number(secondsText);
      const bitrate = Number(bitrateText);

      // section below converts times into seconds
      const timeArray = [hours * 60 * 60, minutes * 60, seconds];
      const videoSeconds = timeArray.reduce((a, b) => a + b, 0);

      // video file size in megabits
      const videoSize = videoSeconds * bitrate;
      uploadTime = videoSize / uploadSpeed;

    } else {
      uploadTime = fileSize / uploadSpeed;
      console.log("seconds: " + uploadTime);
    }

    const uploadTimeMinutes = (uploadTime / 60).toFixed(2);
    console.log("minutes: " + uploadTimeMinutes)
    setOutputFieldText(uploadTimeMinutes);

  }

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: orange
    },
  });

  return (
    <FitToViewport width={600} height={1} minZoom={0} maxZoom={1}>
      <ThemeProvider theme={darkTheme}>
		  <h1>Upload File Time Calculator</h1>
      <div className="mainDiv">
        {/*
        Upload speed: <input>
        File size: <input>
        <checkbox> Videos:
        */}
        <div>
          <div className="textInputField">
            <div>Upload speed (Mbps): </div>
            <div><TextField value={uploadSpeedText} onChange={(evt) => setUploadSpeedText(evt.target.value)} /></div>
          </div>
          <div className={`textInputField ${!videosEnabledBool ? '' : 'grayedOut'}`}>
            <div>File size (MB): </div>
            <div><TextField value={fileSizeText} onChange={(evt) => setFileSizeText(evt.target.value)} disabled={videosEnabledBool} /></div>
          </div>
          <div>
            <h2><Checkbox onChange={(evt) => setVideosEnabledBool(evt.target.checked)} /> Videos: </h2>
          </div>
        </div>

        {/*
        Video length: <text: HH>:<text: MM>:<text: SS>
        Video bitrate: <input>
        */}
        <div className={`${videosEnabledBool ? '' : 'grayedOut'}`}>
          <div className="textInputField">
            <div>Video length: </div>
            <div className="timeInputContainer">
              <TextField className="timeInput" value={hoursText} onChange={(evt) => setHoursText(evt.target.value)} maxLength="2" label="HH" disabled={!videosEnabledBool} />
              : <TextField className="timeInput" value={minutesText} onChange={(evt) => setMinutesText(evt.target.value)} maxLength="2" label="MM" disabled={!videosEnabledBool} />
              : <TextField className="timeInput" value={secondsText} onChange={(evt) => setSecondsText(evt.target.value)} maxLength="2" label="SS" disabled={!videosEnabledBool} />
            </div>
          </div>

          <div className="textInputField">
            <div>Video bitrate (Mbps): </div>
            <TextField value={bitrateText} onChange={(evt) => setBitrateText(evt.target.value)} disabled={!videosEnabledBool} />
          </div>

          <div>
            <p className="smallText">(Common bitrate ranges from 8-12Mbps for 1080p)</p>
          </div>
        </div>

        {/*
          <calculate button>
          Output: <text>
        */}
        <div>
          <div className="calculateButton">
            <Button className="calculateButton" variant="contained" onClick={calculate}>Calculate</Button>
          </div>
          <div className="textInputField">
            <p>Output (minutes): </p>
            <TextField value={outputFieldText} onChange={(evt) => setOutputFieldText(evt.target.value)} />
          </div>
        </div>
      </div>
      </ThemeProvider>
    </FitToViewport>
  );
}

export default App;
