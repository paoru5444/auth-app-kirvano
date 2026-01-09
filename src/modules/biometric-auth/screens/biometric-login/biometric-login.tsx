import { Container, CustomButton, CustomInput, Typography } from '@/components'
import { images } from '@/src/constants'
import api from '@/src/services/api'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Image, Keyboard, Pressable, View } from 'react-native'
import { FormWrapper, HeaderContainer, Line, Separator } from './biometric-login.styles'
import { LoginFormData, signInSchema } from './schema.validator'


export default function BiometricLogin() {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const signInWithCredentials = async (data: any) => {
    try {
      console.log('Dados válidos:', data);
      Keyboard.dismiss();
      const { email, password } = data || {}
      const response = await api.post('/api/login', { email, password })
    } catch (error) {
      console.log('error: ', error)
    }
  }

  const signInWithBiometry = () => { }

  const validateBiometricAvailability = () => { }

  return (
    <Container justify='space-between'>
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
        />

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
      </FormWrapper>
    </Container>
  )
}