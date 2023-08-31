import sqlite3 from 'better-sqlite3';

// form the database name
const dbName = process.cwd() + '/src/uta100_nodes.db3';
// initial the database connection
const utaDb = new sqlite3(dbName, {fileMustExist: true});

const queryNodes = (utaDb, finishTime, referSet) => {
    // form the query
    let nodesQuery = "SELECT location, AVG(proportion) AS mean, lpid, upid FROM uta100_final_proportion"
    if(referSet > 0) {
        nodesQuery += " LEFT JOIN (SELECT MIN(id) AS lpid, MAX(id) AS upid FROM ( " +
            "SELECT id, racestamp, ABS(racestamp - :finishtime) AS rsdiff FROM uta100_athlete " +
            "WHERE status=1 ORDER BY rsdiff LIMIT :reference)) WHERE pid >= lpid AND pid <= upid"
    }
    else if(referSet < 0) {
        nodesQuery += " LEFT JOIN (SELECT MIN(id) AS lpid, MAX(id) AS upid FROM ( " +
            "SELECT id FROM uta100_athlete WHERE status=1 ORDER BY racestamp LIMIT :reference)) " +
            "WHERE pid >= lpid AND pid <= upid"
    }
    else {
        nodesQuery += " LEFT JOIN (SELECT MIN(id) AS lpid, MAX(id) AS upid FROM uta100_athlete WHERE status=1)"
    }
    nodesQuery += " GROUP BY location ORDER BY location"

    // prepare the query statement
    const nodesSTMT = utaDb.prepare(nodesQuery);

    // setup the query parameters
    const nodesPars = {
        finishtime: finishTime * 3600,
        reference : Math.abs(referSet)
    }
    // get the node data
    const row = nodesSTMT.get(nodesPars)
    const range = [row.lpid, row.upid]
    const eppData = nodesSTMT.all(nodesPars).map(row => Math.exp(Math.PI - row.mean));

    // return the query result
    return {
        finishtime : finishTime,
         reference : referSet,
             range : range,
               epp : eppData
    }
}

export default (req, res) => {
    const finishTime = isNaN(parseFloat(req.query.finishtime)) ? 20 : parseFloat(req.query.finishtime);
    const reference  = isNaN(parseInt(req.query.reference)) ? 0 : parseInt(req.query.reference);

    res.json(
        queryNodes(utaDb, finishTime, reference)
    );
}
