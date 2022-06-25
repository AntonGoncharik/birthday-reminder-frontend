import React, { FC, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import './layout/global.scss';
import style from './App.module.scss';
import { Account, Auth, Home, People, Man } from './pages';
import { ErrorBoundary, Navbar, Splash } from './components';
import { useAccountState } from './store';

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_API_URL,
});

const authLink = setContext((_, { headers }) => {
  const accessToken = localStorage.getItem('accessToken');

  return {
    headers: {
      ...headers,
      authorization: accessToken ? `jwt ${accessToken}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const AuthorizedLayout: FC = (): JSX.Element => {
  return (
    <>
      <Navbar />
      <div className={style.container}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/account" element={<Account />} />
          <Route path="/people" element={<People />} />
          <Route path="/man" element={<Man />} />
          <Route path="/man/:id" element={<Man />} />
        </Routes>
      </div>
    </>
  );
};

const UnauthorizedLayout: FC = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route path="*" element={<Navigate to="/auth" replace />} />
    </Routes>
  );
};

const Layout = () => {
  const { state } = useAccountState();

  // if (state.loading) {
  //   return <Splash />;
  // }

  if (state.data.email) {
    return <AuthorizedLayout />;
  } else {
    return <UnauthorizedLayout />;
  }
};

const App = () => {
  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <RecoilRoot>
          <ErrorBoundary>
            <Suspense fallback={<Splash />}>
              <Layout />
            </Suspense>
          </ErrorBoundary>
        </RecoilRoot>
      </ApolloProvider>
    </BrowserRouter>
  );
};

export default App;
