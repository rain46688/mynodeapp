import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import './MainPage.css';

function MainPage(props) {

    const [logined, setLogined] = useState([]);

    function checkLogin(){
        axios
        .get('/api/users/mem')
      .then(({ data }) => setLogined(data));
    }

    useEffect(() => {
        checkLogin();
      }, []);

    const dologin = (e) => {
        console.log("Do Login");
        props.history.push('/login')
    }

    const dologout = (e) => {
        console.log("Do Logout");
          axios.get('/api/users/logout').then(
            response => {
                console.log("로그아웃 : "+response.data.success);
                if(response.data.success){
                    checkLogin();
                }else{
                    alert('Logout Error!!')
                }
            }
        )
    }

    if(logined.isLogined === false){
        return (
            <div id='main'>
                <div id='main2'>
                    로그인 안되있음
                    <button onClick={dologin}>Login</button>
                </div>
            </div>
        )
    }else{
        return (
            <div id='main'>
                <div id='main2'>
                    로그인 되있음
                    <button onClick={dologout}>Logout</button>
                </div>
            </div>
        )
    }
      
}

export default withRouter(MainPage)
