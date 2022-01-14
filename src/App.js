import './App.css';
import { React, useState } from "react";
import { FitToViewport } from 'react-fit-to-viewport';
import { Button, TextField, Checkbox, createTheme, ThemeProvider, InputAdornment, OutlinedInput, FormHelperText } from '@mui/material';
import { orange } from '@mui/material/colors';

function App() {
  const [hoursText, setHoursText] = useState("");
  const [minutesText, setMinutesText] = useState("");
  const [secondsText, setSecondsText] = useState("");
  const [fileSizeText, setFileSizeText] = useState("3000");
  const [bitrateText, setBitrateText] = useState("8");
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
    return uploadTimeMinutes;
  }

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: orange
    },
  });

  return (
    <FitToViewport style={{width: "auto"}} width={1} height={1} minZoom={0.8} maxZoom={1}>
      <ThemeProvider theme={darkTheme}>
		  <h1>File Transfer Time Calculator</h1>
      <div className="mainDiv">
        {/*
        Upload speed: <input>
        File size: <input>
        <checkbox> Videos:
        */}
        <div>
          <div className="textInputField">
            <div>
              <FormHelperText id="outlined-speed-helper-text">Transfer speed</FormHelperText>
              <OutlinedInput className="fullWidth" value={uploadSpeedText} onChange={(evt) => setUploadSpeedText(evt.target.value)}
                endAdornment={<InputAdornment position="end">Mbps</InputAdornment>}
                aria-describedby="outlined-speed-helper-text"
                inputProps={{
                  'aria-label': 'Transfer speed',
                }}
            /></div>
          </div>
          <div className={`textInputField ${!videosEnabledBool ? '' : 'grayedOut'}`}>
            <div>
              <FormHelperText id="outlined-size-helper-text">File size</FormHelperText>
              <OutlinedInput className="fullWidth" value={fileSizeText} onChange={(evt) => setFileSizeText(evt.target.value)} disabled={videosEnabledBool}
                endAdornment={<InputAdornment position="end">MB</InputAdornment>}
                aria-describedby="outlined-size-helper-text"
                inputProps={{
                  'aria-label': 'File size',
                }}
            /></div>
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
            <div>Video bitrate: </div>
            <OutlinedInput value={bitrateText} onChange={(evt) => setBitrateText(evt.target.value)} disabled={!videosEnabledBool}
              endAdornment={<InputAdornment position="end">Mbps</InputAdornment>}/>
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
          <div className="textInputField">
            <div>Output: </div>
            <OutlinedInput value={calculate()}
              endAdornment={<InputAdornment position="end">Min.</InputAdornment>} />
          </div>
        </div>
      </div>
      </ThemeProvider>
    </FitToViewport>
  );
}

export default App;
