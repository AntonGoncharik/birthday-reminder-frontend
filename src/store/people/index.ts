import { atom, useRecoilState } from 'recoil';
import { useLazyQuery } from '@apollo/client';

import { getAllGql } from '../../services';
import { showError } from '../../utilities';

export const peopleState = atom({
  key: 'peopleState',
  default: {
    loading: false,
    data: [
      {
        id: '1',
        userId: '1',
        firstName: 'Anton',
        lastName: 'Goncharik',
        birthDate: 'Goncharik',
        createdAt: 'Goncharik',
      },
    ],
  },
});

export const usePeopleState = () => {
  const [state, setState] = useRecoilState(peopleState);
  const [getAllQuery] = useLazyQuery(getAllGql);

  const getAll = async () => {
    try {
      setState({
        ...state,
        loading: true,
      });

      const result = await getAllQuery();
      console.log(result);
      setState({
        loading: false,
        data: [],
      });
    } catch (error) {
      setState({
        ...state,
        loading: false,
      });

      showError(error as Error);
    }
  };

  return { state, getAll };
};
