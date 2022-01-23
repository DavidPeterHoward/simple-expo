import { StatusBar } from "expo-status-bar";
import React, { ReactElement } from "react";
import { StyleSheet, View, Platform, Button } from "react-native";
import NativeBaseThemeProvider from "@theme/ThemeProvider";
import Realm from "./Realm";
import { Box, Text } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import RootApplicationNavigation from "@screens/RootNavigation";
import { AuthenticationProvider, useAuthentication } from "@context/AuthenticationContextProvider";
// let Realm;
// if(Platform.OS === "web") {
//   Realm = require("realm");
// } else {
//   Realm = require("realm-web");
// }

// * Invokes the shared instance of the Realm app.
// const Realm = realmApp as IRealm;
const app = new Realm.App({ id: "csens-backend-twsmd" }); // Set Realm app ID here.

export default function App(): ReactElement {
  // const email = "davidpeterhoward+422@gmail.com";
  // const password = "Pa$$wo4d";

  // const runLogin = async () => {
  //   const creds = Realm.Credentials.anonymous();
  //   const user = await app.logIn(creds);
  //   console.log(user);
  // };
  // export default function App(): ReactElement {
  // const [{ results, loading, completed }] = useServiceCheck();

  // useEffect(() => {
  //   console.log(results);
  // }, [results]);
  // const isGTWalsheimProLoaded = useGTWalsheimPro();

  // if (completed === false || loading === true || !isGTWalsheimProLoaded) {
  //   return <AppLoading />;
  // }

  // setTimeout(() => {
  //   setCurrentTimeout()
  // }, 5000);
  const { isUserPinLocked, setIsUserPinLocked } = useAuthentication();

  // React.useEffect(() => {
  //   console.log(isUserPinLocked);
  // }, [isUserPinLocked]);

  return (
    <NativeBaseThemeProvider>
      <AuthenticationProvider>
        <NavigationContainer>
          <RootApplicationNavigation />
        </NavigationContainer>
      </AuthenticationProvider>
    </NativeBaseThemeProvider>
  );
}

/* 
  
          <AuthProvider serviceCheckResult={results}>
          <RealmApolloProvider>
            <ModalProvider>
              <SafeAreaProvider>
                <StatusBarContainer backgroundColor="black" barStyle="light-content" />
                <ApplicationNavigation serviceCheckResult={results} />
              </SafeAreaProvider>
            </ModalProvider>
          </RealmApolloProvider>
        </AuthProvider>
  */
/*   return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
      <Button title="press me" onPress={() => runLogin()} />
    </View>
  ); */
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
