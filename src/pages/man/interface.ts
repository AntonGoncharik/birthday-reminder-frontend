import { Moment } from 'moment';

export interface ManForm {
  firstName: string;
  lastName: string;
  birthDate: Moment & { _i: string };
}

export interface Man {
  onFinish: (values: ManForm) => void;
  loading: boolean;
}
