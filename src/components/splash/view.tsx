import React, { FC } from 'react';
import { Spin } from 'antd';

import style from './style.module.scss';
import { Splash } from './interface';

const View: FC<Splash> = (props) => {
  const { widthHeader = false } = props;

  const getClassName = (): string => {
    const classNames = [style.container];

    if (widthHeader) {
      classNames.push(style.widthHeader);
    }

    return classNames.join(' ');
  };

  return (
    <div className={getClassName()}>
      <Spin size="large" tip="Loading..." />
    </div>
  );
};

export default View;
