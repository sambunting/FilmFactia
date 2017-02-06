var path = require('path');
var fs = require('fs');
var parseString = require('xml2js').parseString;
var express = require('express');
var exphbs = require('express-handlebars');

var apikeys;

parseString(fs.readFileSync('./api-keys.xml', {encoding: 'utf-8'}), function (err, result) {
	apikeys = result;
})

var moviedb = require('moviedb')(apikeys['APIKEYS']['themoviedb']);

var app = express();

app.engine('.hbs', exphbs({
	defaultLayout: 'main',
	extname: '.hbs',
	layoutDir: path.join(__dirname, 'views/layouts')
}));

app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/views'));


var popularMovies;
var released;

app.get('/', (request, response) => { // This view isn't working as well as it can be. Will load when only one request is ready need to revisit this.
	function callbackPopular (data) {
		popularMovies = data;
	}

	function callbackReleased (data) {
		released = data

		response.render('home', {
			popular: popularMovies,
			new: released,
			pageName: "Home"
		})
	}

	moviedb.discoverMovie({sort_by: 'popularity.desc'}, (err, res) => {
		callbackPopular(res.results);
	}).discoverMovie({'primary_release_date.gte': '2017-01-15', 'primary_release_date.lte' : '2017-01-22'}, (err, res) => {
		callbackReleased(res.results)
	})
})

app.get('/movie/:id', (request, response) => {
	var movieInfo;
	var movieCredits;
	var movieVideo;

	function callbackInfo (data) {
		movieInfo = data;
	};

	function callbackCredits (data) {
		movieCredits = data;
	};

	function callbackVideo (data) {
		movieVideo = data;
	};

	moviedb.movieInfo({id: request.params.id}, (err, res) => {
		callbackInfo(res);

		moviedb.movieCredits({id: request.params.id}, (err, res) => {
			callbackCredits(res);
			
			moviedb.movieVideos({id: request.params.id}, (err, res) => {
				callbackVideo(res);

				response.render('movie', {
					data: movieInfo,
					credits: movieCredits,
					video: movieVideo,
					moviePage: true,
					pageName: movieInfo.title,

					helpers: {
						if_eq: function (a, b, opts) { if (a == b) return opts.fn(this); else { return opts.inverse(this)} }
					}
				})
			});
		});
	})	
});

app.get('/search/:query', (request, response) => {

	moviedb.searchMovie({query: request.params.query }, function(err, res){
		response.render('search', {
			searchQuery: request.params.query,
			results: res.results
		})
	});

	
});

app.listen(3000);
console.log('Listening on *:3000')