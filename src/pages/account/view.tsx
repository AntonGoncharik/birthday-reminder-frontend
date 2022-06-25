import React, { FC } from 'react';
import { Form, Input } from 'antd';

import style from './style.module.scss';
import { useAccountState } from '../../store';

const View: FC = (): JSX.Element => {
  const { state } = useAccountState();

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
