//타입에서 가져오기
import {LOGIN_USER, REGISTER_USER, ATUH_USER} from '../_actions/types'

//state = {} 현재 state 비어있는 상태를 의미
export default function (state = {}, action){
    switch(action.type){

        case LOGIN_USER:
            //...state 이건 스프레드 오퍼레이터로 그냥 위에서 객체를 똑같이 가져온다는걸 의미한다함
            //action.payload이건 user_action.js에서 보낸 payload
            console.log("LOGIN_USER user_reducer 함수 실행");
            console.log(action.payload);
            return{...state, ReducerloginSuccess:action.payload}
            break;
            
        case REGISTER_USER:
            console.log("REGISTER_USER user_reducer 함수 실행");
            return{...state, registerSuccess:action.payload}
            break;

        case ATUH_USER:
            console.log("ATUH_USER user_reducer 함수 실행");
            return{...state, userData:action.payload}
            break;

        default:
            return state;
    }
}