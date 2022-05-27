import React, { FC } from 'react';
import { Form, Input, Button } from 'antd';

import style from './style.module.scss';
import { useAccountState } from '../../store';
import { AuthPayload } from '../../interfaces';

const View: FC = (): JSX.Element => {
  const { state } = useAccountState();

  const onFinish = (values: AuthPayload) => {
    console.log(values);
  };

  return (
    <div className={style.container}>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{
          email: state.data.email,
          firstName: state.data.firstName,
          lastName: state.data.lastName,
        }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item label="Email" name="email">
          <Input disabled />
        </Form.Item>
        <Form.Item
          label="First name"
          name="firstName"
          rules={[{ required: true, message: 'Please input your first name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Last name"
          name="lastName"
          rules={[{ required: true, message: 'Please input your last name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default View;
