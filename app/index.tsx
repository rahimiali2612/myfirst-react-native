import { Redirect } from 'expo-router';
import { useAuth } from '../context/auth';

export default function Index() {
  const { token } = useAuth();

  // If logged in, redirect to tabs, otherwise to login
  if (token) {
    return <Redirect href="/(tabs)" />;
  } else {
    return <Redirect href="/login" />;
  }
}
