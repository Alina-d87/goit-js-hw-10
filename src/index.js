import './css/styles.css';
import { debounce } from 'lodash';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('#search-box'),
  list: document.querySelector('.country-list'),
  info: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', debounce(nameInput, DEBOUNCE_DELAY));

function nameInput(e) {
  const nameCountry = e.target.value.trim().toLowerCase();
  console.log(nameCountry);
  if (nameCountry === '') {
    clearInput();
    return;
  }
  clearInput();

  return fetchCountries(nameCountry)
    .then(names => {
      renderList(names);
    })
    .catch(error => {
      Notiflix.Notify.failure('Oops, there is no country with that name');
      return console.log('error');
    });
}

const listCountry = item => `<li class="nameList">
<img src="${item.flags.svg}" width=30px heigth = 20px> ${item.name.official}</li>`;

const informationCountry = item => `<li class="nameList">
<h1><img src="${item.flags.svg}" width = 50px>${item.name.official}</h1>
<p>Capital: ${item.capital}</p>
<p>Population: ${item.population}</p>
<p>Languages: ${Object.values(item.languages)}</p>
</li>`;

function markupConditions(array) {
  if (array.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
    return;
  } else if (array.length >= 2 && array.length <= 10) {
    return array?.reduce((acc, item) => acc + listCountry(item), '');
  } else if (array.length === 1) {
    return array?.reduce((acc, item) => acc + informationCountry(item), '');
  }
}

function renderList(array) {
  refs.list.insertAdjacentHTML('beforeend', markupConditions(array));
}

function clearInput() {
  refs.list.innerHTML = '';
}
