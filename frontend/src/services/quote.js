const baseUrl = 'https://quotes.rest/qod.json?category=inspire';

export const getQuote = async () => {
  try {
    const response = await fetch(baseUrl);
    return response.json();
  } catch (error) {
    console.log(error);
  }
};
