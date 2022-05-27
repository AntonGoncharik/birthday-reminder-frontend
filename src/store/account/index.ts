import { atom, useRecoilState } from 'recoil';
import { useMutation } from '@apollo/client';

import { signupGql, signinGql } from '../../services';
import { AuthPayload } from '../../interfaces';
import { showError } from '../../utilities';

const accountState = atom({
  key: 'accountState',
  default: {
    loading: true,
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
      showError(error as Error);
    } finally {
      setState({
        ...state,
        loading: false,
      });
    }
  };

  return { state, signup, signin };
};
