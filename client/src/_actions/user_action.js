import axios from 'axios'
//타입에서 가져오기
import {LOGIN_USER, REGISTER_USER, ATUH_USER} from './types'

//view 페이지에서 로직 수행하면 여기로 넘어옴

export function loginUser(dataToSubmit){
    console.log("loginUser 실행");
        //서버로 state에 있는 값을 보내기 우리가 스프링에서 ajax쓰는거랑 비슷함
        //'/api/users/login'이건 서버쪽 js에있는 매핑값 성공하면 reponse로 넘어옴
    const request =  axios.post('/api/users/login', dataToSubmit)
    .then(response => response.data )

    console.log("request : ");
    console.log(request);

    //reducer로 넘기기 request에는 index.js 서버에서 /api/users/login 로직 수행후 결과가 옴
    return{
        type : LOGIN_USER,
        payload : request
    }
}

export function registerUser(dataToSubmit){
    //서버로 state에 있는 값을 보내기 우리가 스프링에서 ajax쓰는거랑 비슷함
    //'/api/users/login'이건 서버쪽 js에있는 매핑값 성공하면 reponse로 넘어옴
const request =  axios.post('/api/users/register', dataToSubmit).then(response => 
    response.data
)
//reducer로 넘기기
return{
    type : REGISTER_USER,
    payload : request
}
}

export function auth(){
    //dataToSubmit은 get에선 필요없음
    const request =  axios.get('/api/users/mem').then(response => 
        response.data
    )
    //reducer로 넘기기
    return{
        type : ATUH_USER,
        payload : request
    }
}