import React, { FC } from 'react';
import { List, Avatar, Button } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';

import style from './style.module.scss';
import { People } from './interface';

const data = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
];

const View: FC<People> = (props): JSX.Element => {
  const { navigateToAddMan, navigateToMan } = props;

  return (
    <>
      <Button
        type="link"
        size="large"
        icon={<PlusCircleOutlined />}
        onClick={navigateToAddMan}
        className={style.btn}
      />
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={() => (
          <List.Item className={style.item} onClick={navigateToMan}>
            <List.Item.Meta
              avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
              title={<a href="https://ant.design"></a>}
              description="Ant Design, a design language for background applications, is refined by Ant UED Team"
            />
          </List.Item>
        )}
      />
    </>
  );
};

export default View;
