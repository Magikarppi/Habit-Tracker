import { HabitType } from '../types';

const baseUrl = '/api/habits';

let token: undefined | string = undefined;

export const setToken = (newToken: string) => {
  token = `bearer ${newToken}`;
};

export const create = async (data: { name: string }) => {
  if (!token) {
    return;
  }
  try {
    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.append('Content-Type', 'application/json');
    requestHeaders.append('Authorization', token);
    const response = await fetch(baseUrl, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: requestHeaders,
      // headers: { 'Content-Type': 'application/json', Authorization: token },
    });
    return response.json();
  } catch (exception) {
    console.log(exception);
  }
};

export const remove = async (habit: HabitType) => {
  try {
    await fetch(`${baseUrl}/${habit.id}`, {
      method: 'DELETE',
    });
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
    const response = await fetch(`${baseUrl}/${habit.id}`, {
      method: 'PUT',
      body: JSON.stringify(habit),
      // headers: { 'Content-Type': 'application/json', Authorization: token },
      headers: requestHeaders,
    });
    return response.json();
  } catch (exception) {
    console.log(exception);
  }
};
