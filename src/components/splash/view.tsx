import React, { FC } from 'react';
import { Spin } from 'antd';

import style from './style.module.scss';

const View: FC = () => {
  return (
    <div className={style.container}>
      <Spin size="large" tip="Loading..." />
    </div>
  );
};

export default View;
