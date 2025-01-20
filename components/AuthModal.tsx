import { View, Text } from 'react-native';
import React from 'react';
import { ModalType } from '@/types/enums';

interface AuthModalProps {
  authType: ModalType | null;
}
const AuthModal = ({ authType }: AuthModalProps) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>AuthModal{authType}</Text>
    </View>
  );
};

export default AuthModal;
