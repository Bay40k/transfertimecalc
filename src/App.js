import './App.css';
import { useState } from "react";

function App() {
  const [hoursText, setHoursText] = useState("");
  const [minutesText, setMinutesText] = useState("");
  const [secondsText, setSecondsText] = useState("");
  const [fileSizeText, setFileSizeText] = useState("");
  const [bitrateText, setBitrateText] = useState("");
  const [outputFieldText, setOutputFieldText] = useState("");
  const [uploadSpeedText, setUploadSpeedText] = useState("");
  const [videosEnabledBool, setVideosEnabledBool] = useState(false);

  const calculate = () => {
    console.log("calculating");
    console.log("videos " + (videosEnabledBool ? "enabled" : "disabled"));

    // fileSize converted to megabits from megabytes, hence the *8
    let fileSize = Number(fileSizeText) * 8;
    let uploadSpeed = Number(uploadSpeedText);

    if (videosEnabledBool === true) {
      let hours = Number(hoursText);
      let minutes = Number(minutesText);
      let seconds = Number(secondsText);
      let bitrate = Number(bitrateText);

      // section below converts times into seconds
      let timeArray = [hours * 60 * 60, minutes * 60, seconds];

      let videoSeconds = 0;

      let i;
      var uploadTime;
      for (i = 0; i < timeArray.length; i++) {
         videoSeconds += Number(timeArray[i]);
      }

      // video file size in megabits
      let videoSize = videoSeconds * bitrate;
      uploadTime = videoSize / uploadSpeed;


    } else {
      uploadTime = fileSize / uploadSpeed;
      console.log("seconds: " + uploadTime);
    }

    let uploadTimeMinutes = (uploadTime / 60).toFixed(2);
    console.log("minutes: " + uploadTimeMinutes)
    setOutputFieldText(uploadTimeMinutes);

  }

  return (
    <div>
		  <h1>Upload File Time Calculator</h1>
      <div id="mainDiv">
        <div id="speedsDiv">
          <div>
            <span>Upload speed (Mbps): </span>
            <input type="text" id="uploadSpeedInputField" value={uploadSpeedText} onChange={(evt) => setUploadSpeedText(evt.target.value)} />
          </div>
          <div>
            <span>File size (MB): </span>
            <input type="text" id="fileSizeInputField" value={fileSizeText} onChange={(evt) => setFileSizeText(evt.target.value)} disabled={videosEnabledBool} />
          </div>
        </div>
        <div id="videosDiv">
          <h2><input className="checkbox" type="checkbox" id="videosCheckbox" onChange={(evt) => setVideosEnabledBool(evt.target.checked)} /> Videos: </h2>
          <div>
            <span>Video length: </span>
            <input id="hours" className="timeInput" type="text" value={hoursText} onChange={(evt) => setHoursText(evt.target.value)} maxLength="2" placeholder="HH" disabled={!videosEnabledBool} />
            : <input id="minutes" className="timeInput" type="text" value={minutesText} onChange={(evt) => setMinutesText(evt.target.value)} maxLength="2" placeholder="MM" disabled={!videosEnabledBool} />
            : <input id="seconds" className="timeInput" type="text" value={secondsText} onChange={(evt) => setSecondsText(evt.target.value)} maxLength="2" placeholder="SS" disabled={!videosEnabledBool} />
          </div>
          <div>
            <span>Video bitrate (Mbps): </span>
            <input type="text" id="bitrateInputField" value={bitrateText} onChange={(evt) => setBitrateText(evt.target.value)} disabled={!videosEnabledBool} />
            <p style={{fontSize: "15px"}}>(Common bitrate ranges from 8-12Mbps for 1080p)</p>
          </div>
          <br />
          <button style={{fontSize: "20px"}} onClick={calculate}>Calculate</button>
          <div>
            <p>Output (minutes): </p>
            <input type="text" id="outputField" value={outputFieldText} onChange={(evt) => setOutputFieldText(evt.target.value)} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
