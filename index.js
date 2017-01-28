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
app.use(express.static(__dirname + '/views/layouts'));

var popularMovies = new Array();

app.get('/', (request, response) => {
	response.render('home', {
		films: popularMovies,
		pageName: "Home"
	})
})

moviedb.discoverMovie(function (err, res) {
	for (i in res.results) {
		popularMovies.push(res.results[i])
	}				
})

app.listen(3000);
console.log('Listening on *:3000')