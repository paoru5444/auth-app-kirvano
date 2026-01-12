import api from '@/src/services/api';
import * as SecureStore from 'expo-secure-store';
import { create } from 'zustand';

interface AuthStore {
  isAuthenticated: boolean,
  hasBiometryEnabled: boolean,
  user: Object | null,
  setAuthenticated: (isAuthenticated: boolean) => void,
  setHasBiometryEnabled: (hasBiometryEnabled: boolean) => void,
  credentialsLogin: (credentials: { email: string, password: string }) => void,
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  isAuthenticated: false,
  hasBiometryEnabled: false,
  user: {},
  setAuthenticated: async (isAuthenticated) => {
    set({ isAuthenticated })
  },
  setHasBiometryEnabled: (hasBiometryEnabled) => {
    set({ hasBiometryEnabled })
  },
  credentialsLogin: async ({ email, password }) => {
    const response = await api.post('/api/login', { email, password })
    const { token, refreshToken, user } = response.data

    await SecureStore.setItemAsync('token', JSON.stringify(token))
    await SecureStore.setItemAsync('refresh_token', JSON.stringify(refreshToken))

    set({ user: user })
    return response;
  }
}))