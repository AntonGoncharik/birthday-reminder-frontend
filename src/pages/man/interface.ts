import { Moment } from 'moment';

export interface ManForm {
  firstName: string;
  lastName: string;
  birthDate: Moment;
}

export interface Man {
  initialState: ManForm;
  onFinish: (values: ManForm) => void;
  loading: boolean;
}
