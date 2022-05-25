import React, { FC } from 'react';

import { State } from './interfaces';
import { Error } from '../../pages';

const View: FC<State> = (): JSX.Element => {
  return <Error />;
};

export default View;
