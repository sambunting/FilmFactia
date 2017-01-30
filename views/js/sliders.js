var options = {
    horizontal: 1,
	itemNav: 'basic',
	smart: 1,
	activateOn: 'click',
	mouseDragging: 1,
	touchDragging: 1,
	releaseSwing: 1,
	startAt: 0,
	scrollBar: $('#popularMoviesScrollbar'),
	scrollBy: 1,
	speed: 300,
	elasticBounds: 1,
	dragHandle: 1,
	dynamicHandle: 1,
	clickBar: 1,
};

var options1 = {
    horizontal: 1,
	itemNav: 'basic',
	smart: 1,
	activateOn: 'click',
	mouseDragging: 1,
	touchDragging: 1,
	releaseSwing: 1,
	startAt: 0,
	scrollBar: $('#newMoviesScrollbar'),
	scrollBy: 1,
	speed: 300,
	elasticBounds: 1,
	dragHandle: 1,
	dynamicHandle: 1,
	clickBar: 1,
};
var frame = new Sly('#popularMovies', options).init();
var frame = new Sly('#newMovies', options1).init();

$(window).resize(function(e) {
	$("#popularMovies").sly('reload');
	$("#newMovies").sly('reload');
});