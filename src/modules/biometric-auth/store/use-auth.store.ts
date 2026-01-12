import useStorage from '@/src/hooks/useStorage';
import api from '@/src/services/api';
import { create } from 'zustand';

type User = {
  name?: string;
  email?: string;
}
interface AuthStore {
  isAuthenticated: boolean | null;
  hasBiometryEnabled: boolean | null;
  user: User | null;
  credentialsLogin: (credentials: { email: string, password: string }) => void;
}

export const useAuthStore = create<AuthStore>(() => {
  const { get, set } = useStorage()

  return ({
    isAuthenticated: get('isAuthenticated'),
    hasBiometryEnabled: get('hasBiometryEnabled'),
    user: get('user'),
    credentialsLogin: async ({ email, password }) => {
      const response = await api.post('/api/login', { email, password })
      const { token, refreshToken, user } = response.data

      set('token', token)
      set('refresh_token', refreshToken)
      set('isAuthenticated', true)
      set('user', user)

      return response;
    }
  })
})