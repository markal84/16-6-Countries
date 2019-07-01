'use strict';

var url = 'https://restcountries.eu/rest/v2/name/'; // if not working change v2 back to v1
var countriesList = document.getElementById('countries');

var search = document.getElementById('search'); // search a country button
var searchInput = document.getElementById('country-name'); // serach input text area

search.addEventListener('click', searchCountries); // after click search button start searchCountries function

function searchCountries() {
    var countryName = searchInput.value;
    if(!countryName.length) countryName = 'Poland'; // if text are is empty set Poland by default
    fetch(url + countryName)
        .then(function(resp) {
            return resp.json();
        })
        .then(showCountriesList);
}

function showCountriesList(resp) {
    countriesList.innerHTML = '';
    resp.forEach(function(item) {
        var liEl = document.createElement('li');
        liEl.innerText = 'Searched country: '
        liEl.innerText += item.name +
        ', Capital name: ' + item.capital;
        countriesList.appendChild(liEl);
    });
  }