import React, { ReactElement, useEffect, useRef, useState } from "react";

import { createNativeStackNavigator, NativeStackScreenProps as N } from "@react-navigation/native-stack";
import { NavigatorScreenParams, CommonActions, useNavigation, StackActions } from "@react-navigation/native";
import { useAuthentication } from "@context/AuthenticationContextProvider";
import { AppState } from "react-native";
import * as Keychain from "react-native-keychain";

export default function useIsUserPinLocked({ timeWhenLockedOut }: { timeWhenLockedOut: number }): void {
  const [isActive, setIsActive] = useState(true);
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const [accountLockedAt, setAccountLockedAt] = useState(null);
  const [isLockOutActive, setIsLockOutActive] = useState(false);

  const { isUserPinLocked, setIsUserPinLocked, isUserLoggedIn } = useAuthentication();
  const navigation = useNavigation();

  const deleteLockOutTime = async () => {
    try {
      const result = await Keychain.resetGenericPassword({
        service: "timeLockedOut",
      });

      if (result) {
        console.log(result);
      } else {
        throw Error("cannot set this this deleteLockOutTime");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createLockOutTime = async () => {
    // 1 minute = 60 seconds, 1 second = 1000 milliseconds => 60 * 1000
    const addMinutesToDate = (date: Date, minutes: number): Date => new Date(date.getTime() + 5000);

    const createdAt = new Date();
    const startTimer = addMinutesToDate(createdAt, 15).getTime();
    try {
      if (accountLockedAt) {
        await deleteLockOutTime();
      }
      setAccountLockedAt(startTimer);
      await Keychain.setGenericPassword("timeLockedOut", `${startTimer}`, {
        service: "timeLockedOut",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const _handleAppStateChange = (nextAppState) => {
    if (appState.current === "active") {
      setIsActive(true);
    }

    appState.current = nextAppState;

    if (appState.current === "background" || appState.current === "inactive") {
      createLockOutTime();
      console.log("background");
      setIsActive(false);
    }

    if (appState.current === "active") {
      setIsActive(true);
      console.log("active");
    }
  };

  useEffect(() => {
    AppState.addEventListener("change", _handleAppStateChange);

    return () => {
      AppState.removeEventListener("change", _handleAppStateChange);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const userDoesNotNeedPin = async () => {
    setIsUserPinLocked(false);
    await deleteLockOutTime();
  };

  useEffect(() => {
    if (!isUserLoggedIn) {
      userDoesNotNeedPin();
      return;
    }
    if (isActive) {
      const now = new Date().getTime();
      if (accountLockedAt < now) {
        setIsLockOutActive(true);
        console.log("user requires a pin code");
      } else if (accountLockedAt > now) {
        console.log("user doesn't require a pin code");
        setIsLockOutActive(false);
        createLockOutTime();
      } else {
        console.log("accountLockedAt error");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive]);

  useEffect(() => {
    if (isUserPinLocked) {
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{ name: "AuthenticationStack" }],
        })
      );
    } else if (!isUserLoggedIn) {
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{ name: "ApplicationStack" }],
        })
      );
    }
  }, [isUserPinLocked, navigation, isUserLoggedIn]);
}
