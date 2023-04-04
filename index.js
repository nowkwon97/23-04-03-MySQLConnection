const mysql = require('mysql2');
const http = require('http');
const fs = require('fs').promises;
const path = require('path');
const qs = require('querystring');

const users = {
  'root': '0000'
};

const server = http.createServer((req, res) => {
  // 요청을 method, url 로 구성된 객체로 값을 받아온다.
  const { method, url } = req;

  // method 가 GET 일 때
  if(method === 'GET') {
    // url이 '/'일 때
    if(url === '/') {
      // fs 으로 파일을 읽어온다.
      // fs.readFile (path, [option], callback)
      fs.readFile(path.join(__dirname, 'login.html'), (err, data) => {
        if (err) {
          res.writeHead(500, { 'Content-type': 'text/plain' });
          res.end('Server Error');
        } else {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(data);
        }
      });
    }
  }else if (method === 'POST') {
    if (url === '/login'){
      let body = '';
      req.on('data', (chunk) => {
        body += chunk.toString();
      });
      req.on('end', () => {
        const { username, password } = qs.parse(body);
        if (username === 'user' && password === 'password') {
          res.writeHead(200, { 'Content-Type': 'text/plain' });
          res.end('Login!');
        } else {
          res.writeHead(401, { 'Content-Type': 'text/plain' });
          res.end('not match');
        }
      });
    }
  } else {
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    res.end();
  }
});

server.listen(8080, 'localhost', () => {
  console.log('8080 port connected');
})






























// // mysql 정보 부분
// const connection = mysql.createConnection({
//   host : 'localhost',
//   user : 'root',
//   password : '0000',
//   database : 'user'
// });
// // mysql 연결
// connection.connect();

// // 서버 연결 부분
// http.createServer(async (req, res) => {
  
//     // query를 이용하여 users테이블 작업
//     connection.query('INSERT INTO users (id, password) VALUES (?, ?)', function(error, results, fields) {
//       if(error) {
//         console.log(error);
//       }
//       console.log(results);
//   })
//   try {
//     const data = await fs.readFile('./login.html');
//     res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'});
//     res.end(data);
//   } catch (err) {
//     console.error(err);
//     res.writeHead(500, {'Content-Type' : 'text/html; charset=utf-8'});
//     res.end(err.message);
//   }
// })

// .listen(8080, () => {
//   console.log('8080번 포트에 서버 대기중');
// });


// // mysql 연결 종료
// connection.end();


