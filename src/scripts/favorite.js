import 'regenerator-runtime/runtime';
import '../styles/main.css';

async function initDB() {
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

document.addEventListener('DOMContentLoaded', async function () {
  // Memindahkan displayFavoriteRestaurants() ke sini

  const db = await initDB();
  const tx = db.transaction('favorites', 'readonly');
  const store = tx.objectStore('favorites');

  const request = store.getAll();

  request.onsuccess = async function (event) {
    const favoriteRestaurants = event.target.result;
    const favoriteList = document.getElementById('favorite-list');

    // Ambil semua data restoran dari API sekali
    const response = await fetch('/data/DATA.json'); // Ganti dengan URL API yang sesuai
    const data = await response.json();

    favoriteRestaurants.forEach((restaurant) => {
      const restaurantData = data.restaurants.find((r) => r.id === restaurant.id);

      if (restaurantData) {
        // Buat elemen gambar
        const img = document.createElement('img');
        img.src = restaurantData.pictureId; // Ganti dengan properti gambar yang sesuai
        img.alt = restaurantData.name; // Ganti dengan properti nama yang sesuai
        img.classList.add('restaurant-image'); // Tambahkan kelas CSS yang sesuai

        // Buat elemen nama restoran
        const name = document.createElement('h3');
        name.textContent = restaurantData.name;
        name.classList.add('restaurant-name'); // Tambahkan kelas CSS yang sesuai

        // Buat elemen untuk menampung gambar dan nama restoran
        const listItem = document.createElement('li');
        listItem.appendChild(img);
        listItem.appendChild(name);
        favoriteList.appendChild(listItem);
      }
    });
  };

  request.onerror = function (event) {
    console.error('Gagal mengambil daftar favorit:', event.target.error);
  };
});
