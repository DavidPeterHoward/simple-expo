module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    sourceMaps: true,
    plugins: [
      "@babel/transform-react-jsx-source",
      [
        "module-resolver",
        {
          extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
          root: ["."],
          alias: {
            "@atoms": "./src/components/_atoms",
            "@molecules": "./src/components/_molecules",
            "@organisms": "./src/components/_organisms",
            "@screens": "./src/screens",
            "@navigation": "./src/navigation",
            "@context": "./src/_globals/context",
            "@hooks": "./src/_globals/hooks",
            "@providers": "./src/_globals/providers",
            "@theme": "./src/_globals/theme",
            "@types": "./src/_globals/@types",
            "@graphql": "./src/graphql",
            "@services": "./src/_globals/services",

            "@__mocks__": "./src/_globals/__mocks__",
          },
        },
      ],
    ],
  };
};
