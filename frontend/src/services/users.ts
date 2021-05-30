import { fetchWithTimeout } from '../utils';

const baseUrl =
  process.env.NODE_ENV === 'production'
    ? `${process.env.REACT_APP_API_URL}/api/users`
    : '/api/users';

export const getUsers = async () => {
  try {
    const response = await fetchWithTimeout(baseUrl);
    return response.json();
  } catch (error) {
    console.log(error);
  }
};
