import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { Layout } from 'antd';

const { Footer } = Layout;

function FooterPage(props) {

    return (
        <Footer style={{ textAlign: 'center',fontSize:'50px',backgroundColor:'#B7B7B7' }}>Footer</Footer>
    )

}

export default withRouter(FooterPage)
