
// Function to set the cart data in localStorage
function setCartData(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}
// Function to get the cart data from localStorage
function getCartData() {
  return JSON.parse(localStorage.getItem('cart'));
}
// Cart array to store added items
let cartItems = [];
//function to add to cart
function addToCart(title, price, imageSrc) {
  // get all quantity input elements
  const quantityInputs = document.querySelectorAll('input[type="number"]');

  // update the cartItems array with the current quantities
  cartItems.forEach((item, index) => {
    // get the quantity from the corresponding input element
    let quantity = parseInt(quantityInputs[index].value);
    item.quantity = quantity;
  });
  // checks if the item is already in the cart
  const itemIndex = cartItems.findIndex(item => item.title === title);
  if (itemIndex === -1) {
    // item is not in the cart, add it
    const item = {
      title: title,
      price: price,
      imageSrc: imageSrc,
      quantity: 1 
    };
    cartItems.push(item);
  } else{
    alert("Item has already been added to the cart! ");
  }
  // update the total price
  updateTotalPrice();

  // update the cart display and count
  updateCart();
  updateCartCount();

  // show the quantity field
  document.querySelector('input[type="number"]').style.display = 'block';
  // Add event listener to quantity input elements
  quantityInputs.forEach((input, index) => {
    input.addEventListener('change', () => {
      const newQuantity = parseInt(input.value);
      cartItems[index].quantity = newQuantity;
      updateTotalPrice();

        // Save the cart data to localStorage
  setCartData(cartItems);
    });
  });
}
// Function to display the cart
function showCart() {
  const cart = document.querySelector('.cart');
  cart.style.display = 'block';

  // Update cart count
  const countSpan = document.querySelector('#cart-count');
  countSpan.textContent = cartItems.length;
}
// Function to load the cart data from localStorage
window.onload = function() {
  const cart = document.querySelector('.cart');
  cart.style.display = 'none';
 // hide the quantity field by default
 document.querySelector('input[type="number"]').style.display = 'none';

// Load the cart data from localStorage
const savedCartItems = getCartData();
if (savedCartItems) {
  cartItems = savedCartItems;
  updateCart();
  updateCartCount();
  updateEmptyCartMessage();
  updateOrderButtonVisibility();
}  else{
  updateEmptyCartMessage();
}
};
// Get the cart count element
const cartCountElement = document.querySelector('#cart-count');

//function to update cart count
function updateCartCount() {
  var cartCountElement = document.getElementById("cart-count");
  cartCountElement.textContent = cartItems.length;
  
  // Call the function to update the order button visibility
  updateOrderButtonVisibility();
}
// Function to update the order button visibility
function updateOrderButtonVisibility() {
  var orderButton = document.getElementById("order-button");

  if (cartItems.length > 0) {
    orderButton.style.display = "block";
  } else {
  orderButton.style.display = "none";
  }
}
// Function to update the empty cart message
function updateEmptyCartMessage() {
  const emptyCartMessage = document.getElementById('empty-cart-message');
  if (cartItems.length === 0) {
    emptyCartMessage.style.display = 'block';
  } else {
    emptyCartMessage.style.display = 'none';
  }
}
// Function to update the cart content
function updateCart() {
  const cartContent = document.querySelector('.cart-content');

// Clear the cart content
  cartContent.innerHTML = '';
  // Loop through each cart item and display it in the cart
  cartItems.forEach(item => {
    const cartBox = document.createElement('div');
    cartBox.classList.add('cart-box');

    const cartImg = document.createElement('img');
    cartImg.src = item.imageSrc;
    cartImg.alt = 'Product Image';
    cartImg.classList.add('cart-img');

    // create a new input element with type="number"
    const quantityInput = document.createElement('input');
    quantityInput.type = 'number';
    quantityInput.value = item.quantity || 1;
    quantityInput.min = 1;
    quantityInput.max = 10;

    // update the quantity and total price when the quantity changes
    quantityInput.addEventListener('change', function() {
      const newQuantity = parseInt(quantityInput.value);
      item.quantity = newQuantity;
      updateTotalPrice();
      // Save the cart data to localStorage
      setCartData(cartItems);
    });

    const detailBox = document.createElement('div');
    detailBox.classList.add('detail-box');

    const productTitle = document.createElement('div');
    productTitle.classList.add('cart-product-title');
    productTitle.textContent = item.title;

    const productPrice = document.createElement('div');
    productPrice.classList.add('cart-price');
    productPrice.textContent = '$' + item.price;

    detailBox.appendChild(productTitle);
    detailBox.appendChild(productPrice);

    const trashIcon = document.createElement('i');
    trashIcon.classList.add('bx', 'bxs-trash', 'custom-trash-icon');
    trashIcon.addEventListener('click', () => removeItemFromCart(item));

    cartBox.appendChild(cartImg);
    cartBox.appendChild(quantityInput);
    cartBox.appendChild(detailBox);
    cartBox.appendChild(trashIcon);

    cartContent.appendChild(cartBox);
  });

// Update the total price
  updateTotalPrice();
}

