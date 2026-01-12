import { Container, CustomButton, Typography } from '@/src/components';
import useStorage from '@/src/hooks/useStorage';
import { useRouter } from 'expo-router';
import React from 'react';
import { useAuthStore } from '../../biometric-auth/store';

export default function Home() {
  const router = useRouter();
  const { remove, set } = useStorage()

  const user: any = useAuthStore((state) => state.user)

  const clearAuthStorage = async () => {
    remove('token')
    remove('refresh_token')
  }

  const handleLogout = () => {
    clearAuthStorage()
    set('isAuthenticated', false)
    router.replace('/sign-in')
  }

  return (
    <Container align='center' justify='center' gap='24px' style={{ height: '100%', padding: 32 }}>
      {user?.name && (<Typography size='28px' weight={600}>Bem vindo, {user.name} 👋!</Typography>)}
      <CustomButton label='Logout' onPress={handleLogout} />
    </Container>
  )
}