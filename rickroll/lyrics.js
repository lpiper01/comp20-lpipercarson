
	var lyric_data = Array(
	"We're no strangers to love <br>You know the rules and so do I<br>A full commitment's what I'm thinking of<br>You wouldn't get this from any other guy",

	"I just wanna tell you how I'm feeling<br>Gotta make you understand",

	"Never gonna give you up<br>Never gonna let you down<br>Never gonna run around and desert you<br>Never gonna make you cry<br>Never gonna say goodbye<br>Never gonna tell a lie and hurt you",

	"We've known each other for so long<br>Your heart's been aching, but<br>You're too shy to say it<br>Inside, we both know what's been going on<br>We know the game and we're gonna play it",

	"And if you ask me how I'm feeling<br>Don't tell me you're too blind to see",

	"(Ooh, give you up)<br>(Ooh, give you up)<br>Never gonna give, never gonna give<br>(Give you up)<br>Never gonna give, never gonna give<br>(Give you up)",
	);


	function displayNextLine(lyric_field, lyric_data, timestamp)
	{

		timestamp = Math.round(timestamp);
		if (timestamp > 19 && timestamp < 35) {
			lyric_field.innerHTML = lyric_data[0];
		} else if (timestamp > 35 && timestamp < 43) {
			lyric_field.innerHTML = lyric_data[1];
		} else if (timestamp > 43 && timestamp < 60) {
			lyric_field.innerHTML = lyric_data[2];
		} else if (timestamp > 60 && timestamp < 77) {
			lyric_field.innerHTML = lyric_data[3];
		} else if (timestamp > 77 && timestamp < 85) {
			lyric_field.innerHTML = lyric_data[4];
		} else if (timestamp > 85 && timestamp < 103) {
			lyric_field.innerHTML = lyric_data[2];
		} else if (timestamp > 103 && timestamp < 120) {
			lyric_field.innerHTML = lyric_data[2];
		} else if (timestamp > 120 && timestamp < 136) {
			lyric_field.innerHTML = lyric_data[5];
		} else if (timestamp > 136 && timestamp < 153) {
			lyric_field.innerHTML = lyric_data[3];
		} else if (timestamp > 153 && timestamp < 162) {
			lyric_field.innerHTML = lyric_data[1];
		} else if (timestamp > 162 && timestamp < 178) {
			lyric_field.innerHTML = lyric_data[2];
		} else if (timestamp > 178 && timestamp < 195) {
			lyric_field.innerHTML = lyric_data[2];
		} else if (timestamp > 195) {
			lyric_field.innerHTML = lyric_data[2];
		} else {
			lyric_field.innerHTML = "<span class=dancing>[Soulful Dancing]</span>";
		}
	}

	var lyric_field = document.getElementById("lyrics");
	var video = document.getElementById("rickroll");
	video.addEventListener("timeupdate", 
	function(){
		var timestamp = video.currentTime;
		displayNextLine(lyric_field, lyric_data, timestamp);
	}, false);
	

	