import api from '@/services/api';
import { MOCK_TOKENS } from '@/src/constants';
import MockAdapter from 'axios-mock-adapter';

export function setupMock() {
  const mock = new MockAdapter(api, { delayResponse: 2000 })

  mock.onPost('/api/login').reply((config) => {
    const { email, password } = JSON.parse(config.data)
    const user = { id: 1, name: 'John Doe', email, password }

    if (email === 'server@error.com') {
      return [500, { error: 'Internal server error' }]
    }

    if (email === 'user@test.com' && password === 'Test@123$55') {
      return [200, {
        token: MOCK_TOKENS.accessToken,
        refreshToken: MOCK_TOKENS.refreshToken,
        user
      }]
    }

    return [401, { error: 'Invalid credentials' }]
  })

  return mock
}