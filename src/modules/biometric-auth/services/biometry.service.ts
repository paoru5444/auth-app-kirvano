import * as LocalAuthentication from 'expo-local-authentication';
import { LocalAuthenticationOptions } from 'expo-local-authentication';

export const checkBiometricAvailability = async () => {
  let isSupported = false;
  let biometricType = '';

  const compatible = await LocalAuthentication.hasHardwareAsync();
  isSupported = compatible;

  if (compatible) {
    const types = await LocalAuthentication.supportedAuthenticationTypesAsync();

    if (types.includes(LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION)) {
      biometricType = 'Face ID';
    } else if (types.includes(LocalAuthentication.AuthenticationType.FINGERPRINT)) {
      biometricType = 'Touch ID / Impressão Digital';
    } else if (types.includes(LocalAuthentication.AuthenticationType.IRIS)) {
      biometricType = 'Reconhecimento de Íris';
    }
  }

  console.log('isSuported: ', isSupported)
  console.log('biometricType: ', biometricType)
  return { isSupported, biometricType }
};

export const authenticate = async (options: LocalAuthenticationOptions) => {
  try {
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    console.log('isEnrolled: ', isEnrolled)

    if (!isEnrolled) {
      return {
        success: false,
        error: 'NO_BIOMETRIC_ENROLLED',
        message: 'Nenhuma biometria cadastrada'
      };
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: options.promptMessage || 'Autentique para continuar',
      fallbackLabel: options.fallbackLabel || 'Usar senha',
      cancelLabel: options.cancelLabel || 'Cancelar',
      disableDeviceFallback: options.disableDeviceFallback || false,
    });

    return result;
  } catch (error) {
    return {
      success: false,
      error: 'AUTHENTICATION_ERROR',
      message: error
    }
  }
}