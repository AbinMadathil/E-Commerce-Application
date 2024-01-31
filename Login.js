const STORAGE_KEY = {
  USERS: 'users',
  PRODUCTS: 'products',
};

class User {
  constructor(name, email, password) {
      this.name = name;
      this.email = email;
      this.password = password;
  }

  static allUsers() {
      return JSON.parse(localStorage.getItem([STORAGE_KEY['USERS']]));
  }

  static addUser(newUser) {
      const existing = User.allUsers();
      localStorage.setItem(
          STORAGE_KEY['USERS'],
          JSON.stringify([...existing, newUser])
      );
  }

  static getUser(email) {
      return User.allUsers().find((user) => user.email === email);
  }

  static setCurrentUser(user) {
      localStorage.setItem('currentUser', user.email);
  }

  static getCurrentUser() {
      return User.getUser(localStorage.getItem('currentUser'));
  }
}

class Product {
  constructor(id ,name, price, category,details) {
    this.id = id;
      this.name = name;
      this.price = price;
      this.category = category;
      this.details=details;
  }

  static allProducts(){
    return JSON.parse(localStorage.getItem([STORAGE_KEY['PRODUCTS']]));
  }

  static addProduct(newProduct) {
    const existing = Product.allProducts();
    localStorage.setItem(
        STORAGE_KEY['PRODUCTS'],
        JSON.stringify([...existing, newProduct])
    );
}

  
}

function seedData() {
  if (localStorage.getItem('seeded') === 'true') {
    return;
  }
  localStorage.setItem('seeded', 'true');

  const users = [new User('admin', 'admin@shop.com', 'pass')];
  localStorage.setItem(STORAGE_KEY['USERS'], JSON.stringify(users));

  const products = [
    new Product(1,"Quality Men's Hoodie", 74.99, "Fashion", "Lorem ipsum dolor sit amet, consectetur adipiscing elit."),
    new Product(2,"Product Name 2", 29.99, "Electronics", "Description of the product. Lorem ipsum dolor sit amet, consectetur adipiscing elit."),
    new Product(3,"Quality Men's Beanie", 74.99, "Fashion", "Lorem ipsum dolor sit amet, consectetur adipiscing elit."),
    new Product(4,"Quality Men's Jeans", 800, "Fashion", "Lorem ipsum dolor sit amet, consectetur adipiscing elit."),
    new Product(5,"Quality Men's Shirt", 800, "Fashion", "Lorem ipsum dolor sit amet, consectetur adipiscing elit."),
    new Product(6,"Shirt 2", 800, "Fashion", "Lorem ipsum dolor sit amet, consectetur adipiscing elit.")
  
  
  ];

  localStorage.setItem(STORAGE_KEY['PRODUCTS'], JSON.stringify(products));
}

function loginHandler(clickEvent) {
  clickEvent.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  console.log(email);
  console.log(password);
  const user = User.getUser(email);
  if (!user || user.password !== password) {
      document.getElementById('error').style.display = 'inline';
      return;
  }
  console.log(User.allUsers());
  User.setCurrentUser(user);
  alert("all info correct");
  window.location.replace('./Details.html');
}

function signupHandler(clickEvent) {
  clickEvent.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const cnfPassword = document.getElementById('confirm-password').value;
  

  console.log({ name, email, password, cnfPassword });
  const errorSpan = document.getElementById('err');
  if (password !== cnfPassword) {
      errorSpan.innerText = 'Passwords do not match!';
      errorSpan.style.display = 'inline';
      return;
  }

  if (User.getUser(email)) {
      errorSpan.innerText = 'User exists!';
      errorSpan.style.display = 'inline';
      return;
  }

  User.addUser(new User(name, email, password));
  alert('Signup successful!');
  window.location.replace('./Login.html');
}

seedData();

const loginBtn = document.getElementById('login-submit');
loginBtn?.addEventListener('click', loginHandler);

const existing=User.allUsers();
console.log(existing);

const signupBtn = document.getElementById('signup-submit');
signupBtn?.addEventListener('click', signupHandler);




//controlling the product page

// function renderProducts(products) {
//   console.log('test');
//   const container = document.getElementById('product-container');

//   // Clear previous content in the container
//   container.innerHTML = '';

//   products.forEach(product => {
//     const productCard = document.createElement('div');
//     productCard.classList.add('product-card', 'zoom');

//     // Create HTML content for the product card
//     productCard.innerHTML = `
//       <img src="https://random.imagecdn.app/v1/image?width=500&height=150" alt="${product.name}">
//       <h2>${product.name}</h2>
//       <p>${product.details}</p>
//       <p>Price: $${product.price}</p>
//       <a href="product-details.html">View Details</a>
//     `;

//     // Append the product card to the container
//     container.appendChild(productCard);
//   });
// }
// const products = Product.allProducts();
// renderProducts(products);

