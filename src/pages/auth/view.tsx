import React, { FC } from 'react';
import { Form, Input, Button } from 'antd';

import style from './style.module.scss';
import { Auth } from './interface';

const View: FC<Auth> = (props): JSX.Element => {
  const { isSignin, setIsSignin, setIsSignup, onFinish, loading } = props;

  return (
    <div className={style.container}>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Please input your email username!' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button
            type="primary"
            htmlType="submit"
            disabled={loading}
            loading={loading}
          >
            {isSignin ? <span>Signin</span> : <span>Signup</span>}
          </Button>
          <div>
            {isSignin ? (
              <Button
                type="link"
                onClick={setIsSignup}
                className={style.toggle}
              >
                I do not have an account
              </Button>
            ) : (
              <Button
                type="link"
                onClick={setIsSignin}
                className={style.toggle}
              >
                I have an account
              </Button>
            )}
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default View;
