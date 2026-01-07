import Container from '@/src/components/Container'
import Input from '@/src/components/Input'
import Typography from '@/src/components/Typography'
import { images } from '@/src/constants'
import React, { useState } from 'react'
import { Dimensions, Image, Pressable, Text, TextInput, TouchableOpacity, View, } from 'react-native'

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <Container style={{ height: Dimensions.get('screen').height }} justify='space-between'>
      <Container gap='14px'>
        <Image source={images.logo} style={{ width: 75, height: 75 }} />
        <Typography size='24px' weight={800}>Sign In To Your Account.</Typography>
        <Typography>It's so good to have you back!.</Typography>
      </Container>

      <View>
        <Input
          label='Email Address'
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType='email-address'
          iconLeft={images.mail}
        />

        <View>
          <Text>Password</Text>
          <TextInput secureTextEntry />
        </View>

        <View>
          <Pressable />
          <Text>Remember Password</Text>
        </View>

        <TouchableOpacity>
          <Text>Sign In</Text>
          <Image source={images.entrance} />
        </TouchableOpacity>

        <Text>
          <Text>Don’t have an account?</Text>
          <Text>Sign Up</Text>
        </Text>
      </View>

      <View />

      <View>
        <Text>Copyright 2025 slothUI ©</Text>
      </View>
    </Container>
  )
}