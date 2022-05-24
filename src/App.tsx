import React, { FC, Suspense, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { ConfigProvider } from 'antd';

import style from './App.module.scss';
import { Account, Auth, Home, People, Man } from './pages';
import { ErrorBoundary, Navbar } from './components';

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

const App = () => {
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAuthorized(true);
      setLoading(false);
    }, 2000);
  }, []);

  // setTimeout(() => {
  //   ConfigProvider.config({
  //     theme: {
  //       primaryColor: '#274916',
  //     },
  //   });
  // }, 10000);

  if (loading) {
    return <div>Loading</div>;
  }

  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Suspense fallback={<div>Loading...</div>}>
          {authorized ? <AuthorizedLayout /> : <UnauthorizedLayout />}
        </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default App;
