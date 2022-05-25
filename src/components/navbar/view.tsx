import React, { useState, useEffect } from 'react';
import { Menu } from 'antd';
import {
  HomeOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Link, useLocation } from 'react-router-dom';

import style from './style.module.scss';

const items: MenuProps['items'] = [
  {
    label: <Link to="/">Home</Link>,
    key: '/',
    icon: <HomeOutlined />,
  },
  {
    label: <Link to="/people">People</Link>,
    key: '/people',
    icon: <UnorderedListOutlined />,
  },
  {
    label: <Link to="/account">Account</Link>,
    key: '/account',
    icon: <UserOutlined />,
  },
];

const View: React.FC = () => {
  const [current, setCurrent] = useState('/');

  const location = useLocation();

  useEffect(() => {
    setCurrent(location.pathname);
  }, [location.pathname]);

  return (
    <Menu
      className={style.container}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
};

export default View;
