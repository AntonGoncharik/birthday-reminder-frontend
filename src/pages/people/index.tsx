import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import View from './view';

const Container: FC = (): JSX.Element => {
  const navigate = useNavigate();

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
    />
  );
};

export default Container;
