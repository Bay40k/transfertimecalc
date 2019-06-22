var videosEnabled = false;

// disables/enables all elements in an array
function disableEnableAll(enableBool, input) {
	for (i = 0; i < input.length; i++) {
		if (enableBool == true) {
			console.log("enabling")
			input[i].disabled = false;
			videosEnabled = true;
		} else {
			console.log("disabling")
			input[i].disabled = true;
			videosEnabled = false;
		}
	}	
}

function clearFields () {
	// clears all input values
	fields = document.getElementsByTagName("input");
	for (i = 0; i < fields.length; i++) {
		fields[i].value = "";
	}
}

function onLoad() {
	console.log("JS Loaded");
	var videosCheckBox = document.getElementById("videosCheckbox");
	var videoTextFields = document.getElementById("videosDiv").getElementsByTagName("input");
	var fileSize = document.getElementById("fileSizeInputField");

	// set default state
	videosCheckbox.checked = false;
	disableEnableAll(false, videoTextFields);;
	fileSize.disabled = false;
	clearFields();

	// enable Videos section and disable File Size if checkbox is checked, vice versa if unchecked
	videosCheckbox.addEventListener("change", function () {
		if(this.checked) {
			disableEnableAll(true, videoTextFields);
			fileSize.disabled = true;
		} else {
			disableEnableAll(false, videoTextFields);
			fileSize.disabled = false;
		}
	});
}


function calculate() {
	console.log("calculating");
	console.log(videosEnabled);
	var outputField = document.getElementById("outputField");

	// fileSize converted to megabits from megabytes, hence the *8
	var fileSize = Number(document.getElementById("fileSizeInputField").value * 8);
	var uploadSpeed = Number(document.getElementById("uploadSpeedInputField").value);

	if (videosEnabled == true) {
		var hours = Number(document.getElementById("hours").value);
		var minutes = Number(document.getElementById("minutes").value);
		var seconds = Number(document.getElementById("seconds").value);

		var bitrate = Number(document.getElementById("bitrateInputField").value);

		// section below converts times into seconds
		timeArray = [hours * 60 * 60, minutes * 60, seconds];
 
		var videoSeconds = 0;

		for (i = 0; i < timeArray.length; i++) {
			 videoSeconds += Number(timeArray[i]);
		}

		// video file size in megabits
		var videoSize = videoSeconds * bitrate;

		var uploadTime = videoSize / uploadSpeed;
		
		
	} else {
		var uploadTime = fileSize / uploadSpeed;
		console.log(uploadTime);
	}

	// convert from seconds to minutes, limit to 2 decimal places
	outputField.value = (uploadTime / 60).toFixed(2);

}