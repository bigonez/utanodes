const sqlite3 = require('better-sqlite3');

// form the database name
const dbName = __dirname + '/uta100_nodes.db3';
// initial the database connection
const utaDb = new sqlite3(dbName, {fileMustExist: true});

const queryNodes = (utaDb, finishTime, referSet) => {
	// form the query
	var nodesQuery = "SELECT location, AVG(proportion) AS mean, lpid, upid FROM uta100_final_proportion"
	if( referSet ) {
		nodesQuery += " LEFT JOIN (SELECT MIN(id) AS lpid, MAX(id) AS upid FROM ( " +
			"SELECT id, racestamp, ABS(racestamp - :finishtime) AS rsdiff FROM uta100_athlete " +
			"WHERE status=1 ORDER BY rsdiff LIMIT :reference)) WHERE pid >= lpid AND pid <= upid"
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
		reference : referSet
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

module.exports = (req, res) => {
	var finishTime = parseFloat(req.query.finishtime);
	var reference  = parseInt(req.query.reference);

	res.json(
		queryNodes(utaDb, finishTime, reference)
	);
}
