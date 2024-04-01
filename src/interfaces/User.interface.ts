interface UserBase {
  firstName: string;
  lastName: string;
  email: string;
}

export interface User extends UserBase {
  password: string;
}

export interface UserFrontend extends UserBase {
  admin: boolean;
}