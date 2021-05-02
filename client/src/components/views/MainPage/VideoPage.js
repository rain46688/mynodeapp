import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import ReactPlayer from 'react-player'
import './VideoPage.css';
import { Card, Avatar } from 'antd';
import axios from 'axios';

const upload = (e) => {
    console.log("zdfd");
    axios.get('/api/upload').then(
        response => {
            console.log("업로드");
            if (response.data.upload) {
                alert('upload success!!')
            } else {
                alert('upload Error!!')
            }
        }
    )
}

function VideoPage(props) {

    return (
        <div id="video">
            <div id="video1">
                    {/* <iframe src="https://drive.google.com/file/d/1ktEiYmRjRcgdpOVh7ylNfW8s05UxfWvS/preview" width="100%" height="100%"></iframe> */}
                    <button onClick={upload}>업로드</button>
            </div>
        </div>
    )
}

export default withRouter(VideoPage)