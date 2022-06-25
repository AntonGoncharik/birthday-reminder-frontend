import { gql, useMutation } from '@apollo/client';

const signupGql = gql`
  mutation signup($payload: AuthPayload!) {
    signup(payload: $payload) {
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

const signinGql = gql`
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

export const useAuthService = () => {
  const [signupMutation] = useMutation(signupGql);
  const [signinMutation] = useMutation(signinGql);

  return { signupMutation, signinMutation };
};
