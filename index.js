var dotenv = require('dotenv').config();
var express = require('express');
var http = require('http');
var cors = require('cors');
var app = express();
var server = http.createServer(app);

//var regressor = require('./regressor');

//app.use(cors())
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
		"About": "Regressor for UTA100 Planner",
		"Service Port": process.env.UTANODES_APP_PORT,
		"Database": process.env.UTANODES_APP_DB
	});
});

// configure the CORS options
var corsOptions = {
	origin: [
		"https://utaplanner.vercel.app",
		"http://localhost",
		"http://localhost:8080",
	],
	optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

// route @ UTA Regressor, CORS enable
app.get('/proportion', cors(corsOptions), function(req,res){
	var finishTime = parseFloat(req.query.finishtime);
	var reference  = parseInt(req.query.reference);

	regressorData = regressor.queryRegressor(finishTime, reference)

	res.json(Object.assign({
		finishtime : finishTime,
		 reference : reference
	}, regressorData));
});

// start the server
server.listen(process.env.UTANODES_APP_PORT, function(){
	console.log("Server listening on port: " + process.env.UTANODES_APP_PORT);
});
