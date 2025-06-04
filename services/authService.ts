// authService.ts
import { API_URL } from '../app-env';
import { getHeaders } from '../utils/authHeaders';

export async function logoutService(token: string) {
  const response = await fetch(`${API_URL}/api/auth/logout`, {
    method: 'POST',
    headers: getHeaders(token),
  });
  const text = await response.text();
  console.log('Logout response status:', response.status, 'body:', text);
  if (!response.ok) throw new Error('Failed to logout');
  return text ? JSON.parse(text) : {};
}

export async function refreshService(token: string) {
  const response = await fetch(`${API_URL}/api/auth/refresh-token`, {
    method: 'POST',
    headers: getHeaders(token),
  });
  const text = await response.text();
  console.log('Refresh response status:', response.status, 'body:', text);
  if (!response.ok) throw new Error('Failed to refresh token');
  return JSON.parse(text);
}

export async function getUserInfoService(token: string) {
  const response = await fetch(`${API_URL}/api/auth/me`, {
    method: 'GET',
    headers: getHeaders(token),
  });
  if (!response.ok) throw new Error('Failed to get user info');
  return response.json();
}

export async function loginService(email: string, password: string) {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) {
    throw response;
  }
  return response.json();
}
