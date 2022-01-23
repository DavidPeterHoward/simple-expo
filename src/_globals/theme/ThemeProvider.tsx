import React, { ReactElement, ReactNode } from "react";
// import { StyleSheet, Text, TextInput, View, Platform } from "react-native";
// 1. Import the extendTheme function
import { extendTheme, IPressableProps, NativeBaseProvider } from "native-base";
// 2. Extend the theme to include custom colors, fonts, etc

// import Button from "@atoms/Button";
// import Text from "@atoms/Text";
// import Box from "@atoms/Box";
// import Image from "@atoms/Image";
// import Input from "@atoms/Input";
// import Pressable from "@atoms/Pressable";

const fontConfig = {
  // GTWalsheimPro: {
  //   100: {
  //     normal: "GTWalsheimPro-Thin",
  //     italic: "GTWalsheimPro-ThinOblique",
  //   },
  //   200: {
  //     normal: "GTWalsheimPro-UltraLight",
  //     italic: "GTWalsheimPro-UltraLightOblique",
  //   },
  //   300: {
  //     normal: "GTWalsheimPro-Light",
  //     italic: "GTWalsheimPro-LightOblique",
  //   },
  //   400: {
  //     normal: "GTWalsheimPro-Regular",
  //     italic: "GTWalsheimPro-RegularOblique",
  //   },
  //   500: {
  //     normal: "GTWalsheimPro-Medium",
  //     italic: "GTWalsheimPro-MediumOblique",
  //   },
  //   600: {
  //     normal: "GTWalsheimPro-Bold",
  //     italic: "GTWalsheimPro-BoldOblique",
  //   },
  //   700: {
  //     normal: "GTWalsheimPro-UltraBold",
  //     italic: "GTWalsheimPro-UltraBoldOblique",
  //   },
  //   900: {
  //     normal: "GTWalsheimPro-Black",
  //     italic: "GTWalsheimPro-BlackOblique",
  //   },
  // },
};

const fonts = {
  // heading: "GTWalsheimPro-Bold",
  // body: "GTWalsheimPro-Regular",
  // mono: "GTWalsheimPro",
};

const components = {
  // Button,
  // Text,
  // Box,
  // Image,
  // Input,
  // Pressable,
};

export const colorTheme = {
  brand: {
    900: "#8287af",
    800: "#7c83db",
    700: "#b3bef6",
    evrGreen: "#86D800",
    evrPurple: "#7000FF",
    lightGray: "#939393",
    almostBlack: "#1F1F1F",
    csensPurple: "#692DF5",
    csensPurpleText: "#692DF5",
    csensBlack: "#272727",
    csensGrey: "#EBEBEB",
    csensDarkerGrey: "#AAAAAA",
    csensWhite: "#FFFFFF",
    csensBlue: "#E9ECF0",
    cesnsCancelRed: "#B00020",
  },
  csens: {
    moreBackground: {
      400: "#1B1C1F",
    },
    obsidian: {
      400: "#1F1F1F",
    },
    purple: {
      400: "#692DF5",
    },
  },
};

const theme = extendTheme({
  colors: colorTheme,
  // components,
  // fontConfig,
  // fonts,
});

// Declare custom typescript types for custom variants, and extending the nativeBase theme
// type CustomThemeType = typeof theme;

// interface VBox {
//   variant?: undefined | keyof typeof components.Box.variants;
// }
// interface VImage {
//   variant?: undefined | keyof typeof components.Image.variants;
// }
// interface VPressableProps {
//   _text?: undefined | IPressableProps;
// }
// interface VText {
//   variant?: undefined | keyof typeof components.Text.variants;
// }

// declare module "native-base" {
//   type ICustomTheme = CustomThemeType;
//   // type IBoxProps = VBox;
//   // interface IBoxProps extends VBox {
//   //   variant?: undefined | keyof typeof components.Box.variants;
//   // }
//   // interface IImageProps extends VImage {
//   //   variant?: undefined | keyof typeof components.Image.variants;
//   // }
//   // interface ITextProps extends VText {
//   //   // Hack to fix variant - unknown is probably not the best
//   //   variant?: unknown | undefined | keyof typeof components.Text.variants;
//   // }
//   interface IPressableProps extends VPressableProps {
//     _text?: undefined | IPressableProps;
//   }
// }

// Export NativeBaseThemeProvider to include custom theme (styles, fonts, etc)
export default function NativeBaseThemeProvider({ children }: { children: ReactNode }): ReactElement {
  return <NativeBaseProvider /* theme={theme} */>{children}</NativeBaseProvider>;
}
