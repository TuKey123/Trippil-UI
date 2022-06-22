export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  about: string;
  dateOfBirth: string | number | Date;
  dateJoined: Date;
  trips: number;
  image: string;
}

export interface UserInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  verifyCode?: string;
}

export type UserPatial = Partial<UserInput>;

export interface UserResponse {
  refresh: string;
  access: string;
  userProfile: User;
}
