import React, { FC, useState } from 'react';

import View from './view';
import { AuthPayload } from '../../interfaces';
import { useAccountState } from '../../store';

const Container: FC = (): JSX.Element => {
  const [isSignin, setIsSignin] = useState(true);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const { state, signin, signup } = useAccountState();

  const handleSetIsSignin = () => {
    setIsSignin(true);
  };

  const handleSetIsSignup = () => {
    setIsSignin(false);
  };

  const handleOpenModal = () => {
    setIsVisibleModal(true);
  };

  const handleCloseModal = () => {
    setIsVisibleModal(false);
  };

  const handleOnFinish = (values: AuthPayload) => {
    if (isSignin) {
      signin(values);
    } else {
      signup(values, handleOpenModal);
    }
  };

  return (
    <View
      isSignin={isSignin}
      setIsSignin={handleSetIsSignin}
      setIsSignup={handleSetIsSignup}
      onFinish={handleOnFinish}
      loading={state.loading}
      isVisibleModal={isVisibleModal}
      openModal={handleOpenModal}
      closeModal={handleCloseModal}
    />
  );
};

export default Container;
