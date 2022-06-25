import React, { FC, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';

import View from './view';
import { usePeopleState, useAccountState } from '../../store';
import { ManForm } from './interface';

const Container: FC = (): JSX.Element => {
  const { id } = useParams();

  const navigate = useNavigate();

  const { state, get, create, update } = usePeopleState();
  const { state: stateAccount } = useAccountState();

  useEffect(() => {
    if (id) {
      get(id);
    }
  }, []);

  const goToPeople = () => {
    navigate('/people');
  };

  const onFinish = (values: ManForm) => {
    if (id) {
      update(
        {
          ...values,
          birthDate: moment(values.birthDate).format('YYYY-MM-DD'),
          id,
        },
        goToPeople,
      );
    }

    if (!id) {
      create(
        {
          ...values,
          birthDate: moment(values.birthDate).format('YYYY-MM-DD'),
          userId: stateAccount.data.id,
        },
        goToPeople,
      );
    }
  };

  return (
    <View
      initialState={{
        firstName: id ? state.data[0].firstName : '',
        lastName: id ? state.data[0].lastName : '',
        birthDate: id ? moment(+state.data[0].birthDate) : moment(),
      }}
      onFinish={onFinish}
      loading={state.loading}
    />
  );
};

export default Container;
