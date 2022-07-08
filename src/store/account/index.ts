import { atom, useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';

import { useAuthService } from '../../services';
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

  const { signinMutation, signupMutation, autoSigninMutation } =
    useAuthService();

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
    } finally {
      setState({
        ...state,
        loading: false,
      });
    }
  };

  const autoSignin = async () => {
    try {
      setState({
        ...state,
        loading: true,
      });

      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        setState({
          ...state,
          loading: false,
        });
        return;
      }

      const result = await autoSigninMutation({
        variables: {
          accessToken,
        },
      });

      setState({
        loading: false,
        data: {
          ...state.data,
          id: result.data.autoSignin.user.id,
          email: result.data.autoSignin.user.email,
          firstName: result.data.autoSignin.user.firstName,
          lastName: result.data.autoSignin.user.lastName,
        },
      });

      localStorage.setItem(
        'accessToken',
        result.data.autoSignin.token.accessToken,
      );
      localStorage.setItem(
        'refreshToken',
        result.data.autoSignin.token.refreshToken,
      );
    } catch (error) {
      setState({
        ...state,
        loading: false,
      });

      showError(error as Error);
    }
  };

  const refreshToken = async () => {
    try {
      setState({
        ...state,
        loading: true,
      });

      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        setState({
          ...state,
          loading: false,
        });
        return;
      }

      const result = await autoSigninMutation({
        variables: {
          accessToken,
        },
      });

      setState({
        loading: false,
        data: {
          ...state.data,
          id: result.data.autoSignin.user.id,
          email: result.data.autoSignin.user.email,
          firstName: result.data.autoSignin.user.firstName,
          lastName: result.data.autoSignin.user.lastName,
        },
      });

      localStorage.setItem(
        'accessToken',
        result.data.autoSignin.token.accessToken,
      );
      localStorage.setItem(
        'refreshToken',
        result.data.autoSignin.token.refreshToken,
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

  return { state, signup, signin, autoSignin, refreshToken };
};
