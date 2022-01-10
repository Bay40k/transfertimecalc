import './App.css';

function VideosComponent() {
  return (
    <div id="videosDiv">
    <h2><input class="checkbox" type="checkbox" id="videosCheckbox" /> Videos: </h2>
    <div>
      <span>Video length: </span>
      <input class="timeInput" type="text" maxlength="2" placeholder="HH" id="hours" disabled /> : <input id="minutes" class="timeInput" type="text" maxlength="2" placeholder="MM" disabled /> : <input id="seconds" class="timeInput" type="text" maxlength="2" placeholder="SS" disabled />
    </div>
    <div>
      <span>Video bitrate (Mbps): </span>
      <input type="text" id="bitrateInputField" disabled />
      <p style={{fontSize: "15px"}}>(Common bitrate ranges from 8-12Mbps for 1080p)</p>
    </div>
    <br />
    <button style={{fontSize: "20px"}}>Calculate</button>
    <div>
      <p>Output (minutes): </p>
      <input type="text" id="outputField" />
    </div>
    </div>
  );
}

function UploadFieldsComponent() {
  return (
    <div>
    <div>
      <span>Upload speed (Mbps): </span>
      <input type="text" id="uploadSpeedInputField" />
    </div>
    <div>
      <span>File size (MB): </span>
      <input type="text" id="fileSizeInputField" />
    </div>
    </div>
  );
}

function App() {
  return (
    <html>
    <head>
		  <link rel="stylesheet" type="text/css" href="style.css" />
    </head>
	  <body>
		  <h1>Upload File Time Calculator</h1>
      <div id="mainDiv">
        <UploadFieldsComponent />
        <VideosComponent />
      </div>
    </body>
    </html>
  );
}

export default App;