// Function to remove an item from the cart
function removeItemFromCart(item) {
  const itemIndex = cartItems.indexOf(item);
  cartItems.splice(itemIndex, 1);
  updateCart();
  updateCartCount();
  updateEmptyCartMessage();
  // Save the cart data to localStorage
setCartData(cartItems);

}
// Function to update the total price
function updateTotalPrice() {
  let total = 0;

  // Loop through all cart items and calculate the total price
  cartItems.forEach((item) => {
    // get the quantity from the item object
    let quantity = item.quantity;
    if (isNaN(quantity) || quantity === undefined) {
      quantity = 1;
    }

    // calculate the total price based on the quantity and item price
    total += (quantity * item.price);
  });

  const totalPriceElement = document.querySelector('.total-price');
  totalPriceElement.textContent = '$' + total.toFixed(2);
}
// Select all elements with the class 'add-cart'
const addCartIcons = document.querySelectorAll('.add-cart');
addCartIcons.forEach(icon => {
  icon.addEventListener('click', () => {
    const productBox = icon.closest('.product-box');
    const titleElement = productBox.querySelector('.product-title');
    const priceElement = productBox.querySelector('.price');
    const imageElement = productBox.querySelector('.product-img');

    const title = titleElement.textContent;
    const price = parseFloat(priceElement.textContent.replace('$', ''));
    const imageSrc = imageElement.src;
    // Call the addToCart function with the extracted values
    addToCart(title, price, imageSrc);
  });
});

// This code closes the cart
window.addEventListener('DOMContentLoaded', function() {
  var closeCartIcon = document.getElementById('close-cart');
  var cart = document.querySelector('.cart');

  closeCartIcon.addEventListener('click', function() {
    cart.style.display = 'none';
  });
});

// closes the contact details form
window.addEventListener('DOMContentLoaded', function() {
  var closeSection = document.getElementById('close-form');
  var contactSection = document.getElementById('contact-info');

  closeSection.addEventListener('click', function() {
    contactSection.style.display = 'none';
  });
});

// Function to show the contact info section
function showContactInfo() {
  var contactSection = document.getElementById('contact-info');
  contactSection.style.display = 'block';
}
// Function to show the payment section
function showPaymentSection() {
  // Get all the required input elements
  const nameInput = document.getElementById('fname');
  const emailInput = document.getElementById('email');
  const addressInput = document.getElementById('adr');
  const cityInput = document.getElementById('city');
  const phoneInput = document.getElementById('phone');
  const countryInput = document.getElementById('country');
  const zipInput = document.getElementById('zip');

  // Check if all the required fields are filled in
  if (
    !nameInput.value ||
    !emailInput.value ||
    !addressInput.value ||
    !cityInput.value ||
    !phoneInput.value ||
    !countryInput.value ||
    !zipInput.value
  ) {
    alert('Please fill in all the required fields in the billing address section');
    return;
  }

  // If all the required fields are filled in, show the payment section
  document.getElementById('contact-info').style.display = 'none';
  document.getElementById('payment-info').style.display = 'block';
}
// Function to validate payment information before submitting the form
function validatePaymentInformation(event) {
  const cardNameInput = document.getElementById('cname');
  const cardNumberInput = document.getElementById('ccnum');
  const expMonthInput = document.getElementById('expmonth');
  const expYearInput = document.getElementById('expyear');
  const cvvInput = document.getElementById('cvv');

  if (
    !cardNameInput.value ||
    !cardNumberInput.value ||
    !expMonthInput.value ||
    !expYearInput.value ||
    !cvvInput.value
  ) {
    alert('Please fill in all the required fields in the payment information section');
    event.stopPropagation(); // Prevent event propagation
    return false; // Prevent form submission
  }
  alert('You have successfully placed an order! You will soon receive a confirmation email');
  // All required fields are filled in, allow form submission
  return true;
}
// Event listener for the place order button
const placeOrderButton = document.querySelector('#payment-info input[type="submit"]');
placeOrderButton.addEventListener('click', validatePaymentInformation);










