import React, { FC } from 'react';
import { Form, Input, Button, DatePicker } from 'antd';

import style from './style.module.scss';
import { Man } from './interface';

const View: FC<Man> = (props): JSX.Element => {
  const { onFinish, loading } = props;

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
        <Form.Item
          label="Birth date"
          name="birthDate"
          rules={[{ required: true, message: 'Please input your birth date!' }]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }} shouldUpdate>
          {(form) => (
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              disabled={
                !form.isFieldsTouched(true) ||
                !!form.getFieldsError().filter(({ errors }) => errors.length)
                  .length
              }
            >
              Save
            </Button>
          )}
        </Form.Item>
      </Form>
    </div>
  );
};

export default View;
