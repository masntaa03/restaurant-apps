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
    <a class="button" href="detail.html?id=${restaurant.id}">Klik Detailnya</a>
  `;

  const pictureElement = restaurantBox.querySelector('img');
  const modalElement = document.getElementById('modal');
  const modalNameElement = document.getElementById('modal-name');
  const modalRatingElement = document.getElementById('modal-rating');
  const modalCityElement = document.getElementById('modal-city');
  const modalDescriptionElement = document.getElementById('modal-description');
  const closeButtonElement = document.querySelector('.close-button');
  const modalImageElement = document.getElementById('modal-image');

  // Event listener untuk membuka modal saat gambar di klik
  pictureElement.addEventListener('click', () => {
      modalNameElement.textContent = restaurant.name;
      modalRatingElement.textContent = restaurant.rating;
      modalCityElement.textContent = `Kota: ${restaurant.city}`;
      modalDescriptionElement.textContent= restaurant.description;
      modalImageElement.src = restaurant.pictureId;
      modalImageElement.alt = restaurant.name;
      modalElement.style.display = 'block';
  });

  // Event listener untuk menutup modal saat tombol close diklik
  closeButtonElement.addEventListener('click', () => {
      modalElement.style.display = 'none';
  });

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

hamburgerButtonElement.addEventListener('click', event => {
  drawerElement.classList.toggle('open');
  event.stopPropagation();
});

mainElement.addEventListener('click', event => {
  drawerElement.classList.remove('open');
  event.stopPropagation();
})

window.addEventListener('click', (event) => {
  const modalElement = document.getElementById('modal');
  if (event.target === modalElement) {
      modalElement.style.display = 'none';
  }
});






  
  






  