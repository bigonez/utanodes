import sqlite3 from 'better-sqlite3';

import { eventProfiles, eventsConfig } from './raceconfig.js';

// form the database name
const dbName = process.cwd() + '/src/uta_nodes.db3';
// initial the database connection
const raceDb = new sqlite3(dbName, {fileMustExist: true});

const queryEvent = (raceDb, event) => {
    let eventCPNos = [];
    let eventCPNames = [];
    let eventCPOdos = [];
    let eventCutOffStrs = [];

    // prepare the query statement
    const tpSTMT = raceDb.prepare("SELECT location, abbr, alias, odometer, IFNULL(cutoff, '') AS cutoff FROM uta_location WHERE event = :event AND alias NOT NULL ORDER BY location");
    // get the all valid check points' data
    for (const location of tpSTMT.iterate({event: event})) {
        eventCPNos.push(location.abbr);
        eventCPNames.push(location.alias);
        eventCPOdos.push(location.odometer);
        eventCutOffStrs.push(location.cutoff);
    }

    // prepare the query statement
    const ignoreSTMT = raceDb.prepare("SELECT location FROM uta_location WHERE event = :event AND alias IS NULL ORDER BY location");
    // get the all timing locations' data
    let eventIgnores = [];
    for (const ignore of ignoreSTMT.iterate({event: event})) {
        eventIgnores.push(ignore.location);
    }

    // return the query result
    return {
              cpNos : eventCPNos,
            cpNames : eventCPNames,
             cpOdos : eventCPOdos,
         cutOffStrs : eventCutOffStrs,
        arrivalIdxs : eventIgnores
    }
}

export default (req, res) => {
    const event = isNaN(parseInt(req.query.event)) ? 1 : parseInt(req.query.event);

    res.json({
        eventProfile: eventProfiles[event],
        eventConfig: eventsConfig[event],
        courseConfig: queryEvent(raceDb, event)
    });
}
