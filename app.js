/* express불러오기 */
const express = require("express");
/* 기타 라이브러리 */
const path = require("path");
const bodyParser = require("body-parser");

/*웹서버 생성*/
const app = express();
const port = 8282
app.set("views",__dirname+"/views");
app.set("view engine","pug");


/* 정적 자산 설정 */
/* node 프로젝트 */
app.use("/",express.static(path.join(__dirname,"public")));
/* react 프로젝트 */
app.use("/resume",express.static(path.join(__dirname,"resume/build")));
app.use(bodyParser.urlencoded({extended : true }))


/* 서버 요청 */

/* 연습 */
app.get("/home", (req,res) => {
    res.sendFile(__dirname+"/practice.html");
})

app.get("/write",(req,res)=>{
    res.sendFile(__dirname+"/write.html");

})
app.post("/add",(req,res)=>{
	console.log(req.body.email);
	console.log(req.body.pw);
    res.send("완료")
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
app.listen(port,() => console.log("server : http://localhost:8282"));

/*
const http = require('http').createServer(app);

http.listen(port,() => console.log("server : http://localhost:8282"));

*/
