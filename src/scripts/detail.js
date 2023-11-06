import 'regenerator-runtime/runtime';
import '../styles/main.css';


document.addEventListener('DOMContentLoaded', async function () {
  const urlParams = new URLSearchParams(window.location.search);
  const restaurantId = urlParams.get('id');
  const restaurantDetail = new RestaurantDetail();
  restaurantDetail.fetchDataAndDisplay(restaurantId);
});

class RestaurantDetail {
  constructor() {
    this.restaurantId = null; 
    this.restaurantNameElement = document.getElementById('restaurant-name');
    this.restaurantImageElement = document.getElementById('restaurant-image');
    this.restaurantCityElement = document.getElementById('restaurant-city');
    this.restaurantDescriptionElement = document.getElementById('restaurant-description');
    this.foodMenuElement = document.getElementById('food-menu');
    this.drinkMenuElement = document.getElementById('drink-menu');
    this.reviewsElement = document.getElementById('reviews');
    this.likeButton = document.getElementById('likeButton');
    this.isFavorite = false;
    this.init();
  }

  async fetchDataAndDisplay(restaurantId) {
    try {
      const response = await fetch('/data/DATA.json');
      const data = await response.json();
      const restaurant = data.restaurants.find((r) => r.id === restaurantId);

      if (!restaurant) {
        console.error('Restaurant not found');
        return;
      }

      this.displayRestaurantDetail(restaurant);
    } catch (error) {
      console.error('Error fetching restaurant details:', error);
    }
  }

  displayRestaurantDetail(restaurant) {
    this.restaurantId = restaurant.id; // Simpan restaurantId
    this.restaurantNameElement.textContent = restaurant.name;
    this.restaurantImageElement.src = restaurant.pictureId;
    this.restaurantImageElement.alt = restaurant.name;
    this.restaurantCityElement.textContent = `Kota: ${restaurant.city}`;
    this.restaurantDescriptionElement.textContent = restaurant.description;

    const foodList = restaurant.menus.foods.map((food) => `<li>${food.name}</li>`).join('');
    this.foodMenuElement.innerHTML = foodList;

    const drinkList = restaurant.menus.drinks.map((drink) => `<li>${drink.name}</li>`).join('');
    this.drinkMenuElement.innerHTML = drinkList;

    const reviewsList = restaurant.customerReviews
      .map((review) => `
        <li>
          <p class="customer-name">${review.name}</p>
          <p class="customer-review">${review.review}</p>
          <p class="review-date">${review.date}</p>
        </li>
      `)
      .join('');
    this.reviewsElement.innerHTML = reviewsList;

    this.isRestaurantFavorite(this.restaurantId) // Menggunakan restaurantId yang benar
      .then((result) => {
        this.isFavorite = result;
        this.updateLikeButton();
      })
      .catch((error) => {
        console.error('Error checking restaurant favorite:', error);
      });
  }

  init() {
    const urlParams = new URLSearchParams(window.location.search);
    const restaurantId = urlParams.get('id');
    this.fetchDataAndDisplay(restaurantId);
  
    if (this.likeButton) {
      this.likeButton.addEventListener('click', () => {
        this.toggleFavorite();
      });
    } else {
      console.error("Element 'likeButton' not found");
    }
  }

  toggleFavorite() {
    if (this.isFavorite) {
      this.removeRestaurantFromFavorite(this.restaurantId) // Menggunakan restaurantId yang benar
        .then(() => {
          this.isFavorite = false;
          this.updateLikeButton();
        })
        .catch((error) => {
          console.error('Error removing restaurant from favorites:', error);
        });
    } else {
      this.addRestaurantToFavorite(this.restaurantId) // Menggunakan restaurantId yang benar
        .then(() => {
          this.isFavorite = true;
          this.updateLikeButton();
        })
        .catch((error) => {
          console.error('Error adding restaurant to favorites:', error);
        });
    }
  }
  
  updateLikeButton() {
    if (this.isFavorite) {
      this.likeButton.innerHTML = '<i class="fa fa-heart" aria-hidden="true"></i>';
      this.likeButton.style.color = 'white'; // Mengubah warna ikon menjadi merah
    } else {
      this.likeButton.innerHTML = '<i class="fa fa-heart-o" aria-hidden="true"></i>';
      this.likeButton.style.color = ''; // Menghapus warna ikon jika sebelumnya ditambahkan
    }
  }

  async initDB() {
    return new Promise((resolve, reject) => {
      const openDBRequest = indexedDB.open('restaurantDatabase', 1);

      openDBRequest.onupgradeneeded = function (event) {
        const db = event.target.result;

        if (!db.objectStoreNames.contains('favorites')) {
          db.createObjectStore('favorites', { keyPath: 'id' });
        }
      };

      openDBRequest.onsuccess = function (event) {
        const db = event.target.result;
        resolve(db);
      };

      openDBRequest.onerror = function (event) {
        reject(event.target.error);
      };
    });
  }

  async isRestaurantFavorite(restaurantId) {
    const db = await this.initDB();
  
    return new Promise((resolve, reject) => {
      const tx = db.transaction('favorites', 'readonly');
      const store = tx.objectStore('favorites');
  
      const request = store.get(restaurantId);
  
      request.onsuccess = function (event) {
        const result = request.result;
        if (result !== undefined) {
          resolve(true);
        } else {
          resolve(false);
        }
      };
  
      request.onerror = function (event) {
        reject(event.target.error);
      };
    });
  }

  async addRestaurantToFavorite(restaurantId) {
    const db = await this.initDB();
  
    return new Promise((resolve, reject) => {
      const tx = db.transaction('favorites', 'readwrite');
      const store = tx.objectStore('favorites');
  
      const request = store.put({ id: restaurantId }); // Menggunakan put untuk memperbarui atau menambahkan
  
      tx.oncomplete = function () {
        resolve();
      };
  
      tx.onerror = function (event) {
        reject(event.target.error);
      };
    });
  }

  async removeRestaurantFromFavorite(restaurantId) {
    const db = await this.initDB();
  
    return new Promise((resolve, reject) => {
      const tx = db.transaction('favorites', 'readwrite');
      const store = tx.objectStore('favorites');
  
      store.delete(restaurantId);
  
      tx.oncomplete = function () {
        resolve();
      };
  
      tx.onerror = function (event) {
        reject(event.target.error);
      };
    });
  }
}

const urlParams = new URLSearchParams(window.location.search);
const restaurantId = urlParams.get('id');
const restaurantDetail = new RestaurantDetail();
