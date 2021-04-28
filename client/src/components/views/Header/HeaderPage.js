import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import { Layout, Menu } from 'antd';

const { Header, Content, Footer } = Layout;

function HeaderPage(props) {

    const [logined, setLogined] = useState([]);
    function checkLogin() {
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
                console.log("로그아웃 : " + response.data.success);
                if (response.data.success) {
                    checkLogin();
                } else {
                    alert('Logout Error!!')
                }
            }
        )

    }
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
