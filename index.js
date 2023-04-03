const mysql = require('mysql');
const http = require('http');
const fs = require('fs').promises;

const connection = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : '0000',
  database : 'test'
});

connection.connect();

connection.query('SELECT * FROM user', function(error, results, fields) {
  if(error) {
    console.log(error);
  }
  console.log(results);
})

connection.end();

const server = http.createServer(function(req, res) {
  const mainPage = fs.readFile('./index.html');
  res.writeHead(200, {'Content-type': 'text/html'});
  res.end(mainPage);
})