import { Form, Input, Button, Checkbox } from 'antd';
//import React from 'react'
import React, { useState } from 'react'//useState는 여기서 가져올수있음
//redux 사용하려면 필요`
import { useDispatch } from 'react-redux'
import { loginUser } from '../../../_actions/user_action'
import { withRouter } from 'react-router-dom'
import { useCookies } from 'react-cookie';

function LoginPage(props) {

    //Dispatch 이용하기
    const dispatch = useDispatch();

    const [cookies, setCookie, removeCookie] = useCookies(['id']);

    // 텍스트 정렬용
    const layout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 16,
        },
    };
    const tailLayout = {
        wrapperCol: {
            offset: 8,
            span: 16,
        },
    };

    //로그인 성공
    const onFinish = (values) => {
        console.log('Success:', values);
        dispatch(loginUser(values)).then(response => {
            //여기서 오는 response는 index server에서 가져온 값이 넘어옴
            //{loginSuccess: true, userId: "60797d39b0ea332ad4004f53", message: "로그인 성공"}
            console.log("LoginPage2 response.payload : "+JSON.stringify(response.payload));
            if (response.payload.loginSuccess) {
                //매핑 이동 props를 이용함 
                props.history.push('/')
            } else {
                alert('Error')
            }
        })
    };

    //로그인 실패
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    //뒤로가기
    const Loginback = (e) => {
        console.log("뒤로가기");
        props.history.push('/')
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh' }}>
            <Form {...layout} name="basic" initialValues={{ remember: true }} style={{ border: '1px solid gray', padding: '4vh' }}
                onFinish={onFinish} onFinishFailed={onFinishFailed}>

                <Form.Item label="ID" name="memberId"
                    rules={[{
                            required: true,
                            message: '아이디를 입력하세요!',
                        },]}>
                    <Input defaultValue={cookies.id}/>
                </Form.Item>

                <Form.Item label="Password" name="password"
                    rules={[{
                            required: true,
                            message: '패스워드를입력하세요!',
                        },]}>
                    <Input.Password />
                </Form.Item>

                <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                    <Checkbox>remember</Checkbox>
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">로그인</Button>
                    <Button style={{marginLeft:'2vh'}} onClick={Loginback} type="primary">뒤로가기</Button>
                </Form.Item>
                
            </Form>

        </div>
    )
};
export default withRouter(LoginPage)
