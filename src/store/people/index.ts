import { atom } from 'recoil';

export const accountState = atom({
  key: 'accountState1',
  default: {
    id: '1',
    email: 'ant.goncahrik@gmail.com',
    firstName: 'Anton',
    lastName: 'Goncharik',
  },
});
