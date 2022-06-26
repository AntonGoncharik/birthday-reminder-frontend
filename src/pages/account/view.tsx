import React, { FC } from 'react';
import { Form, Input } from 'antd';

import style from './style.module.scss';
import { Auth } from './interface';
import { Splash } from '../../components';

const View: FC<Auth> = (props): JSX.Element => {
  const { email, firstName, lastName, loading } = props;

  if (loading) {
    return <Splash widthHeader />;
  }

  return (
    <div className={style.container}>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{
          email: email,
          firstName: firstName,
          lastName: lastName,
        }}
        autoComplete="off"
      >
        <Form.Item label="Email" name="email">
          <Input disabled />
        </Form.Item>
      </Form>
    </div>
  );
};

export default View;
