type UserBase = {
  firstName: string;
  lastName: string;
  email: string;
}

export interface User extends UserBase {
  password: string;
  admin?: boolean;
}
