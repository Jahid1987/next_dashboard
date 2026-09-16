export type Teacher = {
  id: string;
  name: string;
  subject: string;
  yearsOfExperience: number;
  email?: string;
  phoneNumber: string; // Optional property
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  }; // Optional nested object
};