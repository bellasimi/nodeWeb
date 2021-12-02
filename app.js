/* express불러오기 */
const express = require("express");
const path = require("path");

/*웹서버 생성*/
const app = express();
const port = 8282
app.set("views",__dirname+"/views");
app.set("view engine","pug");

app.get("/",(req,res) => {
    console.log("hello world!");
    res.render("index");
});
/* 정적 자산 설정 */
/* node 프로젝트 */
app.use(express.static(path.join(__dirname,"public")));
/* react 프로젝트 */
app.use(express.static(path.join(__dirname,"profile/build")));

app.get("/profile",(req,res) => {
    res.sendFile(path.join(__dirname,"profile/build/index.html"));
});

app.listen(port,() => console.log("server : http://localhost:8282"));