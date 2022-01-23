import React, { ReactElement, useState, useEffect } from "react";
import { Box, Button, Center, Flex, Heading, Spacer, Text } from "native-base";
import { NativeStackScreenProps as N } from "@react-navigation/native-stack";

export default function DevMenu({ navigation }: RNN.DevMenu): ReactElement {
  return (
    <Box>
      <Text>DevMenu</Text>
      <Button variant="solid" onPress={() => navigation.navigate("AuthenticationStack")}>
        Already a user
      </Button>
      ;
    </Box>
  );
}
