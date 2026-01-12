export type User = {
  name?: string;
  email?: string;
}
export interface AuthStore {
  isAuthenticated: boolean | null;
  hasBiometryEnabled: boolean | null;
  user: User | null;
  credentialsLogin: (credentials: { email: string, password: string }) => Promise<any>;
  setIsAuthenticated: (value: boolean) => void;
  setHasBiometryEnabled: (value: boolean) => void;
  setUser: (user: User) => void;
}