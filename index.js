port = 3000;

const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

// ---------------------------------------------------------- //
//    Project on BD 2: FlipDeal Shopping Cart Operations      //
// ---------------------------------------------------------- //

// ----------------- DATA ----------------- //
let cart = [
  { productId: 1, name: 'Laptop', price: 50000, quantity: 1 },
  { productId: 2, name: 'Mobile', price: 20000, quantity: 2 },
];

// --------------- Welcome Page --------------- //

app.get('/', (req, res) => {
  res.send('Welcome to FlipDeal Shopping Cart Operations');
});

// Endpoint - 1 (Add an Item to the Cart)

function addItem(productId, name, price, quantity) {
  for (let i = 0; i < cart.length; ++i) {
    if (cart[i].productId === productId) {
      return cart;
    }
  }
  let item = {
    productId: productId,
    name: name,
    price: price,
    quantity: quantity,
  };
  cart.push(item);
  return cart;
}

app.get('/cart/add', (req, res) => {
  let productId = parseInt(req.query.productId);
  let name = req.query.name;
  let price = parseFloat(req.query.price);
  let quantity = parseInt(req.query.quantity);

  let result = addItem(productId, name, price, quantity);
  res.json({ cart: result });
});

// Path = /cart/add?productId=3&name=Tablet&price=15000&quantity=1

// Endpoint - 2 (Edit Quantity of an Item in the Cart)

function editItemQuantity(productId, quantity) {
  for (let i = 0; i < cart.length; ++i) {
    if (cart[i].productId === productId) {
      cart[i].quantity = quantity;
      return cart;
    }
  }
  return cart;
}
app.get('/cart/edit', (req, res) => {
  let productId = parseInt(req.query.productId);
  let quantity = parseInt(req.query.quantity);

  let result = editItemQuantity(productId, quantity);
  res.json({ cart: result });
});

// Path = /cart/edit?productId=2&quantity=3

// Endpoint - 3 (Delete an Item from the Cart)

function deleteItem(productId) {
  for (let i = 0; i < cart.length; ++i) {
    if (cart[i].productId === productId) {
      cart.splice(i, 1);
      return cart;
    }
  }
  return cart;
}

app.get('/cart/delete', (req, res) => {
  let productId = parseInt(req.query.productId);
  let result = deleteItem(productId);
  res.json({ cart: result });
});

// Path = /cart/delete?productId=1

// Endpoint - 4 (Read Items in the Cart)

app.get('/cart', (req, res) => {
  res.json({ cart: cart });
});

// Path = /cart

// Endpoint - 5 (Calculate Total Quantity of Items in the Cart)

function calculateTotalQuantity() {
  let totalQuantity = 0;
  for (let i = 0; i < cart.length; ++i) {
    totalQuantity += cart[i].quantity;
  }
  return totalQuantity;
}

app.get('/cart/total-quantity', (req, res) => {
  let result = calculateTotalQuantity();
  res.json({ cart: result });
});

// Path = /cart/total-quantity

// Endpoint - 6 (Calculate Total Price of Items in the Cart)

function calculateTotalPrice() {
  let totalPrice = 0;
  for (let i = 0; i < cart.length; ++i) {
    totalPrice += cart[i].price;
  }
  return totalPrice;
}

app.get('/cart/total-price', (req, res) => {
  let result = calculateTotalPrice();
  res.json({ cart: result });
});

// Path = /cart/total-price

// ----------------- LISTENING ----------------- //
app.listen(port, () => {
  console.log(`App is listening at http://localhost:${port}`);
});
