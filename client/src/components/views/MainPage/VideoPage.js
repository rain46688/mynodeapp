import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import ReactPlayer from 'react-player'
import './VideoPage.css';
import { Card, Avatar } from 'antd';

function VideoPage(props) {

    return (
        <div id="video">
            <div id="video1">
                    <ReactPlayer
                        className='react-player'
                        url='https://www.youtube.com/watch?v=ysz5S6PUM-U'
                        width='100%'
                        height='100%'
                        controls='true'/>
            </div>
            <div id="video1">
                    <ReactPlayer
                        className='react-player'
                        url='https://www.youtube.com/watch?v=ysz5S6PUM-U'
                        width='100%'
                        height='100%'
                        controls='true'/>
            </div>
        </div>
    )
}

export default withRouter(VideoPage)