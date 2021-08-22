// Modules required
const mysql = require("promise-mysql");
const databaseInfo = require("../config.js"); // This is personal DB information needed to connect

// Function allows connection to mySQL db located at root and uses config.js file to setup connection
// Once connection is made, passes query to be executed.
exports.execute_query = async function execute_query(query, values){
    try{
        const databaseConnection = await mysql.createConnection(databaseInfo.config)
        const data = await databaseConnection.query(query, values)
        await databaseConnection.end();
        return data;
    } catch (error) {
        console.log(error)
    }
}