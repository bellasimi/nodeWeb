/* express불러오기 */
const express = require("express");

/*웹서버 생성*/
const app = express();

app.set("views",__dirname+"/views");
app.set("view engine","pug");

app.get("/",(req,res) => {
    console.log("hello world!");
    res.render("index");
});
app.listen(5050,() => console.log("server : http://localhost:5050"));