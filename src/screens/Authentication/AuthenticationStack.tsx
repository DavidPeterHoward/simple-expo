import React, { ReactElement, useState, useEffect } from "react";
import { Box, Button, Center, Flex, Heading, Spacer, Text } from "native-base";

import { createNativeStackNavigator, NativeStackScreenProps as N } from "@react-navigation/native-stack";
import { NavigatorScreenParams } from "@react-navigation/native";
import EntryScreen from "@screens/EntryScreen";
import PinCodeLogin from "./PinCodeLogin";

const Authenticaiton = createNativeStackNavigator<RNN.AuthenticationStackParamsList>();

export default function AuthenticationStack(): ReactElement {
  const DEFAULT_OPTIONS = { gestureEnabled: true };
  return (
    <Authenticaiton.Navigator screenOptions={{ headerShown: false, ...DEFAULT_OPTIONS }}>
      <Authenticaiton.Screen name="PinCodeLogin" component={PinCodeLogin} options={DEFAULT_OPTIONS} />
      <Authenticaiton.Screen name="EntryScreen" component={EntryScreen} options={DEFAULT_OPTIONS} />
    </Authenticaiton.Navigator>
  );
}
