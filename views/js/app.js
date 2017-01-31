$(document).foundation()

$("#movie_search").on('keyup', function (e) {
	console.log(e.keyCode);

	if (e.keyCode == 13) {
		e.preventDefault();
		var searchVal = $("#movie_search").val();
		if (location.hostname == "localhost") {
			window.location = "http://localhost:3000/search/" + searchVal;
		} else {
			window.location = "http://" + location.hostname + ":3000/search/" + searchVal; //The 3000 Port is just for my current domainless web server. Someone remind me to change it when I register one. 
		}

		
	}	
})