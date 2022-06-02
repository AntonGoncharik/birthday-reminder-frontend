import React, { FC } from 'react';

import View from './view';
import { SignupSuccess } from './interface';

const Container: FC<SignupSuccess> = (props): JSX.Element => {
  return <View {...props} />;
};

export default Container;
