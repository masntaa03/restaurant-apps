// import 'regenerator-runtime'; 
// import '../styles/main.css';

// function displayRestaurantDetail(restaurant) {
//   const modalNameElement = document.getElementById('modal-name');
//   const modalRatingElement = document.getElementById('modal-rating');
//   const modalCityElement = document.getElementById('modal-city');
//   const modalDescriptionElement = document.getElementById('modal-description');
//   const modalImageElement = document.getElementById('modal-image');
//   const foodMenu = document.getElementById('food-menu');
//   const drinkMenu = document.getElementById('drink-menu');
//   const customerReviews = document.getElementById('customer-reviews');
    
//     modalNameElement.textContent = restaurant.name;
//     modalRatingElement.textContent = `Rating: ${restaurant.rating}`;
//     modalCityElement.textContent = `Kota: ${restaurant.city}`;
//     modalDescriptionElement.textContent = restaurant.description;
//     modalImageElement.src = restaurant.pictureId;
//     modalImageElement.alt = restaurant.name;

//     foodMenu.innerHTML = '';
//     drinkMenu.innerHTML = '';
//     customerReviews.innerHTML = '';

//     restaurant.menus.foods.forEach(food => {
//         const foodItem = document.createElement('li');
//         foodItem.textContent = food.name;
//         foodMenu.appendChild(foodItem);
//     });

//     restaurant.menus.drinks.forEach(drink => {
//         const drinkItem = document.createElement('li');
//         drinkItem.textContent = drink.name;
//         drinkMenu.appendChild(drinkItem);
//     });

//     restaurant.customerReviews.forEach(review => {
//         const reviewItem = document.createElement('li');
//         reviewItem.innerHTML = `<strong>${review.name}</strong> (${review.date}): ${review.review}`;
//         customerReviews.appendChild(reviewItem);
//     });
// }

// // Fetch and display restaurant data
// async function fetchDataAndDisplay() {
//     try {
//         const response = await fetch('/data/DATA.json');
//         const data = await response.json();
//         const restaurants = data.restaurants;
  
//         const urlParams = new URLSearchParams(window.location.search);
//         const restaurantId = urlParams.get('id');
  
//         if (restaurantId) {
//             const selectedRestaurant = restaurants.find(restaurant => restaurant.id === restaurantId);
//             if (selectedRestaurant) {
//                 displayRestaurantDetail(selectedRestaurant);
//             } else {
//                 console.error('Restaurant not found.');
//             }
//         } else {
//             console.error('Restaurant ID not provided.');
//         }
//     } catch (error) {
//         console.error('Error fetching data:', error);
//     }
//   }
  
//   fetchDataAndDisplay();
