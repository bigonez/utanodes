import sqlite3 from 'better-sqlite3';

// form the database name
const dbName = process.cwd() + '/src/uta_nodes.db3';
// initial the database connection
const raceDb = new sqlite3(dbName, {fileMustExist: true});

const queryEvent = (raceDb, event) => {
    // prepare the query statement
    const tpSTMT = raceDb.prepare("SELECT location, abbr, alias, odometer, IFNULL(cutoff, '') AS cutoff FROM uta_location WHERE event = :event AND alias NOT NULL ORDER BY location");
    // get the all timing locations' data
    const eventTimePoints = tpSTMT.all({event: event});

    // prepare the query statement
    const ignoreSTMT = raceDb.prepare("SELECT location FROM uta_location WHERE event = :event AND alias IS NULL ORDER BY location");
    // get the all timing locations' data
    let eventIgnores = [];
    for (const ignore of ignoreSTMT.iterate({event: event})) {
        eventIgnores.push(ignore.location);
    }

    // return the query result
    return {
        event : event,
        timePoints : eventTimePoints,
        ignoreIdxs : eventIgnores
    }
}

export default (req, res) => {
    const event = isNaN(parseInt(req.query.event)) ? 1 : parseInt(req.query.event);

    res.json(
        queryEvent(raceDb, event)
    );
}
