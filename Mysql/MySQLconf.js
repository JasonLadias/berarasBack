const mysql = require("mysql")
const conf = require('../../jas.js')
console.log(conf)

// Create a connection to the database
const connection = mysql.createConnection(conf
);

// open the MySQL connection
connection.connect(error => {
  if (error) throw error
  console.log("Successfully connected to the database.")
});

module.exports = connection