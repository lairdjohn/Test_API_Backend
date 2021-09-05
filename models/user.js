const db = require('../helpers/database')

// Add users info to db
exports.createAccount = async function createAccount(body){
    let query = 'INSERT INTO users SET ?;'
    let data = await db.execute_query(query, body)
    return data;
}