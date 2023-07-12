var dotenv = require('dotenv').config();
var express = require('express');
var http = require('http');
var cors = require('cors');
var app = express();
var server = http.createServer(app);

var utanodes = require('./utanodes');

// load the middlewares
//app.use(cors())
if (process.env.NODE_ENV == 'development') {
	var requestlogger = require('./requestlogger');

	console.log(`. start the server in the ${process.env.NODE_ENV} environment`);
	app.use(requestlogger);
}

// route @ /
app.get('/', function(req,res){
	res.json({
		"Title": 'Nodes API for UTA100 Planner',
		"Usage": 'https://utanodes.vercel.app/nodes?finishtime=[expected finish time]&reference=[dataset size]',
		"Example":'https://utanodes.vercel.app/nodes?finishtime=20&reference=100'
	});
});

// route @ /about
app.get('/about', function(req,res){
	res.json({
		"About": "Nodes API for UTA100 Planner",
		"Environment": process.env.NODE_ENV,
		"Service Port": process.env.UTANODES_APP_PORT,
		"Working Path": process.cwd(),
		"Database": __dirname + process.env.UTANODES_APP_DB,
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

// route @ UTA Nodes, CORS enable
app.get('/nodes', cors(corsOptions), utanodes);

// start the server
server.listen(process.env.UTANODES_APP_PORT, function(){
	console.log(". server listening on port: " + process.env.UTANODES_APP_PORT);
});
