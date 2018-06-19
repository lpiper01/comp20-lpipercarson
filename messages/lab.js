// Your JavaScript goes here...

var file = "data.json";
var request = new XMLHttpRequest();

var json;

request.onreadystatechange = function() {
	if (request.readyState == 4 && request.status == 200) {
		console.log("Success!");
		
		json = JSON.parse(request.responseText);
	}
}

request.open("GET", file, true);

request.send();

function parse() {
	console.log(json);
	
	var output = document.getElementById("messages");
	var msg = "";
	
	for (var i = 0; i < json.length; i++) {
		msg += "<p class=msg>" + json[i].content + " " + json[i].username + "</p>";
	}
	output.innerHTML = msg;
}