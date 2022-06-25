import { Man } from '../../interfaces';

export interface People {
  navigateToAddMan: () => void;
  navigateToMan: (id: string) => void;
  people: Man[];
}
