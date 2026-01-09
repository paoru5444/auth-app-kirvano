import { setupMock } from '@/modules/biometric-auth/services';
import { Slot } from "expo-router";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RootLayout() {
  if (__DEV__) {
    setupMock();
  }

  return (
    <SafeAreaView style={{ height: '100%', backgroundColor: '#ffffff' }}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <Slot />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>

  )
}
