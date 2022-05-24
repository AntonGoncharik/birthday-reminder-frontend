import React, { useState } from 'react';
import { Menu } from 'antd';
import {
  HomeOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Link } from 'react-router-dom';

import style from './style.module.scss';

const items: MenuProps['items'] = [
  {
    label: <Link to="/">Home</Link>,
    key: 'home',
    icon: <HomeOutlined />,
  },
  {
    label: <Link to="/people">People</Link>,
    key: 'people',
    icon: <UnorderedListOutlined />,
  },
  {
    label: <Link to="/account">Account</Link>,
    key: 'account',
    icon: <UserOutlined />,
  },
];

const View: React.FC = () => {
  const [current, setCurrent] = useState('home');

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
  };

  return (
    <Menu
      className={style.container}
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
};

export default View;
