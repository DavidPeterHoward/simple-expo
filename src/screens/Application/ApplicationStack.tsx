import React, { ReactElement, useState, useEffect } from "react";
import { Box, Button, Center, Flex, Heading, Spacer, Text } from "native-base";
import { useAuthentication } from "@context/AuthenticationContextProvider";

export default function ApplicationStack({ navigation }: RNN.ApplicationStack): ReactElement {
  const { setIsUserPinLocked, isUserPinLocked } = useAuthentication();
  console.info(isUserPinLocked);

  return (
    <Box>
      <Text>ApplicationStack</Text>
      <Button onPress={() => setIsUserPinLocked(!isUserPinLocked)}>PRess me</Button>
    </Box>
  );
}
