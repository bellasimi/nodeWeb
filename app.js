/* express불러오기 */
const express = require("express");

/*웹서버 생성*/
const app = express();



app.get("/",(req,res) => {
    console.log("hello world!");
    res.send("<h1>hello world! this is node.js web</h1>");
});
app.listen(5050,() => console.log("server : http://localhost:5050"));