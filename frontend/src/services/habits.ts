import { HabitType } from '../types';
import { fetchWithTimeout } from '../utils';

const baseUrl =
  process.env.NODE_ENV === 'production'
    ? `${process.env.REACT_APP_API_URL}/api/habits`
    : '/api/habits';

let token: undefined | string = undefined;

export const setToken = (newToken: string) => {
  token = `bearer ${newToken}`;
};

export const create = async (data: { name: string }) => {
  try {
    if (!token) {
      throw new Error('Token not provided');
    }
    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.append('Content-Type', 'application/json');
    requestHeaders.append('Authorization', token);

    const options = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: requestHeaders,
    };
    const response = await fetchWithTimeout(baseUrl, options);
    return response.json();
  } catch (exception) {
    console.log(exception);
  }
};

export const remove = async (habit: HabitType) => {
  try {
    await fetchWithTimeout(`${baseUrl}/${habit.id}`, { method: 'DELETE' });
  } catch (error) {
    console.log(error);
  }
};

export const update = async (habit: HabitType) => {
  if (!token) {
    return;
  }
  try {
    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.append('Content-Type', 'application/json');
    requestHeaders.append('Authorization', token);

    const options = {
      method: 'PUT',
      body: JSON.stringify(habit),
      headers: requestHeaders,
    };
    const response = await fetchWithTimeout(`${baseUrl}/${habit.id}`, options);
    return response.json();
  } catch (exception) {
    console.log(exception);
  }
};
