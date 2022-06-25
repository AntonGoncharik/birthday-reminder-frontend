import React, { FC, useEffect } from 'react';

import View from './view';
import { usePeopleState } from '../../store';

const Container: FC = (): JSX.Element => {
  const { state, getAll } = usePeopleState();

  useEffect(() => {
    getAll();
  }, []);

  return <View people={state.data} />;
};

export default Container;
