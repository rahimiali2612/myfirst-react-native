const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

// Get the default Metro config
const config = getDefaultConfig(__dirname, {
  // Enable experimental features for Expo Router
  unstable_getProjectRoot: true,
});

// Add additional resolver extensions for Expo Router
const { resolver } = config;
if (resolver && resolver.sourceExts) {
  resolver.sourceExts = [...resolver.sourceExts, 'mjs'];
}

module.exports = withNativeWind(config, { input: './global.css' });
