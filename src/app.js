const dotenv = require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const router = express.Router();
const app = express();
const server = http.createServer(app);

const utanodes = require('./utanodes');
const { appRoot, appAbout } = require('./appmethods');
const corsOptions = require('./corsoptions');

// load the middlewares
//app.use(cors())
if (process.env.NODE_ENV == 'development') {
	const requestlogger = require('./requestlogger');

	console.log(`. start the server in the ${process.env.NODE_ENV} environment`);
	app.use(requestlogger);
}

// route @ /
router.get('/', appRoot);
// route @ /about
router.get('/about', appAbout);
// route @ UTA Nodes, CORS enable
router.get('/nodes', cors(corsOptions), utanodes);

// inject the router into app
app.use(router);

// start the server
server.listen(process.env.UTANODES_APP_PORT, function(){
	console.log(". server listening on port: " + process.env.UTANODES_APP_PORT);
});
