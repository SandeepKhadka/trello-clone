import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import trelloImage from '@/assets/images/login/trello.png';
import { Colors } from '@/constants/Colors';
import * as WebBrowser from 'expo-web-browser';
import { useActionSheet } from '@expo/react-native-action-sheet';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModalProvider,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ModalType } from '@/types/enums';
import AuthModal from '@/components/AuthModal';

export default function Index() {
  const { top } = useSafeAreaInsets();
  const { showActionSheetWithOptions } = useActionSheet();
  // const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ['33%'], []);
  const [authType, setAuthType] = useState<ModalType | null>(null);
  const openLink = () => {
    WebBrowser.openBrowserAsync('https://google.com');
  };
  const openActionSheet = async () => {
    const options = ['View support docs', 'Contact us', 'Cancel'];
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        title: "Can't log in or sign up?",
      },
      (selectedIndex: number | undefined) => {
        // console.log(selectedIndex);
      }
    );
  };

  const showModal = async (type: ModalType) => {
    setAuthType(type);
    bottomSheetRef.current?.expand();
  };

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        opacity={0.2}
        appearsOnIndex={0}
        disappearsOnIndex={0}
        {...props}
        onPress={() => bottomSheetRef.current?.close()}
      />
    ),
    []
  );
  useEffect(() => {
    bottomSheetRef.current?.expand();
  }, []);

  return (
    <BottomSheetModalProvider>
      <View
        style={[
          styles.container,
          {
            paddingTop: top + 30,
          },
        ]}
      >
        <Image source={trelloImage} style={styles.image} />
        <Text style={styles.description}>
          Move teamwork forward - even on the go
        </Text>
        <View style={{ width: '100%', paddingHorizontal: 30, marginTop: 20 }}>
          <TouchableOpacity
            style={[
              styles.btn,
              {
                backgroundColor: '#fff',
              },
            ]}
            activeOpacity={0.5}
            onPress={() => showModal(ModalType.Login)}
          >
            <Text
              style={[
                styles.btnText,
                {
                  color: Colors.primary,
                },
              ]}
            >
              Log in
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.btn,
              {
                marginBottom: 10,
              },
            ]}
            activeOpacity={0.5}
            onPress={() => showModal(ModalType.SignUp)}
          >
            <Text style={[styles.btnText]}>Sign Up</Text>
          </TouchableOpacity>
          <Text style={[styles.infoText]}>By signing up, you agree to the</Text>
          <Text style={[styles.infoText, { marginBottom: 10 }]}>
            <Text
              style={{
                textDecorationLine: 'underline',
                fontWeight: 600,
                textDecorationColor: '#fff',
              }}
              onPress={openLink}
            >
              User Notice
            </Text>{' '}
            and{' '}
            <Text
              style={{
                textDecorationLine: 'underline',
                fontWeight: 600,
                textDecorationColor: '#fff',
              }}
              onPress={openLink}
            >
              Privacy Policy.
            </Text>{' '}
          </Text>
          <Text
            style={[
              styles.infoText,
              {
                textDecorationLine: 'underline',
                fontWeight: 600,
              },
            ]}
            onPress={openActionSheet}
          >
            Can't log in or sign up?
          </Text>
        </View>
      </View>
      <BottomSheet
        ref={bottomSheetRef}
        backdropComponent={renderBackdrop}
        snapPoints={snapPoints}
        handleComponent={null}
        enableOverDrag={false}
        enablePanDownToClose
      >
        <BottomSheetView>
          <AuthModal authType={authType} />
        </BottomSheetView>
      </BottomSheet>
    </BottomSheetModalProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  image: {
    height: 450,
    resizeMode: 'contain',
    // alignSelf: 'center',
  },
  description: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 500,
    paddingTop: 20,
  },
  btn: {
    width: '100%',
    marginTop: 10,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 12,
  },
  btnText: {
    fontSize: 20,
    textAlign: 'center',
    color: '#ffffffd2',
  },
  infoText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#ffffffd2',
  },
});
