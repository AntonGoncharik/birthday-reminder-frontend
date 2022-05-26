import { atom } from 'recoil';

export const accountState = atom({
  key: 'accountState',
  default: {
    id: '1',
    email: 'ant.goncahrik@gmail.com',
    firstName: 'Anton',
    lastName: 'Goncharik',
  },
});
