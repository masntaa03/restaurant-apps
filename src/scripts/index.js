import 'regenerator-runtime';
import '../styles/main.css';

const restaurantList = document.querySelector('.restaurant-list');

function addRestaurantToDOM(restaurant) {
  const restaurantBox = document.createElement('div');
  restaurantBox.classList.add('restaurant-box');

  restaurantBox.innerHTML = `
    <div class="city">${restaurant.city}</div>
    <img src="${restaurant.pictureId}" alt="${restaurant.name}">
    <div class="rating">Rating: ${restaurant.rating}</div>
    <h1>${restaurant.name}</h1>
    <p>${restaurant.description}</p>
    <a href="detail.html?id=${restaurant.id}">Lihat Detail</a>
  `;

  restaurantList.appendChild(restaurantBox);
}

async function fetchDataAndDisplay() {
  try {
    const response = await fetch('/data/DATA.json');
    const data = await response.json();
    const restaurants = data.restaurants;

    restaurants.forEach((restaurant) => {
      addRestaurantToDOM(restaurant);
    });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

fetchDataAndDisplay();

console.log('Hello Coders! :)');

const hamburgerButtonElement = document.querySelector('#hamburger');
const drawerElement = document.querySelector('#drawer');
const mainElement = document.querySelector('main');

hamburgerButtonElement.addEventListener('click', (event) => {
  drawerElement.classList.toggle('open');
  event.stopPropagation();
});

mainElement.addEventListener('click', (event) => {
  drawerElement.classList.remove('open');
  event.stopPropagation();
});
