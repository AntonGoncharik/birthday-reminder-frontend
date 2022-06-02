import React, { FC } from 'react';
import { Modal, Result, Button } from 'antd';

import { SignupSuccess } from './interface';

const View: FC<SignupSuccess> = (props) => {
  const { isVisible, close } = props;

  return (
    <Modal
      title="Successful registration"
      visible={isVisible}
      footer={
        <Button type="primary" onClick={close}>
          Ok
        </Button>
      }
    >
      <Result
        status="success"
        title={
          "Congratulations! You've registered on the BIRTHDAY REMINDER. To complete registration go to email."
        }
      />
    </Modal>
  );
};

export default View;
