import { fetchWithTimeout } from '../utils';

const baseUrl =
  process.env.NODE_ENV === 'production'
    ? `${process.env.REACT_APP_API_URL}/api/users`
    : '/api/users';

export const signup = async (data: { username: string; password: string }) => {
  try {
    const options = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    };

    const response = await fetchWithTimeout(baseUrl, options);
    return response.json();
  } catch (error) {
    console.log(error);
  }
};
