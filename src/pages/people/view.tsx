import React, { FC } from 'react';
import { List, Avatar, Button } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';

import style from './style.module.scss';
import { People } from './interface';

const View: FC<People> = (props): JSX.Element => {
  const { people, navigateToAddMan, navigateToMan } = props;

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
        dataSource={people}
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
