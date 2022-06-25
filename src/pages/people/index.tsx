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
    navigate('/man');
  };

  const handleNavigateToMan = (id: string) => {
    navigate(`/man/${id}`);
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
