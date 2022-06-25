import React, { FC } from 'react';
import { Form, Input, Button, DatePicker } from 'antd';

import style from './style.module.scss';
import { Man } from './interface';

const View: FC<Man> = (props): JSX.Element => {
  const { initialState, onFinish, loading } = props;

  return (
    <div className={style.container}>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={initialState}
        onFinish={onFinish}
        autoComplete="off"
        validateTrigger="onBlur"
      >
        <Form.Item
          label="First name"
          name="firstName"
          rules={[{ required: true, message: 'Please input your first name!' }]}
        >
          <Input placeholder="First name" />
        </Form.Item>
        <Form.Item
          label="Last name"
          name="lastName"
          rules={[{ required: true, message: 'Please input your last name!' }]}
        >
          <Input placeholder="Last name" />
        </Form.Item>
        <Form.Item
          label="Birth date"
          name="birthDate"
          rules={[{ required: true, message: 'Please input your birth date!' }]}
        >
          <DatePicker placeholder="Birth date" />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }} shouldUpdate>
          {(form) => {
            return (
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                disabled={
                  !form.isFieldsTouched() ||
                  !!form.getFieldsError().filter(({ errors }) => {
                    return errors.length;
                  }).length
                }
              >
                Save
              </Button>
            );
          }}
        </Form.Item>
      </Form>
    </div>
  );
};

export default View;
