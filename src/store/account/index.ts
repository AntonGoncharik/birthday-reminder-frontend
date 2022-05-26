import { atom, useRecoilState } from 'recoil';

const accountState = atom({
  key: 'accountState',
  default: {
    loading: false,
    data: {
      id: '1',
      email: 'ant.goncahrik@gmail.com',
      firstName: 'Anton',
      lastName: '',
    },
  },
});

export const useAccountState = () => {
  const [state, setState] = useRecoilState(accountState);

  const signup = () => {
    setState({
      ...state,
      data: { ...state.data, lastName: 'Goncharik' },
      loading: true,
    });
  };

  return { state, signup };
};
