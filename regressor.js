const sqlite3 = require('better-sqlite3');
const utaDb = new sqlite3('./database/uta100_optimal.db3', {fileMustExist: true});

const queryRegressor = function (finishTime, referSet) {
  range = [0, 834]
  eppData = [1., 2., 3., 4., 11., 12., 13., 14., 21., 22., 23., 24., 31., 32., 33., 34., 41., 42.]

  return {
       range : range,
         epp : eppData
  }
}

module.exports = {
  queryRegressor
}
