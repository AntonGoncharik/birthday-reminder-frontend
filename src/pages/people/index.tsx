import React, { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import View from './view';
import { usePeopleState } from '../../store';

const Container: FC = (): JSX.Element => {
  const navigate = useNavigate();

  const { state, getAll } = usePeopleState();

  useEffect(() => {
    getAll();
  }, []);

  const handleNavigateToAddMan = () => {
    navigate('/man', { state: { action: 'ADD' } });
  };

  const handleNavigateToMan = () => {
    navigate('/man', { state: { action: 'EDIT' } });
  };

  return (
    <View
      navigateToAddMan={handleNavigateToAddMan}
      navigateToMan={handleNavigateToMan}
      people={state.data}
    />
  );
};

export default Container;
