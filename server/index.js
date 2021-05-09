const path = require('path');
const express = require('express')
const app = express()
const config = require('./config/key')
const { Member } = require('./model/Member')
//이렇게 써도 무관
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
const monoose = require('mongoose')
//cookieparser사용하기 토큰 쿠키에 저장
const cookieParser = require('cookie-parser')
app.use(cookieParser())
//미들웨어 auth
const { auth } = require('./middleware/auth')

console.log("몽고 : "+config.mongoURI);
monoose.connect(config.mongoURI, {
  useUnifiedTopology: true,useNewUrlParser: true, useFindAndModify: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('몽고 디비 연결됨!'))
.catch(error => handleError(error));

  // mongoose.connect(process.env.DATABASE_URL || "mongodb://localhost:27017/mongoDemo_v7", { useNewUrlParser: true }).
  // catch(error => handleError(error));


  const fs = require('fs');
  //https://www.youtube.com/watch?v=1y0-IfRW114
  const { google } = require('googleapis');
  //Authorization code : 4/0AY0e-g4Bk4TSajIh4lbyKWQppZWMxohKKkNc0Z05_cIMPxQCBMaWv_W-PGPIz_1q2_1riQ
  //Access token: ya29.a0AfH6SMAyZFlMd0JKaZr_GijzwX62EzU8fqEuuIgf4YUsauXZHbh_v236kE6o-l11t1AlUxjMu-Pt63J0oOsVHNIhJOjXTiOKDXOoDeUrYqZvq9WUZXxvcaWNI4zSVj_q3WGmO1tuaaTN1OqB1VFsoF6EIThX
  const CLIENT_ID = '25687515677-g8530d90ejo35p9orem1chcv490l6dhk.apps.googleusercontent.com';
  const CLIENT_SECRET = 'CYnUu7p3ZExPBmTsS5NTdCe3';
  const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
  const REFRESH_TOKEN = '1//04xIHyIXnrO8MCgYIARAAGAQSNwF-L9IrIks9TjnooXjMwe85aQ7s8kwKeSN21Zgi3sLYWdyWOAekcIEE4zWft1LsLwzkRBdSKZ4';
  
  const oauth2Client = new google.auth.OAuth2(
      CLIENT_ID,
      CLIENT_SECRET,
      REDIRECT_URI
  );
  
  oauth2Client.setCredentials({refresh_token : REFRESH_TOKEN});
  
  const drive = google.drive({
      version : 'v3',
      auth:oauth2Client
  });
  
  const filePath = path.join(__dirname,'x.jpg');
  
// 미들웨어 함수를 특정 경로에 등록
app.use('/api/upload', function(req, res) {
    try{
      const response = drive.files.create({
          requestBody:{
              name : 'gg.jpg',
              mimeType:'image/jpg',
          },
          media:{
              mimeType:'image/jpg',
              body:fs.createReadStream(filePath)
          }
      })
      return res.status(200).json({//200은 성공을 의미
        upload: true
      })
  }catch(error){
      console.log(error.message);
      return res.json({ upload: false, error:error })
  }
});



// 미들웨어 함수를 특정 경로에 등록
app.use('/api/data', function(req, res) {
  res.json({ greeting: 'Hello cms World' });
});

app.get('/api/hello', (req,res) =>{
  res.send('서버에서 보낸 메세지')
})

//회원 추가하기
app.post('/api/users/register', (req, res) => {
  //회원 가입 필요한 정보들을 client에서 가져오면 그것을 DB에 넣어준다.
  const user = new Member(req.body)
  //req.body는 json 형식으로 넘어온다.
  //이건 bodyParser를 이용해서 클라이언트의 정보를 req로 받아주는것이라고한다.

  //몽고 디비에있는 함수
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err })
    //성공 못하면 false랑 err 내용이 뜨는것
    return res.status(200).json({//200은 성공을 의미
      success: true
      //성공하면 success가 true가 뜨고
    })
  })
})

//로그인하기
app.post('/api/users/login', (req, res) => {

  //이메일 디비에서 확인
  //몽고디비에서 제공하는 findOne 함수를 이용해서 찾기
  //req.body.email는 넘어오는 리퀘스트에 email 값
  console.log("값 : "+req.body.remember);

  if(req.body.remember){
    console.log("아이디 저장");
    res.cookie("id", req.body.memberId);
  }else{
    res.cookie("id", "");
  }

  Member.findOne({ memberId: req.body.memberId }, (err, userInfo) => {
    //userInfo가 없으면 로그인 실패라고 표시해줌
    console.log("userInfo : " + userInfo)
    //userInfo 값에는 몽고디비에서 해당 이메일에 맞는 값들을 가져와줌 role,id,name,email 등등
    if (!userInfo) {
      return res.json({
        loginSuccess: false,
        message: "로그인 실패"
      })
    }
    //비밀번호 확인
    //comparePassword 함수는 Users.js에서 만듬
    userInfo.comparePassword(req.body.password, (err, isMatch) => {
      console.log("isMatch : " + isMatch)
      console.log("err : " + err)
      console.log("req.body.password : " + req.body.password)

      //isMatch가 false인경우
      if (!isMatch)
        return res.json({
          loginSuccess: false,
          message: "비밀번호 틀림"
        })
      //isMatch가 true인 경우
      //로그인 성공하면 토큰 생성하기
      userInfo.generateToken((err, userInfo) => {
        //err가 있으면 400 페이지랑 에러를 표시한다
        console.log("err : " + err)
        if (err) return res.status(400).send(err)

        //토큰을 쿠키나 로컬스토리지에 저장한다
        res.cookie("wowloginMember", userInfo.token).status(200).json({
          loginSuccess: true,
          userId: userInfo._id,
          message: "로그인 성공"
        })
      })
    })
  })
})

app.get('/api/users/logout', auth, (req, res) => {

  console.log("req.user._id : " + req.user._id)
  //몽고 디비에서 제공하는 함수
  Member.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    if (err) return res.json({ success: false, err })
    return res.status(200).send({
      success: true,
      message: "로그 아웃 성공"
    })
  })
})

//auth 미들웨어이다.
app.get('/api/users/mem', auth, (req, res) => {
  console.log("미들웨어 지나서 메소드 실행됨");
  //여기까지 미들웨어를 통과해왔다는것은 
  //authentication 이 true라는 말
  res.status(200).json({
    _id: req.user._id,
    isLogined: true,
    memberId: req.user.memberId,
    token: req.user.token
  })

})


// --> Add this
if (process.env.NODE_ENV === 'production') {
  app.use(express.static("client/build"));
  app.get("*", (req,res) => {
    res.sendFile(path.resolve(__dirname, "../client","build","index.html"));
  })
}

const PORT = process.env.PORT || 5000
app.listen(PORT, (req, res) => {
    console.log(`server listening on port: ${PORT}`)
  });
