const db = require('../helpers/database')

// Store data into db or replace the original entry with newer data
exports.saveRecentStats = async function saveRecentStats(values){
    let query = 'REPLACE INTO stats SET?;'
    let data = await db.execute_query(query, values);
    return data;
}

exports.myStats = async function myStats(id){
    let query = 'SELECT * FROM stats WHERE ID = ?;'
    let data = await db.execute_query(query, id)
    return data;
}