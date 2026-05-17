export type Address = {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: {
    lat: string;
    lng: string;
  };
};

export type Company = {
  name: string;
  catchPhrase: string;
  bs: string;
};

export type User = {
  id: number;
  address: Address;
  company: Company;
  name: string;
  email: string;
  website: string;
  phone: string;
  username: string;
};

export type Post = {
  body: string;
  id: number;
  title: string;
  userId: number;
};

export type Todo = {
  completed: boolean;
  id: number;
  title: string;
  userId: number;
};
