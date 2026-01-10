import api from '@/services/api';
import MockAdapter from 'axios-mock-adapter';
import * as SecureStore from 'expo-secure-store';

const MOCK_TOKENS = {
  accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMzQ1LCJlbWFpbCI6InVzZXJAdGVzdC5jb20iLCJpYXQiOjE3MDAwMDAwMDAsImV4cCI6OTk5OTk5OTk5OX0.xxxxxxxxxxx',
  refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMzQ1LCJ0eXBlIjoicmVmcmVzaCIsImlhdCI6MTcwMDAwMDAwMCwiZXhwIjo5OTk5OTk5OTk5fQ.yyyyyyyyyyy'
};

export function setupMock() {
  const mock = new MockAdapter(api, { delayResponse: 2000 })

  mock.onPost('/api/login').reply((config) => {
    const { email, password } = JSON.parse(config.data)
    const user = { id: 1, name: 'John Wick', email, password }

    console.log('aqui', config.data)

    if (email === 'server@error.com') {
      return [500, { error: 'Internal server error' }]
    }

    if (email === 'user@test.com' && password === 'Test@123$55') {
      SecureStore.setItemAsync('@token', MOCK_TOKENS.accessToken)
      SecureStore.setItemAsync('@refresh_token', MOCK_TOKENS.refreshToken)

      return [200, {
        token: 'mock-token',
        user: { ...user, token: MOCK_TOKENS.accessToken, refresh_token: MOCK_TOKENS.refreshToken }
      }]
    }

    return [401, { error: 'Invalid credentials' }]
  })

  return mock
}