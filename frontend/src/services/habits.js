const baseUrl = '/api/habits';

let token = null;

export const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

export const create = async (data) => {
  try {
    const response = await fetch(baseUrl, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json', Authorization: token },
    });
    return response.json();
  } catch (exception) {
    console.log(exception);
  }
};

export const remove = async (habit) => {
  try {
    await fetch(`${baseUrl}/${habit.id}`, {
      method: 'DELETE',
    });
  } catch (error) {
    console.log(error);
  }
};

export const update = async (habit) => {
  try {
    const response = await fetch(`${baseUrl}/${habit.id}`, {
      method: 'PUT',
      body: JSON.stringify(habit),
      headers: { 'Content-Type': 'application/json', Authorization: token },
    });
    return response.json();
  } catch (exception) {
    console.log(exception);
  }
};
