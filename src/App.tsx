import React, { FC, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import './layout/global.scss';
import style from './App.module.scss';
import { Account, Auth, Home, People, Man } from './pages';
import { ErrorBoundary, Navbar, Splash } from './components';
import { useAccountState } from './store';

const client = new ApolloClient({
  uri: process.env.REACT_APP_API_URL,
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
        </Routes>
      </div>
    </>
  );
};

const UnauthorizedLayout: FC = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />
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
              {/* {authorized ? <AuthorizedLayout /> : <UnauthorizedLayout />} */}
            </Suspense>
          </ErrorBoundary>
        </RecoilRoot>
      </ApolloProvider>
    </BrowserRouter>
  );
};

export default App;
