/* express불러오기 */
const express = require("express");
/* 기타 라이브러리 */
const path = require("path");
const bodyParser = require("body-parser");
const MongoClient = require('mongodb').MongoClient;
const methodOverride = require('method-override');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const session = require('express-session');



/*웹서버 생성*/
const app = express();
const port = 8282


/* view 엔진 등록

app.set("views",__dirname+"/views");
app.set("view engine","pug");
*/

app.set("views",__dirname+"/views");
app.set("view engine", "ejs")





/* 정적 자산 설정 */
/* node 프로젝트 */
app.use("/",express.static(path.join(__dirname,"public")));
app.use(bodyParser.urlencoded({extended : true }))//post 전송값 req.body로 받음
app.use(methodOverride('_method'))
/* session으로 로그인 미들웨어 */
app.use(session({secret: '비밀코드', resave: true, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());
/* react 프로젝트 */
app.use("/resume",express.static(path.join(__dirname,"resume/build")));


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
    res.render("newMemberForm");
});


/* 회원가입 폼 */
app.get("/write",(req,res)=>{
   /* res.sendFile(__dirname+"/write.html");*/
   res.render('newMemberForm');

})


/* 회원 가입*/
app.post('/newMember', (req,res)=> {

    let _id;

    /* _id생성 */
    db.collection('addID').findOne({name: 'counter'}, (error, result)=> {
        if(error) console.log('id findOne 에러');
        _id = result.addId;
        console.log(_id);
        /* post */
        db.collection('post').insertOne({ _id: _id,name : req.body.name, pw : req.body.pw, email : req.body.email },( error, result)=>{
            if(error) console.log('post 에러!')
            res.redirect('/list')

        })

    });



    /* id 증가 */
    db.collection('addID').updateOne({ name: 'counter'},{ $inc: { addId: 1 }}, (error, result)=>{
        if(error) console.log('id update 에러')
    } )



})

/* 회원 목록 */
app.get("/list",(req,res)=>{

    db.collection('post').find().toArray((error,result)=>{
        if(error) console.log("회원 목록 출력 에러")
        res.render("list", { data : result});
    });

})

/* 회원 삭제 */
app.delete("/delete", (req,res)=>{
    console.log("회원 _id: "+req.body);//{_id: _id값}
    req.body._id = parseInt(req.body._id);

    db.collection('post').deleteOne(req.body,(error,result)=>{
        if(error) console.log('회원 삭제 에러')
        res.status(200).send({ msg: '회원삭제 성공!'})
    })


})


/* 상품 입력폼 */
app.get("/addGoodsForm",(req,res)=>{
    res.render("addGoods")
})


/* 상품 입력 */
app.post("/addGoods",(req,res)=>{

    /* 상품 _id 부여 */
    db.collection("addID").findOne({name: "counter"},(error,result)=>{
        let _id = result.addGoodsId;
        /* 상품 DB에 추가 */
        db.collection("goods").insertOne({ _id:_id, name: req.body.name, price: req.body.price, description: req.body.description },
            (error,result)=>{
                    if(error) console.log("상품 입력 에러!");
        })

        /* 상품 _id 증가 */
        db.collection("addID").updateOne({ name: "counter"},{ $inc: { addGoodsId: 1}}, (error,result)=>{
            if(error) console.log("상품 id update 에러");
        })

        res.redirect("/goodsList")
    })

})

/* 상품 리스트 */

app.get("/goodsList",(req,res)=>{
    db.collection("goods").find().toArray((error,result)=>{
        if(error) console.log("상품리스트 db에서 불러오기 에러!")
        res.render("goodsList", { data: result })

    })

})

/* 상품삭제*/

app.delete("/deleteGoods", (req,res)=>{
    req.body._id = parseInt(req.body._id)
    db.collection("goods").deleteOne(req.body,(error,result)=>{
        if(error) console.log("상품삭제 에러!")
        res.send({ msg: "상품삭제 성공!"})
    })

})

/* 상품 수정 폼 */
app.get('/updateGoodsForm/:id',(req,res)=>{
    let _id = parseInt(req.params.id)
    /* 수정폼에 보일 기존 값들 전송 */
    db.collection('goods').findOne({ _id:_id},(error,result)=>{
        if(error) console.log('수정폼에 DB값 불러오기 에러')
        res.render('updateGoods',{ data: result })
    })
})

/* 상품 수정 */
app.put('/updateGoods',(req,res)=>{
/*  let _id = parseInt(req.params.id);*/

    let _id = parseInt(req.body.id);
    let name = req.body.name;
    let price = req.body.price;
    let description = req.body.description;

/*    console.log(_id)
    console.log(name)
    console.log(price)
    console.log(description)*/

    db.collection('goods').updateOne({ _id:_id }, {$set: { name:name, price:price, description:description }},(error,result)=>{
            if(error) console.log('updateGoods 에러!')
            res.redirect('/goodsList')
    })


})


/* 상품 상세 */
app.get('/detail/:id',(req,res)=>{
    let _id = parseInt(req.params.id)
    db.collection('goods').findOne({_id:_id},(error,result)=>{
	    if(error) console.log('상세페이지 출력 에러!')
	    res.render('detail.ejs' , { data: result })
    })
})

/* 로그인 폼 */
app.get('/loginForm',(req,res)=>{
    res.render('login')
})

/* 로그인 */
app.post('/login', passport.authenticate('local',
    {failureRedirect : '/loginFail' /*회원인증 실패시 보낼 url*/ }),
    (req,res)=>{
	    res.redirect('/mypage')//성공시 마이페이지로 보내줌
});

/* 마이페이지 */
function didLogin(req,res,next){
	if(req.user){
		next()// 존재하면 다음으로 통과
	}else{
		res.send('로그인 안함!')
	}
}

app.get('/mypage', didLogin ,(req,res)=>{
	res.render('mypage',{ user: req.user})
})

/* react 컴포넌트 하나 띄우기 라우팅 한됨*/
app.get("/resume",(req,res) => {
    res.sendFile(path.join(__dirname,"resume/build/index.html"));
});


/* react 프로젝트에서 라우팅 하도록
app.get("*",(req,res) => {
    res.sendFile(path.join(__dirname,"resume/build/index.html"));
});
*/


/* 연습 */
app.get("/home", (req,res) => {
    res.sendFile(__dirname+"/practice.html");
})

/* passport */

passport.use(new LocalStrategy({
    usernameField: 'name',
    passwordField: 'pw' ,
    session: true,
    passReqToCallback: false,
}, function (name, pw, done) {
    db.collection('post').findOne({ name: name }, (error,result)=>{
        if(error) return done(error)

        if(!result) return done(null, false, { msg: ' 존재하지 않는 이름!'})
        if( pw === result.pw) {
            return done(null,result)
        }else{
            return done(null,false, { msg: '비번이 틀립니다!' })
        }

    })
}));

/* session*/
passport.serializeUser((user,done)=>{
	done(null,user.name)
})


passport.deserializeUser((name, done )=>{
	db.collection('post').findOne({name: name },(error,result)=>{
		if(error)console.log('해당 이름으로 데이터가 없습니다.')
		done(null,result)//해당 결과를 보여줌-> mypage의 req.user로 받기
	})

})


