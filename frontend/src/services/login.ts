const baseurl =
  process.env.NODE_ENV === 'production'
    ? `${process.env.REACT_APP_API_URL}/api/login`
    : '/api/login';

export const login = async (data: { username: string; password: string }) => {
  try {
    const response = await fetch(baseurl, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    });
    return response.json();
  } catch (exception) {
    console.log(exception);
  }
};
