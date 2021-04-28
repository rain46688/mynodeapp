import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import './MainPage.css';
import HeaderPage from '../Header/HeaderPage';
import FooterPage from '../Footer/FooterPage';

import { Layout, Menu } from 'antd';

const { Header, Content, Footer } = Layout;

function MainPage(props) {

    return (
        <Layout className="layout">
            <HeaderPage/>
            <Content style={{ textAlign: 'center', padding: '0 50px',fontSize:'50px' }}>
                <div className="site-layout-content">컨텐츠</div>
            </Content>
            <FooterPage/>
        </Layout>
    )
}

export default withRouter(MainPage)
