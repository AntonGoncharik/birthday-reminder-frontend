import React, { FC } from 'react';

import View from './view';
import { Splash } from './interface';

const Container: FC<Splash> = (props): JSX.Element => {
  return <View {...props} />;
};

export default Container;
