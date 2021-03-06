//import React from 'react'
import React, {useState} from 'react'//useState는 여기서 가져올수있음
//redux 사용하려면 필요`
import {useDispatch} from 'react-redux'
import {loginUser} from '../../../_actions/user_action'
import {withRouter} from 'react-router-dom'

function LoginPage(props) {

    //Dispatch 이용하기
    const dispatch = useDispatch();

    //state하면 자동완성있음
    //""로 주는 이유는 처음에 빈칸이기 때문
    const [MemberId, setMemberId] = useState("")
    const [Password, setPassword] = useState("")

    //이벤트 핸들러를 실행해서 이메일이랑 패스워드 input을 변경한느것
    const onMemberIdHandler = (event) =>{
        setMemberId(event.currentTarget.value)
    }

    const onPasswordHandler = (event) =>{
        setPassword(event.currentTarget.value)
    }

    const onSubmitHandler = (event) =>{
        event.preventDefault();//새로고침 안되게 만들기

        console.log('아이디 : ',MemberId);
        console.log('비번 : ',Password);

        let body = {
            memberId : MemberId,
            password : Password
        }
        //loginUser라는 액션을 user_acction.js에만들어줘야된다.
        //redux를 안쓰면 여기서 그냥 axios해서 하면됨. redux를 쓰면 좀 복잡해지긴한다함
        dispatch(loginUser(body)).then(response =>{
            if(response.payload.loginSuccess){
                //매핑 이동 props를 이용함 
                props.history.push('/')
            }else {
                alert('Error')
            }
        })

    }

    return ( 
        <div style={{display:'flex', justifyContent : 'center', alignItems: 'center', width:'100%', height:'100vh'}}>
        
        <form style={{display:'flex', flexDirection:'column'}}
        onSubmit={onSubmitHandler}>
            <label>ID</label>
            {/* 타이핑을하면 onChange라는 이벤트를 실행해서 state를 바꿔줌 */}
            <input type="text" value={MemberId} onChange={onMemberIdHandler}/>
            <label>Password</label>
            <input type="password" value={Password} onChange={onPasswordHandler}/>
            <br/>
            <button type="submit">
                Login
            </button>

        </form>

    </div>
    )
}

export default withRouter(LoginPage)
