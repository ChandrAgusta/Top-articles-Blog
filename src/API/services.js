// services.js

import axios from 'axios';

const apiKey = '0f9b0beb4d3940f8b7a0ede14a6afb4a';
const apiUrl = 'https://newsapi.org/v2/top-headlines';

const getTopHeadlines = async (selectedCountry) => {
  try {
    const response = await axios.get(apiUrl, {
      params: {
        country: selectedCountry,
        apiKey: apiKey,
      },
    });
    console.log(response.data)
    return response.data.articles;
  } catch (error) {
    console.error('Error fetching news data:', error);
    throw error;
  }
};

export { getTopHeadlines };
