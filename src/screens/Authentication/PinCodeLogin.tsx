import React, { ReactElement, useState, useEffect } from "react";
import { Box, Button, Center, Flex, Heading, Spacer, Text } from "native-base";
import { useAuthentication } from "@context/AuthenticationContextProvider";
import * as Keychain from "react-native-keychain";
import { NativeModules, Platform } from "react-native";
import Aes from "react-native-aes-crypto";
import { ethers } from "ethers";
import * as Random from "expo-random";
// import utils from "ethers/utils";

export default function PinCodeLogin({ navigation }: { navigation: RNN.PinCodeLogin }): ReactElement {
  const { setIsUserPinLocked, isUserPinLocked } = useAuthentication();
  console.info(isUserPinLocked);
  const [wallet, setWallet] = useState(null);

  const createKeyChain = async () => {
    const result = await Keychain.setGenericPassword("timeLockedOut", "test", {
      service: "timeLockedOut",
    });
    console.info(result);
  };
  const getKeyChain = async () => {
    const result = await Keychain.getGenericPassword({
      service: "timeLockedOut",
    });
    console.info(result);
  };

  const generateKey = (password, salt, cost, length) => Aes.pbkdf2(password, salt, cost, length);

  const encryptData = (text, key) =>
    Aes.randomKey(16).then((iv) =>
      Aes.encrypt(text, key, iv, "aes-256-cbc").then((cipher) => ({
        cipher,
        iv,
      }))
    );

  const decryptData = (encryptedData, key) =>
    Aes.decrypt(encryptedData.cipher, key, encryptedData.iv, "aes-256-cbc");

  const createWallet = () => {
    const randomWallet = ethers.Wallet.createRandom();
    console.log(randomWallet);
    setWallet(randomWallet);
  };

  async function generateMnemonics() {
    // return utils.HDNode.entropyToMnemonic(utils.randomBytes(16)).split(' ');
    const randomBytes = await Random.getRandomBytesAsync(16);
    // const newWallet = utils.HDNode.entropyToMnemonic(randomBytes);
    const newWallet = ethers.utils.HDNode.entropyToMnemonic(randomBytes, ethers.wordlists.en).split(" ");
    console.log(newWallet);
    setWallet(newWallet);
  }

  async function generateTest() {
    const randomBytes = await Random.getRandomBytesAsync(16);
    const newWallet = ethers.utils.entropyToMnemonic(randomBytes);
    const newWalletThing = ethers.Wallet.fromMnemonic(newWallet);

    console.log(newWalletThing);
    setWallet(newWallet);
    // const newKey = ethers.utils.HDNode.fromSeed(randomBytes).privateKey;
    // console.log(newKey);
    // const newWallet = new ethers.Wallet(newKey);
    // setWallet(newWallet);

    console.log(newWalletThing?.mnemonic?.phrase);
  }

  const runThisFunction = () => {
    try {
      generateKey("Arnold", "salt", 5000, 256).then((key) => {
        console.log("Key:", key);
        encryptData(wallet, key)
          .then(({ cipher, iv }) => {
            console.log("Encrypted:", cipher);
            console.log("iv:", iv);

            decryptData({ cipher, iv }, key)
              .then((text) => {
                console.log("Decrypted:", text);
              })
              .catch((error) => {
                console.log(error);
              });

            Aes.hmac256(cipher, key).then((hash) => {
              console.log("HMAC", hash);
            });
          })
          .catch((error) => {
            console.log(error);
          });
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handleDecrypt = async () => {
    const phrase = "dolphin recipe citizen custom will tower list promote design cave nasty math";
    // const cipher =
    //   "GHNMoIDcI7Eg21QVrYumUFlD5mf6G9JFYL37aqVTkakSGCTBPs7TYIHbI7Lm5zkWaUvc24eM/06U0RqKp6a6hBfk6oGjnWGOuMT3Ek1cAmY=";
    // const key = "cece3a7dc9cf86aae926fd2ee520a06e5a5b616fa9e381de53600121e8aff095";
    // const iv = "3949e4010f54b625b9f68d91d36808c0";
    // const key = "Pa$$wo4d";
    const newKey = await generateKey("Pa$$wo4d", "salt", 5000, 256);
    console.log(newKey);
    // console.log(key);
    // decryptData({ cipher, iv }, key).then((text) => console.log("decrypted", text));
    // ({encrypted, "cac8cf92752ebe15bf82394f0cf50499"}, key).then((text) => console.log(text));

    const key = "dd13ea43cc392ba4f578cb25b109cbbad57fa753ec6ea992bfa5e02859ff5495";
    const cipher =
      "XnCVaoRaDfbYpPlVoFg/YuAyZAOnyncxbYek6S/3cfOyDVVimY+latgDtp43gaJzaQTGGpGv3vN6fUdAVjqZ0AJ1NfDre8y3zfP9NBZseDc=";
    const iv = "ba5cf315320a4f11848a0a92602ed888";

    const encryptedWallet = { cipher, iv };

    // encryptData(phrase, key).then(({ cipher, iv }) => {
    //   console.log("Encrypted:", cipher);
    //   console.log("iv:", iv);
    // });
    decryptData(encryptedWallet, key).then((text) => console.log(text));
  };

  return (
    <Box>
      <Text>AUTH | PINCODE REQUIRED</Text>
      <Button onPress={() => setIsUserPinLocked(!isUserPinLocked)}>PRess me</Button>
      <Button onPress={() => getKeyChain()}>PRess me</Button>
      <Button onPress={() => createWallet()}>createWallet</Button>
      <Button onPress={() => generateTest()}>generateTest</Button>
      <Button onPress={() => generateMnemonics()}>generateMnemonics</Button>
      <Button onPress={() => runThisFunction()}>runThisFunction</Button>
      <Button onPress={() => handleDecrypt()}>handleDecrypt</Button>
      <Button onPress={() => console.log(wallet?.mnemonic?.phrase)}>newWallet?.mnemonic?.phrase</Button>
    </Box>
  );
}

/* 
    console.log(newWallet);
    const newWalletMnemonic = newWallet?.mnemonic?.phrase;
    console.log(newWalletMnemonic);
*/
