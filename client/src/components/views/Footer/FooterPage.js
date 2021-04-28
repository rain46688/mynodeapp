import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { Layout } from 'antd';

const { Footer } = Layout;

function FooterPage(props) {

    return (
        <Footer style={{ textAlign: 'center',fontSize:'50px',backgroundColor:'gray' }}>푸터</Footer>
    )

}

export default withRouter(FooterPage)
