import React, { FC } from 'react';
import { List, Avatar, Button } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';

import style from './style.module.scss';
import { People } from './interface';
import { Man } from '../../interfaces';
import { Splash } from '../../components';

const View: FC<People> = (props): JSX.Element => {
  const { people, navigateToAddMan, navigateToMan, loading } = props;

  if (loading) {
    return <Splash widthHeader />;
  }

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
          const handleNavigateToMan = () => {
            navigateToMan(item.id);
          };

          return (
            <List.Item className={style.item} onClick={handleNavigateToMan}>
              <List.Item.Meta
                className={style.itemMeta}
                avatar={
                  <Avatar src="https://cdn-icons-png.flaticon.com/512/147/147142.png" />
                }
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
