import { AuthStrategy, ModalType } from '@/types/enums';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import googleImage from '@/assets/images/login/google.png';
import microsoftImage from '@/assets/images/login/microsoft.png';
import appleImage from '@/assets/images/login/apple.png';
import slackImage from '@/assets/images/login/slack.png';
import { Ionicons } from '@expo/vector-icons';

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

const selectedAuth = (strategy: AuthStrategy) => {
  console.log('Selected Auth', strategy);
};

const AuthModal = ({ authType }: AuthModalProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.innerContainer}>
        <Ionicons name="mail-outline" size={24} color="black" />
        <Text style={styles.text}>
          {authType === ModalType.Login ? 'Log in' : 'Sign up'} with Email
        </Text>
      </TouchableOpacity>
      {LOGIN_OPTIONS.map(({ text, icon, strategy }) => (
        <TouchableOpacity
          key={strategy}
          style={styles.innerContainer}
          onPress={() => selectedAuth(strategy)}
        >
          <Image
            source={icon}
            style={{ width: 24, height: 24, resizeMode: 'contain' }}
          />
          <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default AuthModal;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  innerContainer: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 20,
    opacity: 0.7,
  },
  text: {
    fontSize: 18,
  },
});
