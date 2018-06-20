
// Array of objects of the form:
// {id: , pos: {lat:, lng:}, line:, 
var stations = Array();

var red_line_stops = Array();

var order = ["Alewife", "Davis", "Porter", "Harvard", "Central", "Kendall/MIT", "Charles/MGH", "Park Street", 
			 "Downtown Crossing", "South Station", "Broadway", "Andrew", "JFK/UMass", "Braintree"];
var order_vals = {};

var my_marker = undefined;

redline_order();
			 
/* Loads all stations from data.csv and calls parseData
 * Returns: none
 * Modifies: none
 */
function loadAllStations()
{
	jQuery.ajax({
		url: "data.csv",
		dataType: "text"
	}).done(parseData);
	
	
}

function markMyPos()
{
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(markPos);
	}

}

function markPos(position)
{
	var lat = position.coords.latitude;
	var lng = position.coords.longitude;
	my_marker = new google.maps.Marker({position: {lat, lng}, map: map, title: "My Location"});
}

function findClosestStop()
{
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(closestStop);
	}

}

function closestStop(myPos)
{
	var myLat = myPos.coords.latitude;
	var myLng = myPos.coords.longitude;
	var myLatLng = new google.maps.LatLng(myLat, myLng);
	
	var closest_stop = {dist : Infinity, name : "", pos : new google.maps.LatLng(0,0)};
	
	for (var i = 0; i < red_line_stops.length; i++) {
		var current_stop = red_line_stops[i];
		var currentLatLng = new google.maps.LatLng(current_stop.pos.lat, current_stop.pos.lng);

		var current_dist = google.maps.geometry.spherical.computeDistanceBetween(myLatLng, currentLatLng);

		if (current_dist < closest_stop.dist) {
			closest_stop.dist = current_dist;
			closest_stop.name = current_stop.name;
			closest_stop.pos = currentLatLng;
			
		}
	}
	
	my_marker.setTitle("My position\nClosest stop is: " + closest_stop.name);
	var line = new google.maps.Polyline({
		path: [
			myLatLng,
			closest_stop.pos
		],
		geodesic: true
	});
	line.setMap(map);
}



// Turn plaintext CSVs into an array of station objects
function parseData(data)
{
	// Get each individual station's data into separate slot of array
	var station_array = data.split("\n");
	
	// Skip the first entry, as it's just the sections
	for ( var i = 1; i < station_array.length; i++) {
		var station_properties = station_array[i].split(",");
		
		// We don't want to include buses
		if (station_properties[4].includes("SILVER")) { continue };
		stations[i] = {};
		stations[i]["pos"] = {};
		stations[i]["pos"]["lng"] = Number(station_properties[0]);
		stations[i]["pos"]["lat"] = Number(station_properties[1]);
		stations[i]["id"] = station_properties[2];
		stations[i]["name"]= station_properties[3];
		stations[i]["line"] = station_properties[4];
	}

	stations.forEach(
		function(station) {
			markMap(station);
		}
	);
	
	draw_lines();
	
}

// Create google map and then begin populating it with data
function initMap()
{
	var sstation = {lat: 42.352271, lng: -71.05524200000001};
	map = new google.maps.Map(document.getElementById('map'), {zoom: 18, center: sstation});
	
	// Once map is available, we can populate it with markers and lines
	google.maps.event.addListenerOnce(map, 'idle', function(){
		loadAllStations();
		markMyPos();
				findClosestStop();
	});

}

// Creates a market at the given station's position
function markMap(station)
{
	var pos = station.pos;
	var name = station.name;
	var marker = { url: "9759.png", scaledSize: new google.maps.Size(40, 40)};
	var sstation_mark = new google.maps.Marker({position: pos, map: map, icon: marker, title: name});
	
	if (station.line.includes("RED") && order.indexOf(station.name) > -1 ) {
		red_line_stops.push(station);
	}
}


function draw_lines()
{
	red_line_stops.sort(ID_sort);
	
	var red_line_path = Array();
	red_line_stops.forEach(
		function(station) {
			red_line_path.push(station.pos);
		}
	);
	
	var station_path = new google.maps.Polyline({
		path: red_line_path,
		geodesic: true,
		strokeColor: "#FF0000",
		strokeWeight: 2,
		strokeOpacity: 1.0
	});
	station_path.setMap(map);
		
}

// Assign a numerical order to the name of each station
function redline_order()
{
	for (var i = 0; i < order.length; i++) {
		order_vals[order[i]] = i;
	}
}

function ID_sort(a, b)
{
	if (order_vals[a.name] > order_vals[b.name])
		return 1;
	else if (order_vals[a.name] < order_vals[b.name])
		return -1;
	return 0;
}


