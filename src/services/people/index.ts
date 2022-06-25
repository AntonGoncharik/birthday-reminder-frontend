import { gql, useLazyQuery, useMutation } from '@apollo/client';

const getAllGql = gql`
  query getBirthdayPeople {
    getBirthdayPeople {
      id
      userId
      firstName
      lastName
      birthDate
      createdAt
    }
  }
`;

const getGql = gql`
  query getBirthdayMan($id: ID!) {
    getBirthdayMan(id: $id) {
      id
      userId
      firstName
      lastName
      birthDate
      createdAt
    }
  }
`;

const createGql = gql`
  mutation createBirthdayMan($payload: CreateBirthdayMan!) {
    createBirthdayMan(payload: $payload) {
      id
      userId
      firstName
      lastName
      birthDate
      createdAt
    }
  }
`;

const updateGql = gql`
  mutation updateBirthdayMan($payload: UpdateBirthdayMan!) {
    updateBirthdayMan(payload: $payload) {
      id
      userId
      firstName
      lastName
      birthDate
      createdAt
    }
  }
`;

export const usePeopleService = () => {
  const [getAllQuery] = useLazyQuery(getAllGql);
  const [getQuery] = useLazyQuery(getGql);
  const [createMutation] = useMutation(createGql);
  const [updateMutation] = useMutation(updateGql);

  return { getAllQuery, getQuery, createMutation, updateMutation };
};
