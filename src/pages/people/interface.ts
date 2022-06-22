import { Man } from '../../interfaces';

export interface People {
  navigateToAddMan: () => void;
  navigateToMan: () => void;
  people: Man[];
}
