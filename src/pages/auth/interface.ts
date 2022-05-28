import { AuthPayload } from '../../interfaces';

export interface Auth {
  isSignin: boolean;
  setIsSignin: () => void;
  setIsSignup: () => void;
  onFinish: (values: AuthPayload) => void;
  loading: boolean;
}
