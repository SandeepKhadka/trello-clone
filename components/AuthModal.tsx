import { AuthStrategy, ModalType } from '@/types/enums';
import { View, Text } from 'react-native';
import googleImage from '@/assets/images/login/google.png';
import microsoftImage from '@/assets/images/login/microsoft.png';
import appleImage from '@/assets/images/login/apple.png';
import slackImage from '@/assets/images/login/slack.png';

const LOGIN_OPTIONS = [
  {
    text: 'Continue with Google',
    icon: googleImage,
    strategy: AuthStrategy.Google,
  },
  {
    text: 'Continue with Microsoft',
    icon: microsoftImage,
    strategy: AuthStrategy.Microsoft,
  },
  {
    text: 'Continue with Apple',
    icon: appleImage,
    strategy: AuthStrategy.Apple,
  },
  {
    text: 'Continue with Slack',
    icon: slackImage,
    strategy: AuthStrategy.Slack,
  },
];

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
