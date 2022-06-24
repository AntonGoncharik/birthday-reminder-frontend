import React, { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import View from './view';
import { usePeopleState, useAccountState } from '../../store';
import { ManForm } from './interface';

const Container: FC = (): JSX.Element => {
  const location = useLocation();

  const navigate = useNavigate();

  const { state, create, update } = usePeopleState();
  const { state: stateAccount } = useAccountState();

  const goToPeople = () => {
    navigate('/people');
  };

  const onFinish = (values: ManForm) => {
    if ((location.state as { action: string }).action === 'ADD') {
      create(
        {
          ...values,
          birthDate: values.birthDate._i,
          userId: stateAccount.data.id,
        },
        goToPeople,
      );
    }

    if ((location.state as { action: string }).action === 'EDIT') {
      update(
        {
          ...values,
          birthDate: values.birthDate._i,
          userId: stateAccount.data.id,
        },
        goToPeople,
      );
    }
  };

  return <View onFinish={onFinish} loading={state.loading} />;
};

export default Container;
