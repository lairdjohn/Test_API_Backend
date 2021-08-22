const db = require("../helpers/database");

// Query selects all dummydata
exports.allDummyData = async function allDummyData(){
    let query = "SELECT * FROM dummy;"
    let data = db.execute_query(query)
    return data;
}