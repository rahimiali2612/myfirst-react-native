import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Provider as JotaiProvider } from 'jotai';

import './global.css';

export default function App() {
  return (
    <JotaiProvider>
      <Slot />
      <StatusBar style="auto" />
    </JotaiProvider>
  );
}
