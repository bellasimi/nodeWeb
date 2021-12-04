/* express불러오기 */
const express = require("express");
const path = require("path");

/*웹서버 생성*/
const app = express();
const port = 8282
app.set("views",__dirname+"/views");
app.set("view engine","pug");

app.get("/readme",(req,res) => {
    console.log("hello world!");
    res.render("readme");
});
/* 정적 자산 설정 */
/* node 프로젝트 */
app.use(express.static(path.join(__dirname,"public")));
/* react 프로젝트 */
app.use(express.static(path.join(__dirname,"resume/build")));

app.get("/",(req,res) => {
    res.sendFile(path.join(__dirname,"resume/build/index.html"));
});

app.listen(port,() => console.log("server : http://localhost:8282"));