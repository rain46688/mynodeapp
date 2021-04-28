import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import { Layout, Menu } from 'antd';

const { Header, Content, Footer } = Layout;

function HeaderPage(props) {

    return (
        <Header>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                <Menu.Item key="1">메뉴 1</Menu.Item>
                <Menu.Item key="2">메뉴 2</Menu.Item>
                <Menu.Item key="3">메뉴 3</Menu.Item>
                <Menu.Item style={{float: 'right'}} key="4">로그인</Menu.Item>
            </Menu>
        </Header>
    )

}

export default withRouter(HeaderPage)
