import React, { FC } from 'react';

import View from './view';
import { useAccountState } from '../../store';

const Container: FC = (): JSX.Element => {
  const { state } = useAccountState();

  return (
    <View
      email={state.data.email}
      firstName={state.data.firstName}
      lastName={state.data.lastName}
      loading={state.loading}
    />
  );
};

export default Container;
