import { setupMock } from '@/modules/biometric-auth/services';
import { colors } from '@/src/constants/theme';
import { Slot } from "expo-router";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RootLayout() {
  if (__DEV__) {
    setupMock();
  }

  return (
    <>
      <SafeAreaView edges={["top"]} style={{ flex: 1, backgroundColor: colors.dark }}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
          <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flexGrow: 1 }}>
            <Slot />
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>

  )
}
