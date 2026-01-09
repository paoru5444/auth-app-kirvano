import api from '@/services/api'
import MockAdapter from 'axios-mock-adapter'

export function setupMock() {
  const mock = new MockAdapter(api, { delayResponse: 2000 })

  mock.onPost('/api/login').reply((config) => {
    const { email, password } = JSON.parse(config.data)
    console.log('aqui', config.data)

    if (email === 'server@error.com') {
      return [500, { error: 'Internal server error' }]
    }

    if (email === 'user@test.com' && password === 'Test@123$55') {
      return [200, {
        token: 'mock-token',
        user: { id: 1, name: 'Test', email }
      }]
    }

    return [401, { error: 'Invalid credentials' }]
  })

  return mock
}