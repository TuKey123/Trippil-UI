export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  about: string;
  dateOfBirth: Date;
  dateJoined: Date;
  trips: number;
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
