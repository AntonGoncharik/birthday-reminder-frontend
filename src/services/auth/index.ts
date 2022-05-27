import { gql } from '@apollo/client';

export const signupGql = gql`
  mutation signin($payload: AuthPayload!) {
    signin(payload: $payload) {
      user {
        id
        email
        firstName
        lastName
      }
      token {
        accessToken
        refreshToken
      }
    }
  }
`;

export const signinGql = gql`
  mutation signin($payload: AuthPayload!) {
    signin(payload: $payload) {
      user {
        id
        email
        firstName
        lastName
      }
      token {
        accessToken
        refreshToken
      }
    }
  }
`;
