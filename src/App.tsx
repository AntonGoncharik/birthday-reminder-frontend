import React, { FC, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  DefaultOptions,
  from,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';

import './layout/global.scss';
import style from './App.module.scss';
import { Account, Auth, Home, People, Man } from './pages';
import { ErrorBoundary, Navbar, Splash } from './components';
import { useAccountState } from './store';
import { refreshTokenGql } from './services';

let error401 = false;

const refresh = async (refreshToken: string) => {
  const response = await client.mutate({
    mutation: refreshTokenGql,
    variables: {
      refreshToken,
    },
  });

  return response;
};

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_API_URL,
  // uri: 'http://113.30.189.150:8001',
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

const errorLink = onError(({ graphQLErrors, operation, forward }) => {
  if (graphQLErrors && !error401) {
    for (const err of graphQLErrors) {
      switch ((err.extensions.exception as { status: number }).status) {
        case 401:
          error401 = true;
          const refreshToken = localStorage.getItem('refreshToken');
          if (!refreshToken) {
            throw new Error('refresh token not found');
          }

          refresh(refreshToken)
            .then((data) => {
              error401 = false;

              localStorage.setItem(
                'accessToken',
                data.data.refreshToken.token.accessToken,
              );
              localStorage.setItem(
                'refreshToken',
                data.data.refreshToken.token.refreshToken,
              );

              const oldHeaders = operation.getContext().headers;
              operation.setContext({
                headers: {
                  ...oldHeaders,
                  authorization: `jwt ${data.data.refreshToken.token.accessToken}`,
                },
              });

              forward(operation);
            })
            .catch((error: Error) => {
              throw error;
            });
      }
    }
  }
});

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
};

const client = new ApolloClient({
  link: from([authLink, errorLink, httpLink]),
  cache: new InMemoryCache(),
  defaultOptions: defaultOptions,
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
  const { state, autoSignin } = useAccountState();

  useEffect(() => {
    autoSignin();
  }, []);

  if (state.loading) {
    return <Splash />;
  }

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
