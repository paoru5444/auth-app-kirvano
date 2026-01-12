import { Redirect } from 'expo-router'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAuthStore } from '../modules/biometric-auth/store'
import Home from '../modules/home/screens/home'

export default function index() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  if (!isAuthenticated) {
    return <Redirect href="/sign-in" />
  }

  return (
    <SafeAreaView>
      <Home />
    </SafeAreaView>
  )
}
