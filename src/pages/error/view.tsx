import React, { FC } from 'react';

import style from './style.module.scss';

const View: FC = (): JSX.Element => {
  return (
    <div className={style.container}>
      <h1>Something went wrong...</h1>
    </div>
  );
};

export default View;
