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

  const signup = async (payload: AuthPayload) => {
    try {
      setState({
        ...state,
        loading: true,
      });

      const result = await signupMutation({
        variables: {
          payload,
        },
      });

      setState({
        ...state,
        data: {
          ...state.data,
          id: result.data.signup.id,
          email: result.data.signup.email,
          firstName: result.data.signup.firstName,
          lastName: result.data.signup.lastName,
        },
      });
    } catch (error) {
      throw error;
    } finally {
      setState({
        ...state,
        loading: false,
      });
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

      navigate('/');
    } catch (error) {
      setState({
        ...state,
        loading: false,
      });

      showError(error as Error);
    }
  };

  return { state, signup, signin };
};
