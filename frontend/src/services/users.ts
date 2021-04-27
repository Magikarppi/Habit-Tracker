const baseUrl = '/api/users';

export const getUsers = async () => {
  try {
    const response = await fetch(baseUrl);
    return response.json();
  } catch (error) {
    console.log(error);
  }
};
