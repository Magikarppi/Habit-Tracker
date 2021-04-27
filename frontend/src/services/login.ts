const baseurl = '/api/login';

export const login = async (data) => {
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
