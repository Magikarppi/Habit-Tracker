import { fetchWithTimeout } from '../utils';

const baseurl =
  process.env.NODE_ENV === 'production'
    ? `${process.env.REACT_APP_API_URL}/api/login`
    : '/api/login';

export const login = async (data: { username: string; password: string }) => {
  try {
    const options = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    };

    const response = await fetchWithTimeout(baseurl, options);
    return response.json();
  } catch (exception) {
    console.log(exception);
  }
};
