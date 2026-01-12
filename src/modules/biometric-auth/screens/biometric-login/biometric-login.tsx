import { Container, CustomButton, CustomInput, Typography } from '@/components'
import { images } from '@/src/constants'
import { colors } from '@/src/constants/theme'
import useStorage from '@/src/hooks/useStorage'
import { zodResolver } from '@hookform/resolvers/zod'
import * as LocalAuthentication from 'expo-local-authentication'
import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Alert, Image, Keyboard, Pressable, View } from 'react-native'
import { authenticate, checkBiometricAvailability } from '../../services/biometry.service'
import { useAuthStore } from '../../store'
import { FormWrapper, HeaderContainer, Line, Separator } from './biometric-login.styles'
import { LoginFormData, signInSchema } from './schema.validator'

export default function BiometricLogin() {
  const router = useRouter();
  const [isSupported, setIsSupported] = useState(false)
  const [isInAutoLogin, setIsInAutoLogin] = useState(false)
  const credentialsLogin = useAuthStore((state) => state.credentialsLogin)
  const hasBiometryEnabled = useAuthStore((state) => state.hasBiometryEnabled)
  const setHasBiometryEnabled = useAuthStore((state) => state.setHasBiometryEnabled)
  const { set, get } = useStorage()

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const signInWithCredentials = async (data: any) => {
    try {
      Keyboard.dismiss();
      await credentialsLogin(data)

      if (isSupported && !hasBiometryEnabled) {
        const alertAction = [{
          text: 'OK', onPress: async () => {
            setHasBiometryEnabled(true)
            set('email', data?.email)
            set('password', data?.password)
            router.navigate('/')
          },
        }, {
          text: 'Prefiro não utilizar', onPress: async () => {
            router.navigate('/')
          }
        }]
        Alert.alert('Salvar Biometria', 'Quer usar biometria nos próximos acessos?', alertAction)
      } else {
        router.navigate('/')
      }
    } catch (error) {
      Alert.alert('Falha no login', 'Falha ao realizar login, tente mais tarde', [{ text: 'OK' }])
    }
  }

  const signInWithBiometry = async () => {
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    const email = get('email')
    const password = get('password')

    setIsInAutoLogin(true)

    const response: any = await credentialsLogin({
      email,
      password
    })

    if (response?.status !== 200) {
      setHasBiometryEnabled(false)
      setIsInAutoLogin(false)
      Alert.alert('Login Failed', 'Please sign in with your credentials to re-enable biometrics', [{ text: 'OK' }])
      return
    }

    if (!isEnrolled) {
      setIsInAutoLogin(false)
      Alert.alert('Biometrics Not Enabled', 'Please enable biometrics in your device settings', [{ text: 'OK' }])
    }

    const result = await authenticate({
      promptMessage: 'Sign in with biometrics',
      fallbackLabel: 'Use password',
      cancelLabel: 'Cancel',
    })

    if (result.success) {
      setIsInAutoLogin(false)
      router.navigate('/')
    }
  }

  const validateBiometricAvailability = async () => {
    const { isSupported } = await checkBiometricAvailability()
    setIsSupported(isSupported)
  }

  useEffect(() => {
    validateBiometricAvailability()
  }, [])

  return (
    <Container style={{ flex: 1, margin: 0 }}>
      <HeaderContainer>
        <Image source={images.icons.logo} style={{ width: 90, height: 30 }} />

        <View style={{ gap: 12 }}>
          <Typography size='30px' weight={800} color={colors.white}>Sign in to your{'\n'}Account</Typography>
          <Typography color={colors.white}>Create, launch, and scale your digital product profitably.</Typography>
        </View>
      </HeaderContainer>

      <FormWrapper>
        <CustomInput
          control={control}
          name='email'
          label='Email'
          keyboardType='email-address'
          placeholder="john.doe@gmail.com"
          error={errors.email}
        />

        <CustomInput
          control={control}
          name='password'
          label='Password'
          secureTextEntry
          placeholder='*******'
          error={errors.password}
        />

        <Pressable>
          <Typography color={colors.gray} size='12px'>Forgot Password?</Typography>
        </Pressable>

        <CustomButton
          label="Sign In"
          onPress={handleSubmit(signInWithCredentials)}
          isSubmitting={isSubmitting}
        />

        {hasBiometryEnabled && (
          <>
            <Separator>
              <Line />
              <Typography size='12px' weight={400} color={colors.gray}>Or login with</Typography>
              <Line />
            </Separator>

            <CustomButton
              label="Biometric Authentication"
              onPress={signInWithBiometry}
              variant="secondary"
              leftIcon={images.icons.biometrics}
              activityColor={colors.dark}
              isSubmitting={isInAutoLogin}
            />
          </>
        )}

      </FormWrapper>
    </Container>
  )
}