const mysql = require('mysql2');
const http = require('http');
const fs = require('fs').promises;

// mysql 정보 부분
const connection = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : 'cbs8807232^^',
  database : 'user'
});
// mysql 연결
connection.connect();

// 서버 연결 부분
http.createServer(async (req, res) => {
  // query를 이용하여 mysql 작업
  connection.query('SELECT * FROM users', function(error, results, fields) {
    if(error) {
      console.log(error);
    }
    console.log(results);
})
  try {
    const data = await fs.readFile('./index.html');
    res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'});
    res.end(data);
  } catch (err) {
    console.error(err);
    res.writeHead(500, {'Content-Type' : 'text/html; charset=utf-8'});
    res.end(err.message);
  }
})

.listen(8080, () => {
  console.log('8080번 포트에 서버 대기중');
});


// // mysql 연결 종료
// connection.end();


