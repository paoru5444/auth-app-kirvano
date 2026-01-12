import { Container, CustomButton, Typography } from '@/src/components';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React from 'react';
import { useAuthStore } from '../../biometric-auth/store';

export default function Home() {
  const router = useRouter();
  const setAuthenticated = useAuthStore((state) => state.setAuthenticated)

  const user: any = useAuthStore((state) => state.user)

  const clearAuthStorage = async () => {
    await SecureStore.deleteItemAsync('token')
    await SecureStore.deleteItemAsync('refresh_token')
  }

  const handleLogout = () => {
    clearAuthStorage()
    setAuthenticated(false)
    router.replace('/sign-in')
  }

  return (
    <Container align='center' justify='center' gap='24' style={{ height: '100%', padding: 32 }}>

      {user?.name && (<Typography size='28px' weight={600}>Bem vindo, {user.name} 👋!</Typography>)}
      <CustomButton label='Logout' onPress={handleLogout} />
    </Container>
  )
}