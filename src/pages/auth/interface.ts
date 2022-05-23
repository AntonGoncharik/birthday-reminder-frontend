export interface Auth {
  isSignin: boolean;
  setIsSignin: () => void;
  setIsSignup: () => void;
}

export interface AuthPayload {
  email: string;
  password: string;
}
