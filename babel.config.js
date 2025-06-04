module.exports = function (api) {
  api.cache(true);
  return {
    presets: [['babel-preset-expo', { jsxImportSource: 'nativewind' }], 'nativewind/babel'],
    // Using babel-preset-expo directly for Expo SDK 50+
    plugins: [],
  };
};
