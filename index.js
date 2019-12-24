import React from 'react';
import { NativeModules, requireNativeComponent, Platform } from 'react-native';

const { AppleSignIn } = NativeModules;

export const RNSignInWithAppleButton = requireNativeComponent('RNCSignInWithAppleButton');

export const SignInWithAppleButton = (buttonStyle, callBack) => {
  if (Platform.OS === 'ios') {
    return (
      <RNSignInWithAppleButton
        style={buttonStyle}
        onPress={async () => {
          await AppleSignIn.requestAsync({
            scopes: [AppleSignIn.Scope.FULL_NAME, AppleSignIn.Scope.EMAIL]
          }).then(
            response => {
              callBack(response);
            },
            error => {
              callBack(error);
            }
          );
        }}
      />
    );
  } else {
    return null;
  }
};

export function signIn({ onSuccess = res => {}, onError = err => {} }) {
  if (Platform.OS != 'ios') {
    onError('This function only support on iOS');
    erturn;
  }
  try {
    let verionNumber = parseFloat(Platform.Version);
    if (verionNumber < 13) {
      onError('This function not available on ios below 13');
      return;
    }
    AppleSignIn.requestAsync({
      scopes: [AppleSignIn.Scope.FULL_NAME, AppleSignIn.Scope.EMAIL]
    }).then(onSuccess, onError);
  } catch (err) {
    onError(err);
  }
}

export default AppleSignIn;
