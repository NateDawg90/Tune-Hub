// /models/User.ts
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zip: string;
}
