import { Form, Input, Button, Checkbox } from 'antd';
//import React from 'react'
import React, { useState } from 'react'//useState는 여기서 가져올수있음
//redux 사용하려면 필요`
import { useDispatch } from 'react-redux'
import { loginUser } from '../../../_actions/user_action'
import { withRouter } from 'react-router-dom'

function LoginPage(props) {

    //Dispatch 이용하기
    const dispatch = useDispatch();

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

    const onFinish = (values) => {
        console.log('Success:', values);
        dispatch(loginUser(values)).then(response => {
            if (response.payload.loginSuccess) {
                //매핑 이동 props를 이용함 
                props.history.push('/')
            } else {
                alert('Error')
            }
        })
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh' }}>
            <Form
                {...layout}
                name="basic"
                initialValues={{
                    remember: true,
                }} style={{ border: '1px solid gray', padding: '4vh' }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >

                <Form.Item
                    label="ID"
                    name="memberId"
                    rules={[
                        {
                            required: true,
                            message: '아이디를 입력하세요!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: '패스워드를입력하세요!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                    <Checkbox>remember</Checkbox>
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        로그인
                </Button>
                </Form.Item>

            </Form>
        </div>
    )
};
export default withRouter(LoginPage)
