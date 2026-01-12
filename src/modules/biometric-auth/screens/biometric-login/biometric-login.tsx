import { Container, CustomButton, CustomInput, Typography } from '@/components'
import { images } from '@/src/constants'
import { zodResolver } from '@hookform/resolvers/zod'
import * as LocalAuthentication from 'expo-local-authentication'
import { useRouter } from 'expo-router'
import * as SecureStore from 'expo-secure-store'
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
  const [biometricType, setBiometricType] = useState('')
  const credentialsLogin = useAuthStore((state) => state.credentialsLogin)
  const hasBiometryEnabled = useAuthStore((state) => state.hasBiometryEnabled)
  const setHasBiometryEnabled = useAuthStore((state) => state.setHasBiometryEnabled)
  const setAuthenticated = useAuthStore((state) => state.setAuthenticated)

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
            await SecureStore.setItemAsync('email', JSON.stringify(data.email))
            await SecureStore.setItemAsync('password', JSON.stringify(data.password))
            router.navigate('/')
          },
        }, {
          text: 'Prefiro não utilizar', onPress: async () => {
            router.navigate('/')
          }
        }]
        Alert.alert('Salvar Biometria', 'Quer usar biometria nos próximos acessos?', alertAction)
        setAuthenticated(true)
      } else {
        router.navigate('/')
      }
    } catch (error) {
      console.log('error: ', error)
    }
  }

  const signInWithBiometry = async () => {
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    const email = await SecureStore.getItemAsync('email')
    const password = await SecureStore.getItemAsync('password')

    const response: any = await credentialsLogin({
      email: JSON.parse(email ?? ''),
      password: JSON.parse(password ?? '')
    })

    if (response?.status !== 200) {
      setHasBiometryEnabled(false)
      Alert.alert('Falha no login', 'Entrar com credenciais e habilitar biometria novamente', [{ text: 'OK' }])
      return
    }

    if (!isEnrolled) {
      Alert.alert('Biometria não habilitada', 'Habilite a biometria nas configurações do aparelho', [{ text: 'OK' }])
    }

    const result = await authenticate({
      promptMessage: 'Login com biometria',
      fallbackLabel: 'Usar senha',
      cancelLabel: 'Cancelar',
    })

    if (result.success) {
      setAuthenticated(true)
      router.navigate('/')
    }
  }

  const validateBiometricAvailability = async () => {
    const { isSupported, biometricType } = await checkBiometricAvailability()
    setIsSupported(isSupported)
    setBiometricType(biometricType)
  }

  useEffect(() => {
    validateBiometricAvailability()
  }, [])

  return (
    <Container justify='space-between' style={{ flex: 1, margin: 0 }}>
      <HeaderContainer source={images.backgrounds.signInHeader} resizeMode='cover'>
        <Image source={images.icons.logo} style={{ width: 90, height: 30 }} />

        <View style={{ gap: 12 }}>
          <Typography size='30px' weight={800} color='#ffffff'>Sign in to your{'\n'}Account</Typography>
          <Typography color='#ffffff'>Create, launch, and scale your digital product profitably.</Typography>
        </View>
      </HeaderContainer>

      <FormWrapper>
        <CustomInput
          control={control}
          name='email'
          label='Email'
          keyboardType='email-address'
          placeholder="johnwick@gmail.com"
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
          <Typography color={'#6C7278'} size='12px'>Forgot Password?</Typography>
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
              <Typography size='12px' weight={400} color='#6C7278'>Or login with</Typography>
              <Line />
            </Separator>

            <CustomButton
              label="Reconhecimento Biométrico"
              onPress={signInWithBiometry}
              variant="secondary"
              leftIcon={images.icons.biometrics}
            />
          </>
        )}

      </FormWrapper>
    </Container>
  )
}