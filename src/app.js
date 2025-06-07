import dotenv from 'dotenv';
const config = dotenv.config();

import express from 'express';
import http from 'http';
import cors from 'cors';
const app = express();
const router = express.Router();
const server = http.createServer(app);

import racenodes from './racenodes.js';
import raceevent from './raceevent.js';
import { appRoot, appAbout } from './appmethods.js';
import corsOptions from './corsoptions.js';

// load the middlewares
//app.use(cors())
if (process.env.NODE_ENV == 'development') {
    const { default: requestlogger } = await import('./requestlogger.js');

    console.log(`. start the server in the ${process.env.NODE_ENV} environment`);
    app.use(requestlogger);
}

// route @ /
router.get('/', appRoot);
// route @ /about
router.get('/about', appAbout);
// route @ UTA Nodes, CORS enable
router.get('/nodes', cors(corsOptions), racenodes);
// route @ UTA Event, CORS enable
router.get('/event', cors(corsOptions), raceevent);

// inject the router into app
app.use(router);

// start the server
server.listen(process.env.RACENODES_APP_PORT, function(){
    console.log(". server listening on port: " + process.env.RACENODES_APP_PORT);
});
