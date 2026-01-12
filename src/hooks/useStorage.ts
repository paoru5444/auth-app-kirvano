import { MMKV } from 'react-native-mmkv';

export default function useStorage() {
  const storage = new MMKV({
    id: 'secure-storage',
    encryptionKey: process.env.ENCRYPT_STORAGE
  })

  const set = (key: string, value: any): void => {
    storage.set(key, JSON.stringify(value))
  }

  const get = (key: string) => {
    const value = storage.getString(key);
    return value ? JSON.parse(value) : null
  }

  const remove = (key: string) => {
    storage.delete(key)
  }

  return {
    set, get, remove
  }
}
