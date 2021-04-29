import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import { Layout, Menu } from 'antd';

const { Header, Content, Footer } = Layout;

function HeaderPage(props) {

    //state 사용 설정
    const [logined, setLogined] = useState([]);

    //유저가 로그인한지 안한지 값 가져오기
    function checkLogin() {
        axios
            .get('/api/users/mem')
            .then(({ data }) => setLogined(data));
            //가져와서 state에 넣기
    }

    //위 함수 실행
    useEffect(() => {
        console.log("HeaderPage useEffect 실행");
        checkLogin();
    }, []);

    //로그인 버튼 눌렀을때
    const dologin = (e) => {
        console.log("Do Login");
        props.history.push('/login')
    }

    //로그 아웃 버튼 눌렀을때
    const dologout = (e) => {
        console.log("Do Logout");
        axios.get('/api/users/logout').then(
            response => {
                console.log("로그아웃 : " + response.data.success);
                if (response.data.success) {
                    //로그아웃 후 다시 함수를 실행해서 랜더링을 해줘야됨
                    //그냥 push로 /로 보내가지고는 랜더링이 안되고 새로고침 해줘야되더라함
                    checkLogin();
                } else {
                    alert('Logout Error!!')
                }
            }
        )
    }

    //유저의 로그인 상태에 따라 컴포넌트를 다르게 보여줌
    if (logined.isLogined === false) {
        return (
            <Header>
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1">메뉴 1</Menu.Item>
                    <Menu.Item key="2">메뉴 2</Menu.Item>
                    <Menu.Item key="3">메뉴 3</Menu.Item>
                    <Menu.Item onClick={dologin} style={{ float: 'right' }} key="4">로그인</Menu.Item>
                </Menu>
            </Header>
        )
    } else {
        return (
            <Header>
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1">메뉴 1</Menu.Item>
                    <Menu.Item key="2">메뉴 2</Menu.Item>
                    <Menu.Item key="3">메뉴 3</Menu.Item>
                    <Menu.Item onClick={dologout} style={{ float: 'right' }} key="4">로그아웃</Menu.Item>
                    <label style={{ float: 'right' ,paddingRight:'2vh' }}>' {logined.memberId} ' 님 접속</label>
                </Menu>
            </Header>
        )
    }
}

export default withRouter(HeaderPage)
