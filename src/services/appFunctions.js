import '../style.css';
import { getConversionRates } from './api';

const currencyChart = document.querySelector('.currency-chart');
const displayResult = document.querySelector('.box-conversion-result');

const createOption = (currencyName, currencySelect) => {
  const newOption = document.createElement('option');
  newOption.id = currencyName;
  newOption.value = currencyName;
  newOption.innerText = currencyName;
  currencySelect.appendChild(newOption);
};

export const createOptionsList = async (currency, currencySelect) => {
  const ratesList = await getConversionRates(currency);
  currencySelect.innerHTML = '';
  Object.keys(ratesList).forEach((key) => { createOption(key, currencySelect); });
};

const createLi = (currencyName, currency) => {
  const newCurrencyLi = document.createElement('li');
  newCurrencyLi.classList.add('currency-li');
  newCurrencyLi.innerHTML = `
    <img src="../../images/pixil-frame-0.png">
    <p class="currency-name">${currencyName}:</p>
    <p class="currency-value">${currency.toFixed(2)}</p>
    `;
  currencyChart.appendChild(newCurrencyLi);
};

export const createConversionRateChart = async (currency) => {
  const ratesList = await getConversionRates(currency);
  currencyChart.innerHTML = '';
  Object.keys(ratesList).forEach((key) => { createLi(key, ratesList[key]); });
};

export const convertCurrencies = async (convertFrom, convertTo, amount) => {
  if (!amount) amount = 1;
  const newRates = await getConversionRates(convertFrom);
  displayResult.innerHTML = '';
  displayResult.innerHTML = `
    <h2 class="unit">${convertFrom}</h2>
    <h2 class="amount">${(newRates[convertFrom] * amount).toFixed(2)}</h2>
    <h2>=</h2>
    <h2 class="unit">${convertTo}</h2>
    <h2 class="amount">${(newRates[convertTo] * amount).toFixed(2)}</h2>
  `;
};
