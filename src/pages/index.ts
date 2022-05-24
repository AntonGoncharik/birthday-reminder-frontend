import { lazy } from 'react';

const Account = lazy(() => import('./account'));
const Auth = lazy(() => import('./auth'));
const Home = lazy(() => import('./home'));
const People = lazy(() => import('./people'));
const Man = lazy(() => import('./man'));

export { Account, Auth, Home, People, Man };
