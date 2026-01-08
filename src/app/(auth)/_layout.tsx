import { Slot } from "expo-router";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RootLayout() {


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
