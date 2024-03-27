import './style.css';
import Swal from 'sweetalert2';
import {
  createConversionRateChart,
  createOptionsList,
  convertCurrencies,
} from './services/appFunctions';

const currencyInput = document.querySelector('#currency-input');
const currencyAmount = document.querySelector('#currency-amount-input');
const currencySelectConvertFrom = document.querySelector('#currency-1');
const currencySelectConvertTo = document.querySelector('#currency-2');

const getCurrencyBtn = document.querySelector('#get-currency-btn');
const convertCurrencyBtn = document.querySelector('#convert-currency-btn');
const swapCurrenciesBtn = document.querySelector('#swap-currencies-btn');

const currencyChart = document.querySelector('.currency-chart');

createOptionsList('USD', currencySelectConvertFrom);
createOptionsList('BRL', currencySelectConvertTo);
convertCurrencies('USD', 'BRL', currencyAmount.value);

currencySelectConvertFrom.addEventListener('change', () => {
  const newCurrency = currencySelectConvertFrom.value;
  createOptionsList(newCurrency, currencySelectConvertFrom);
});

currencySelectConvertTo.addEventListener('change', () => {
  const newCurrency = currencySelectConvertTo.value;
  createOptionsList(newCurrency, currencySelectConvertTo);
});

swapCurrenciesBtn.addEventListener('click', () => {
  const convertFrom = currencySelectConvertFrom.value;
  const convertTo = currencySelectConvertTo.value;
  currencySelectConvertFrom.value = convertTo;
  currencySelectConvertTo.value = convertFrom;
});

convertCurrencyBtn.addEventListener('click', () => {
  const convertFrom = currencySelectConvertFrom.value;
  const convertTo = currencySelectConvertTo.value;
  convertCurrencies(convertFrom, convertTo, currencyAmount.value);
});

getCurrencyBtn.addEventListener('click', async () => {
  try {
    await createConversionRateChart(currencyInput.value);
    createOptionsList(currencyInput.value, currencySelectConvertFrom);
  } catch (erro) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: `${erro}`,
    });
  }
});

currencyChart.addEventListener('click', (event) => {
  const clickedCurrency = event.target.closest('.currency-li');
  if (!clickedCurrency) return;
  currencySelectConvertTo.value = clickedCurrency.children[1].innerText.replace(':', '');
});
