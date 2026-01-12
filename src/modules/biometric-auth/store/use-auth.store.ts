import useStorage from '@/src/hooks/useStorage';
import api from '@/src/services/api';
import { create } from 'zustand';
import { AuthStore, User } from './use-auth.types';

const { get, set: setStorage } = useStorage()

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: get('isAuthenticated') ?? false,
  hasBiometryEnabled: get('hasBiometryEnabled') ?? false,
  user: get('user'),

  setIsAuthenticated: (value: boolean) => {
    setStorage('isAuthenticated', value)
    set({ isAuthenticated: value })
  },

  setHasBiometryEnabled: (value: boolean) => {
    setStorage('hasBiometryEnabled', value)
    set({ hasBiometryEnabled: value })
  },

  setUser: (user: User) => {
    setStorage('user', user)
    set({ user })
  },

  credentialsLogin: async ({ email, password }) => {
    const response = await api.post('/api/login', { email, password })
    const { token, refreshToken, user } = response.data

    setStorage('token', token)
    setStorage('refresh_token', refreshToken)
    setStorage('isAuthenticated', true)
    setStorage('user', user)

    set({
      isAuthenticated: true,
      user
    })

    return response;
  }
}))