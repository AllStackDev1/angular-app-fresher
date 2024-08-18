export interface Auth {
  user?: User | null;
  loading: boolean;
  error?: string;
}

export interface User {
  name: string;
  title: string;
  avater: string;
  credential: Credential;
}

export interface Credential {
  username: string;
  password: string;
}
