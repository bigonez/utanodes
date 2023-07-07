const sqlite3 = require('better-sqlite3');
var utaDb = null;

const initDb = function (dbname) {
	utaDb = new sqlite3(dbname, {fileMustExist: true});
}

const queryRegressor = function (finishTime, referSet) {
	// form the query
	var optimalQuery = "SELECT location, AVG(proportion) AS mean, lpid, upid FROM uta100_final_proportion"
	if( referSet ) {
		optimalQuery += " LEFT JOIN (SELECT MIN(id) AS lpid, MAX(id) AS upid FROM ( " +
			"SELECT id, racestamp, ABS(racestamp - "+(finishTime * 3600)+") AS rsdiff FROM uta100_athlete " +
			"WHERE status=1 ORDER BY rsdiff LIMIT "+ referSet +")) WHERE pid >= lpid AND pid <= upid"
	}
	else {
		optimalQuery += " LEFT JOIN (SELECT MIN(id) AS lpid, MAX(id) AS upid FROM uta100_athlete WHERE status=1)"
	}
	optimalQuery += " GROUP BY location ORDER BY location"

	// prepare the query statement
	const optimalSTMT = utaDb.prepare(optimalQuery);

	// get the regressor data
	const row = optimalSTMT.get()
	const range = [row.lpid, row.upid]
	const eppData = optimalSTMT.all().map(row => Math.exp(Math.PI - row.mean));

	// return the query result
	return {
		range : range,
		epp   : eppData
	}
}

module.exports = {
	initDb,
	queryRegressor
}
