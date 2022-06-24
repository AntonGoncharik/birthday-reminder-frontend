import React, { FC } from 'react';
import { List, Avatar, Button } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';

import style from './style.module.scss';
import { People } from './interface';
import { Man } from '../../interfaces';

const View: FC<People> = (props): JSX.Element => {
  const { people, navigateToAddMan, navigateToMan } = props;

  const getDescription = (man: Man) => {
    const date = new Date(+man.birthDate);

    const formatter = new Intl.DateTimeFormat('en', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    return `${man.lastName} ${man.firstName} was born on ${formatter.format(
      date,
    )}`;
  };

  return (
    <>
      <Button
        type="link"
        size="large"
        icon={<PlusCircleOutlined />}
        onClick={navigateToAddMan}
      />
      <List
        itemLayout="horizontal"
        dataSource={people}
        renderItem={(item: Man) => {
          return (
            <List.Item className={style.item} onClick={navigateToMan}>
              <List.Item.Meta
                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                title={<a href="https://ant.design"></a>}
                description={getDescription(item)}
              />
            </List.Item>
          );
        }}
      />
    </>
  );
};

export default View;
