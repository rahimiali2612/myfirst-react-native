import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../app-env';

type AuthContextType = {
  user: any;
  token: string | null;
  loading: boolean;
  login: (token: string, user: any) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  loading: true,
  login: async () => {},
  logout: async () => {},
  refresh: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const storedToken = await AsyncStorage.getItem('token');
      const storedUser = await AsyncStorage.getItem('user');
      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
      setLoading(false);
    })();
  }, []);

  const login = async (newToken: string, newUser: any) => {
    setToken(newToken);
    setUser(newUser);
    await AsyncStorage.setItem('token', newToken);
    await AsyncStorage.setItem('user', JSON.stringify(newUser));
  };

  const logout = async () => {
    // Try to notify backend about logout
    if (token) {
      try {
        await fetch(`${API_URL}/api/auth/logout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (error) {
        console.log('Logout notification failed, but continuing client-side logout');
      }
    }

    // Clear local state regardless of backend response
    setToken(null);
    setUser(null);
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');
  };
  const refresh = async () => {
    if (!token) return;

    console.log('Attempting to refresh token...');
    try {
      // Include detailed logging for debugging
      console.log(`Making refresh request to: ${API_URL}/api/auth/refresh-token`);
      console.log(`Using token: ${token.substring(0, 15)}...`); // Log first part of token for debugging

      const response = await fetch(`${API_URL}/api/auth/refresh-token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Ensure space after Bearer is correctly formatted
        },
      });

      console.log(`Refresh token response status: ${response.status}`);

      // Debug response headers
      const responseHeaders: Record<string, string> = {};
      response.headers.forEach((value, key) => {
        responseHeaders[key] = value;
      });
      console.log('Response headers:', JSON.stringify(responseHeaders));

      if (!response.ok) {
        // For 401 errors during refresh, we can try to continue with the current token
        // if it's a temporary server issue, rather than immediately logging out
        if (response.status === 401) {
          console.log('Token refresh returned 401 - using existing token for now');
          // We'll get the error response body for debugging
          const errorBody = await response.text();
          console.log('Token refresh error response:', errorBody);
          // We'll let the current session continue instead of immediate logout
          // The token might still be valid for a while
          return;
        }

        console.log(`Token refresh failed with status: ${response.status}`);
        await logout();
        return;
      }

      // Rest of the refresh logic for successful responses
      const data = await response.json();
      console.log('Token refresh successful, received new token');

      if (data.token) {
        setToken(data.token);
        setUser(data.user);
        await AsyncStorage.setItem('token', data.token);
        await AsyncStorage.setItem('user', JSON.stringify(data.user));
      } else {
        console.log('Token refresh response missing token');
        // Don't logout immediately if the token is missing,
        // just log it and continue with existing token
      }
    } catch (error) {
      console.log('Token refresh error:', error);
      // Don't immediately logout on network errors
      // The current token might still be valid
    }
  };

  // Optionally, refresh token every 5 minutes
  useEffect(() => {
    if (!token) return;
    const interval = setInterval(refresh, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, refresh }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
