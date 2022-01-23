/* eslint-disable @shopify/typescript/prefer-singular-enums */
/* eslint-disable @typescript-eslint/no-namespace */
import React, { ReactElement, useEffect, useRef, useState } from "react";

import { createNativeStackNavigator, NativeStackScreenProps as N } from "@react-navigation/native-stack";
import { AppState } from "react-native";
import { NavigatorScreenParams, CommonActions, useNavigation, StackActions } from "@react-navigation/native";
import EntryScreen from "@screens/EntryScreen";
import DevMenu from "./__DEV__/DevMenu";
import AuthenticationStack from "./Authentication/AuthenticationStack";
import ApplicationStack from "./Application/ApplicationStack";
import { useAuthentication } from "@context/AuthenticationContextProvider";
import useIsUserPinLocked from "@hooks/UserPinLock/useIsUserPinLocked";

enum Routes {
  DevMenuScreen = "DevMenu",
  ApplicationStackScreen = "ApplicationStack",
  AuthenticationStackScreen = "AuthenticationStack",
}

declare global {
  namespace RNN {
    type RootRoutes = {
      DevMenu: undefined;
      ApplicationStack: undefined; // ProfileScreen expects a username param
      AuthenticationStack: undefined; // SettingsScreen doesn't expect any navigation params
    };
    type DevMenu = N<RNN.RootRoutes, RootRoutes["DevMenu"]>;
    type ApplicationStack = N<RNN.RootRoutes, RootRoutes["ApplicationStack"]>;
    type AuthenticationStack = N<RNN.RootRoutes, RootRoutes["AuthenticationStack"]>;

    type ApplicationStackParamsList = {
      PinCodeLogin: undefined;
    };

    type AuthenticationStackParamsList = {
      PinCodeLogin: undefined;
      EntryScreen: undefined;
    };
    type PinCodeLogin = N<AuthenticationStackParamsList, AuthenticationStackParamsList["PinCodeLogin"]>;
    type EntryScreen = N<RNN.AuthenticationStackParamsList, AuthenticationStackParamsList["EntryScreen"]>;
  }
}

const Root = createNativeStackNavigator<RNN.RootRoutes>();

// const usePinLocker = (navigation) => {
//   const navigation = useNavigation();
//   const { isUserPinLocked, isUserLoggedIn } = useAuthentication();
//   useEffect(() => {
//     if (isUserPinLocked && isUserLoggedIn) {
//       navigation.dispatch(
//         CommonActions.reset({
//           index: 1,
//           routes: [{ name: "AuthenticationStack" }],
//         })
//       );
//     } else if (!isUserPinLocked && !isUserLoggedIn) {
//       navigation.dispatch(
//         CommonActions.reset({
//           index: 1,
//           routes: [{ name: "ApplicationStack" }],
//         })
//       );
//     }
//   }, [navigation, isUserPinLocked, isUserLoggedIn]);

//   return { isUserPinLocked, isUserLoggedIn };
// };

export default function RootApplicationNavigation(): ReactElement {
  const DEFAULT_OPTIONS = { gestureEnabled: true };

  // Custom Hook to control navigation resets on lockout
  useIsUserPinLocked({ timeWhenLockedOut: 5 });

  return (
    <Root.Navigator screenOptions={{ headerShown: false, ...DEFAULT_OPTIONS, animation: "none" }}>
      {/* {__DEV__ && <Root.Screen name="DevMenu" component={DevMenu} options={DEFAULT_OPTIONS} />} */}
      <Root.Screen
        name={Routes.AuthenticationStackScreen as keyof RNN.RootRoutes}
        component={AuthenticationStack}
        options={DEFAULT_OPTIONS}
      />
      <Root.Screen
        name={Routes.ApplicationStackScreen as keyof RNN.RootRoutes}
        component={ApplicationStack}
        options={DEFAULT_OPTIONS}
      />
    </Root.Navigator>
  );
}
