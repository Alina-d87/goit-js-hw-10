export function fetchCountries(name) {
  const BASE_URL = `https://restcountries.com/v3.1`;
  const urlName = `${BASE_URL}/name/${name}?`;

  return fetch(urlName)
    .then(response => {
      return response.json();
    })
    .catch(reject => {
      if (response.status === 404) {
        return reject('Error 404');
      }
    });
}
