import { ErrorInfo } from "react";

export interface Props {
  children: JSX.Element;
}

export interface State {
  hasError?: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}
