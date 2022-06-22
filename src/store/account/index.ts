import { atom, useRecoilState } from 'recoil';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

import { signupGql, signinGql } from '../../services';
import { AuthPayload } from '../../interfaces';
import { showError } from '../../utilities';

const accountState = atom({
  key: 'accountState',
  default: {
    loading: false,
    data: {
      id: '',
      email: '',
      firstName: '',
      lastName: '',
    },
  },
});

export const useAccountState = () => {
  const [state, setState] = useRecoilState(accountState);
  const [signupMutation] = useMutation(signupGql);
  const [signinMutation] = useMutation(signinGql);
  const navigate = useNavigate();

  const signup = async (payload: AuthPayload, successCallback: () => void) => {
    try {
      setState({
        ...state,
        loading: true,
      });

      await signupMutation({
        variables: {
          payload,
        },
      });

      successCallback();

      setState({
        ...state,
        loading: false,
      });
    } catch (error) {
      setState({
        ...state,
        loading: false,
      });

      showError(error as Error);
    }
  };

  const signin = async (payload: AuthPayload) => {
    try {
      setState({
        ...state,
        loading: true,
      });

      const result = await signinMutation({
        variables: {
          payload,
        },
      });

      setState({
        loading: false,
        data: {
          ...state.data,
          id: result.data.signin.user.id,
          email: result.data.signin.user.email,
          firstName: result.data.signin.user.firstName,
          lastName: result.data.signin.user.lastName,
        },
      });

      localStorage.setItem('accessToken', result.data.signin.token.accessToken);
      localStorage.setItem(
        'refreshToken',
        result.data.signin.token.refreshToken,
      );

      navigate('/');
    } catch (error) {
      setState({
        ...state,
        loading: false,
      });

      showError(error as Error);
    }
  };

  // const autoSignin = async (payload: AuthPayload) => {
  //   try {
  //     setState({
  //       ...state,
  //       loading: true,
  //     });

  //     const result = await signinMutation({
  //       variables: {
  //         payload,
  //       },
  //     });

  //     setState({
  //       loading: false,
  //       data: {
  //         ...state.data,
  //         id: result.data.signin.user.id,
  //         email: result.data.signin.user.email,
  //         firstName: result.data.signin.user.firstName,
  //         lastName: result.data.signin.user.lastName,
  //       },
  //     });

  //     localStorage.setItem('accessToken', result.data.signin.token.accessToken);
  //     localStorage.setItem(
  //       'refreshToken',
  //       result.data.signin.token.refreshToken,
  //     );

  //     navigate('/');
  //   } catch (error) {
  //     setState({
  //       ...state,
  //       loading: false,
  //     });

  //     showError(error as Error);
  //   }
  // };

  return { state, signup, signin };
};
