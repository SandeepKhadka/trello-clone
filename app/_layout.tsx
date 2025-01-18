import { Stack } from 'expo-router';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const InitialLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
};

export default function RootLayout() {
  return (
    <ActionSheetProvider>
      <>
        <StatusBar style="light" />
        <GestureHandlerRootView style={{ flex: 1 }}>
          <InitialLayout />
        </GestureHandlerRootView>
      </>
    </ActionSheetProvider>
  );
}
