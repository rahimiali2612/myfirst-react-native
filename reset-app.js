// reset-app.js
// This script modifies the auth context to force clear data on next start
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const authFilePath = path.join(__dirname, 'context', 'auth.tsx');

try {
  console.log('📱 Preparing to reset app authentication...');

  // Read the current auth.tsx file
  let authContent = fs.readFileSync(authFilePath, 'utf8');

  // Add reset code to useEffect in auth.tsx
  const targetPattern = /useEffect\(\) => \{[\s\S]*?\(async \(\) => \{/;
  const replacementCode = `useEffect(() => {
    (async () => {
      // RESET: This will clear auth data on startup - will be removed after first run
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
      console.log('🧹 Auth data cleared on startup');`;

  // Check if reset code is already there
  if (authContent.includes('// RESET:')) {
    console.log('👍 Reset code already in place, no changes needed');
  } else {
    // Add reset code
    authContent = authContent.replace(
      /useEffect\(\) => \{[\s\S]*?\(async \(\) => \{/,
      replacementCode
    );

    // Write back to file
    fs.writeFileSync(authFilePath, authContent);
    console.log('✅ Added reset code to auth.tsx');
  }

  // Start the app
  console.log('🚀 Starting the app...');
  execSync('npm start', { stdio: 'inherit' });
} catch (error) {
  console.error('❌ Error:', error.message);
  console.log('Starting app anyway...');
  execSync('npm start', { stdio: 'inherit' });
}
