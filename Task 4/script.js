// ===== To-Do List =====
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function displayTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.innerHTML = `${task} <button onclick="deleteTask(${index})">❌</button>`;
    list.appendChild(li);
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  const input = document.getElementById("taskInput");
  if (input.value.trim() !== "") {
    tasks.push(input.value.trim());
    input.value = "";
    displayTasks();
  }
}

function deleteTask(index) {
  tasks.splice(index, 1);
  displayTasks();
}

displayTasks();

// ===== Product Listing =====
const products = [
  { name: "Laptop", category: "electronics", price: 900, rating: 4.5, img: "laptop.jpg" },
  { name: "T-Shirt", category: "fashion", price: 20, rating: 4.1, img: "tshirt.jpeg" },
  { name: "Book", category: "books", price: 15, rating: 4.8, img: "book.jpg" },
  { name: "Headphones", category: "electronics", price: 50, rating: 4.3, img: "headphones.webp" },
];

function renderProducts(items) {
  const grid = document.getElementById("productGrid");
  grid.innerHTML = "";
  items.forEach(item => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${item.img}" alt="${item.name}">
      <h3>${item.name}</h3>
      <p>Price: $${item.price}</p>
      <p>⭐ ${item.rating}</p>
    `;
    grid.appendChild(card);
  });
}

function filterProducts() {
  const category = document.getElementById("categoryFilter").value;
  const filtered = category === "all" ? products : products.filter(p => p.category === category);
  renderProducts(filtered);
}

function sortProducts() {
  const sortType = document.getElementById("sortOptions").value;
  let sorted = [...products];
  if (sortType === "price") sorted.sort((a, b) => a.price - b.price);
  if (sortType === "rating") sorted.sort((a, b) => b.rating - a.rating);
  renderProducts(sorted);
}

// Initial Load
renderProducts(products);
