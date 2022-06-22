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
