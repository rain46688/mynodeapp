import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import './MainPage.css';
import HeaderPage from '../Header/HeaderPage';
import FooterPage from '../Footer/FooterPage';
import VideoPage from './VideoPage';

import { Layout, Menu } from 'antd';

const { Header, Content, Footer } = Layout;

function MainPage(props) {

    return (
        <Layout className="layout">
            <HeaderPage/>
            <Content>
                <VideoPage/>
            </Content>
            <FooterPage/>
        </Layout>
    )
}

export default withRouter(MainPage)
