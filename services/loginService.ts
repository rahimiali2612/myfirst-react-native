// loginService.ts
import { API_URL } from '../app-env';

export async function loginService(email: string, password: string) {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) {
    throw response;
  }
  return response.json();
}
