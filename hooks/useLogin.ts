import { useState } from 'react';
import { loginService } from '../services/authService';

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await loginService(email, password);
      setLoading(false);
      return data;
    } catch (err: any) {
      setError('Login failed');
      setLoading(false);
      throw err;
    }
  };

  return { login, loading, error };
}
