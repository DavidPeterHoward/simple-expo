import React, { ReactElement, useEffect, useRef, useState } from "react";

import { createNativeStackNavigator, NativeStackScreenProps as N } from "@react-navigation/native-stack";
import { NavigatorScreenParams, CommonActions, useNavigation, StackActions } from "@react-navigation/native";
import { useAuthentication } from "@context/AuthenticationContextProvider";
import { AppState } from "react-native";
import * as Keychain from "react-native-keychain";

export default function useCheckAuthStatus(actionType): any {
  const [isUserAnon, setIsUserAnon] = useState(false)
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)
  const [isUserKeyChainServices, setIsUserKeyChainServices] = useState(null)

  const checker = () => {
    return true
  }


  useEffect(() => {
    if(actionTy[e ==])

  }, []);
  
  return [isUserAnon, isUserLoggedIn, isUserKeyChainServices]
}
