var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app);

var regressor = require('./regressor');

// route @ /
app.get('/', function(req,res){
  	res.json({
		"Title": 'Regressor for UTA100 Planner',
		"Usage": 'https://utaregressor.vercel.app/proportion?finishtime=[expected finish time]&reference=[dataset size]',
		"Example":'https://utaregressor.vercel.app/proportion?finishtime=20&reference=100'
	});
});

// route @ /about
app.get('/about', function(req,res){
  	res.json({
		"About": "Regressor for UTA100 Planner"
	});
});

// route @ UTA Regressor
app.get('/proportion', function(req,res){
	var finishTime = parseFloat(req.query.finishtime);
	var reference  = parseInt(req.query.reference);

	regressorData = regressor.queryRegressor(finishTime, reference)

	res.json(Object.assign({
		finishtime : finishTime,
		 reference : reference
	}, regressorData));
});

// start the server
server.listen(3000, function(){
	console.log("Server listening on port: 3000");
});
