import { gql } from '@apollo/client';

export const getAllGql = gql`
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

export const createGql = gql`
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

export const updateGql = gql`
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
