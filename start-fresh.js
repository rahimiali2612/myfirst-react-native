// start-fresh.js
// This script starts the app fresh, clearing all authentication data
const { exec } = require('child_process');
const AsyncStorage = require('@react-native-async-storage/async-storage').default;

// Function to clear authentication data and start the app
async function clearAuthAndStart() {
  try {
    console.log('🔄 Clearing authentication data...');

    // Manual command to clear AsyncStorage data
    const command = 'npx react-native-clear-storage-cli clear --all';

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error clearing storage: ${error.message}`);
        console.log('Starting app anyway...');
      } else {
        console.log('✅ Storage cleared successfully!');
      }

      // Start the Expo app
      console.log('🚀 Starting Expo app...');
      exec('npm start', (err, out, stdErr) => {
        if (err) {
          console.error(`Error starting app: ${err.message}`);
          return;
        }
        console.log(out);
      });
    });
  } catch (error) {
    console.error('Failed to clear data:', error);
    console.log('Starting app anyway...');
    exec('npm start');
  }
}

// Run the function
clearAuthAndStart();
