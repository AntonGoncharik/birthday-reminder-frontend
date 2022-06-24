import { atom, useRecoilState } from 'recoil';
import { useLazyQuery, useMutation } from '@apollo/client';

import { getAllGql, createGql, updateGql } from '../../services';
import { showError } from '../../utilities';
import { Man, PayloadMan } from '../../interfaces';

export const peopleState = atom({
  key: 'peopleState',
  default: {
    loading: false,
    data: <Man[]>[],
  },
});

export const usePeopleState = () => {
  const [state, setState] = useRecoilState(peopleState);
  const [getAllQuery] = useLazyQuery(getAllGql);
  const [createMutation] = useMutation(createGql);
  const [updateMutation] = useMutation(updateGql);

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

  const create = async (payload: PayloadMan, successCallback: () => void) => {
    try {
      setState({
        ...state,
        loading: true,
      });

      const result = await createMutation({
        variables: {
          payload,
        },
      });

      setState({
        data: [...state.data, result.data.createBirthdayMan],
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

      const result = await updateMutation({
        variables: {
          payload,
        },
      });

      setState({
        data: [...state.data, result.data.createBirthdayMan],
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

  return { state, getAll, create, update };
};
