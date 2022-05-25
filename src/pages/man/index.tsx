import React, { FC } from 'react';
import { useLocation } from 'react-router-dom';

import View from './view';

const Container: FC = (): JSX.Element => {
  const location = useLocation();
  console.log(location);
  return <View />;
};

export default Container;
