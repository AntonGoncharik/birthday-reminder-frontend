import { atom, useRecoilState } from 'recoil';

import { usePeopleService } from '../../services';
import { showError } from '../../utilities';
import { Man, PayloadMan } from '../../interfaces';

const peopleState = atom({
  key: 'peopleState',
  default: {
    loading: false,
    data: <Man[]>[],
  },
});

export const usePeopleState = () => {
  const [state, setState] = useRecoilState(peopleState);

  const { createMutation, getAllQuery, getQuery, updateMutation } =
    usePeopleService();

  const getAll = async () => {
    try {
      setState({
        ...state,
        loading: true,
      });

      const result = await getAllQuery();

      setState({
        loading: false,
        data: result.data.getBirthdayPeople,
      });
    } catch (error) {
      setState({
        ...state,
        loading: false,
      });

      showError(error as Error);
    }
  };

  const get = async (id: string) => {
    try {
      setState({
        ...state,
        loading: true,
      });

      const result = await getQuery({
        variables: {
          id,
        },
      });

      setState({
        loading: false,
        data: [result.data.getBirthdayMan],
      });
    } catch (error) {
      setState({
        ...state,
        loading: false,
      });

      showError(error as Error);
    }
  };

  const create = async (payload: PayloadMan, successCallback: () => void) => {
    try {
      setState({
        ...state,
        loading: true,
      });

      await createMutation({
        variables: {
          payload,
        },
      });

      setState({
        ...state,
        loading: false,
      });

      successCallback();
    } catch (error) {
      setState({
        ...state,
        loading: false,
      });

      showError(error as Error);
    }
  };

  const update = async (payload: PayloadMan, successCallback: () => void) => {
    try {
      setState({
        ...state,
        loading: true,
      });

      await updateMutation({
        variables: {
          payload,
        },
      });

      setState({
        ...state,
        loading: false,
      });

      successCallback();
    } catch (error) {
      setState({
        ...state,
        loading: false,
      });

      showError(error as Error);
    }
  };

  return { state, getAll, get, create, update };
};
