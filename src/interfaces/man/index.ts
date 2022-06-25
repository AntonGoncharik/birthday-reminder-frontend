export interface Man {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  createdAt: string;
}

export interface PayloadMan {
  id?: string;
  userId?: string;
  firstName: string;
  lastName: string;
  birthDate: string;
}
