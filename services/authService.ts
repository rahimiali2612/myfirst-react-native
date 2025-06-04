// authService.ts
import { API_URL } from '../app-env';
import { getHeaders } from '../utils/authHeaders';

export async function logoutService(token: string) {
  const response = await fetch(`${API_URL}/api/auth/logout`, {
    method: 'POST',
    headers: getHeaders(token),
  });
  if (!response.ok) throw new Error('Failed to logout');
  return response.json();
}

export async function refreshService(token: string) {
  const response = await fetch(`${API_URL}/api/auth/refresh`, {
    method: 'POST',
    headers: getHeaders(token),
  });
  if (!response.ok) throw new Error('Failed to refresh token');
  return response.json();
}

export async function getUserInfoService(token: string) {
  const response = await fetch(`${API_URL}/api/auth/me`, {
    method: 'GET',
    headers: getHeaders(token),
  });
  if (!response.ok) throw new Error('Failed to get user info');
  return response.json();
}
