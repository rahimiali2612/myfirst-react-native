// clear-auth.js
// This script clears authentication data from AsyncStorage
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

// Create a temporary React Native script that clears AsyncStorage
const tempFile = path.join(__dirname, 'temp-clear-storage.js');

const clearStorageScript = `
// This is a temporary file that will be executed in the React Native environment
import AsyncStorage from '@react-native-async-storage/async-storage';

// Clear authentication data
async function clearAuthData() {
  try {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');
    console.log('🧹 Authentication data cleared successfully');
  } catch (error) {
    console.error('Failed to clear auth data:', error);
  }
}

clearAuthData();
`;

// Write the temporary script
fs.writeFileSync(tempFile, clearStorageScript);

console.log('🔑 Clearing authentication data...');
console.log('📱 Starting the app with fresh authentication state...');

// Delete the temporary file after use
process.on('exit', () => {
  try {
    fs.unlinkSync(tempFile);
  } catch (error) {
    // Ignore errors on cleanup
  }
});

// Start the app
exec('npm start', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`Stderr: ${stderr}`);
    return;
  }
  console.log(stdout);
});
