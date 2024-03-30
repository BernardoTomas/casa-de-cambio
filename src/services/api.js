const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = 'https://v6.exchangerate-api.com/v6/';

export const getConversionRates = async (currency) => {
  if (!currency) throw new Error('Digite uma moeda no campo');
  const response = await fetch(`${BASE_URL}${API_KEY}/latest/${currency}`);
  if (!response.ok) throw new Error('Moeda inválida');
  const data = await response.json();
  return data.conversion_rates;
};
