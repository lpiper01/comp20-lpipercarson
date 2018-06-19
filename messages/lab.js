// Your JavaScript goes here...

var file = "data.json";
var request = new XMLHttpRequest();

request.onreadystatechange = function() {
	if (request.readyState == 4 && request.status == 200) {
		console.log("Success!");
	}
}

request.open("GET", file, true);

request.send();

function parse() {
	console.log("Parsing");
	
	
}