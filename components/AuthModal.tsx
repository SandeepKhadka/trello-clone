import { AuthStrategy, ModalType } from '@/types/enums';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import googleImage from '@/assets/images/login/google.png';
import microsoftImage from '@/assets/images/login/microsoft.png';
import appleImage from '@/assets/images/login/apple.png';
import slackImage from '@/assets/images/login/slack.png';
import { Ionicons } from '@expo/vector-icons';
import { useOAuth, useSignIn, useSignUp } from '@clerk/clerk-expo';

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
  const { signUp, setActive } = useSignUp();
  const { signIn } = useSignIn();
  const { startOAuthFlow: googleAuth } = useOAuth({
    strategy: AuthStrategy.Google,
  });
  const { startOAuthFlow: microsoftAuth } = useOAuth({
    strategy: AuthStrategy.Microsoft,
  });
  const { startOAuthFlow: appleAuth } = useOAuth({
    strategy: AuthStrategy.Apple,
  });
  const { startOAuthFlow: slackAuth } = useOAuth({
    strategy: AuthStrategy.Slack,
  });

  const onSelectedAuth = async (strategy: AuthStrategy) => {
    if (!signIn || !signUp) return;

    const selectedAuth = {
      [AuthStrategy.Google]: googleAuth,
      [AuthStrategy.Microsoft]: microsoftAuth,
      [AuthStrategy.Apple]: appleAuth,
      [AuthStrategy.Slack]: slackAuth,
    }[strategy];

    const userExistsButNeedsToSignIn =
      signUp.verifications.externalAccount.status === 'transferable' &&
      signUp.verifications.externalAccount.error?.code ===
        'external_account_exists';

    if (userExistsButNeedsToSignIn) {
      const res = await signIn.create({ transfer: true });

      if (res.status === 'complete') {
        setActive({
          session: res.createdSessionId,
        });
      }
    }

    const userNeedsToBeCreated =
      signIn.firstFactorVerification.status === 'transferable';

    if (userNeedsToBeCreated) {
      const res = await signUp.create({
        transfer: true,
      });

      if (res.status === 'complete') {
        setActive({
          session: res.createdSessionId,
        });
      }
    } else {
      try {
        const { createdSessionId } = await selectedAuth();
        if (createdSessionId) {
          setActive({ session: createdSessionId });
          console.log('Session created: ', createdSessionId);
        }
      } catch (error) {
        console.error('Error starting OAuth flow: ', error);
      }
    }
  };

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
          onPress={() => onSelectedAuth(strategy)}
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
