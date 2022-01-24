/* express불러오기 */
const express = require("express");
/* 기타 라이브러리 */
const path = require("path");
const bodyParser = require("body-parser");
const MongoClient = require('mongodb').MongoClient;

/*웹서버 생성*/
const app = express();
const port = 8282

/* view 엔진 등록*/
app.set("views",__dirname+"/views");
app.set("view engine","pug");


/* 정적 자산 설정 */
/* node 프로젝트 */
app.use("/",express.static(path.join(__dirname,"public")));

/* react 프로젝트 */
app.use("/resume",express.static(path.join(__dirname,"resume/build")));
app.use(bodyParser.urlencoded({extended : true }))

/* 서버 연결

app.listen(port,() => console.log("server : http://localhost:8282"));

const http = require('http').createServer(app);

http.listen(port,() => console.log("server : http://localhost:8282"));

*/


var db;


/* MongoDB 앱에 연결 후 listen */
MongoClient.connect('mongodb+srv://bellasimi:1234@cluster0.624oa.mongodb.net/nodeWeb/retryWrites=true&w=majority',
    (error,client) => {
           if(error) return console.log('에러')

           db = client.db('nodeWeb'); //해당이름의 db 사용 없는 값 입력시 db 해당이름으로 생성

           db.collection('post').insertOne({ name: 'Ravins', _id: '31'  }, ( error, result )=>{
           	console.log('저장완료')
           });

           app.listen(port,() => {
               console.log("server : http://localhost:8282");
           })
})




/* main */
app.get("/",(req,res) => {
    console.log("hello world!");
    res.render("readme");
});

/* react 컴포넌트 하나 띄우기 라우팅 한됨*/
app.get("/resume",(req,res) => {
    res.sendFile(path.join(__dirname,"resume/build/index.html"));
});


/* react 프로젝트에서 라우팅 하도록
app.get("*",(req,res) => {
    res.sendFile(path.join(__dirname,"resume/build/index.html"));
});
*/

