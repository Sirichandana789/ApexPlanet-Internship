// === script.js ===
// Simplified version using your product array format

const products = [
  { name: "Laptop", category: "electronics", price: 900, rating: 4.5, img: "Ultrabook Laptop.jpg" },
  { name: "T-Shirt", category: "fashion", price: 20, rating: 4.1, img: "Classic Cotton T-Shirt.webp" },
  { name: "Book", category: "books", price: 15, rating: 4.8, img: "Modern JS Handbook.jpg" },
  { name: "Headphones", category: "electronics", price: 50, rating: 4.3, img: "Wireless Headphones.webp" }
];

// === State ===
let cart = {};
const $ = (sel) => document.querySelector(sel);

// === DOM References ===
const productGrid = $("#productGrid");
const searchInput = $("#searchInput");
const categoryFilter = $("#categoryFilter");
const cartBtn = $("#cartBtn");
const cartCount = $("#cartCount");
const cartModal = $("#cartModal");
const cartItemsEl = $("#cartItems");
const cartTotalEl = $("#cartTotal");
const checkoutBtn = $("#checkoutBtn");
const closeCartBtn = $("#closeCartBtn");
const yearEl = $("#year");

// === Init ===
document.addEventListener("DOMContentLoaded", () => {
  yearEl.textContent = new Date().getFullYear();
  loadCart();
  renderProducts(products);
  bindEvents();
  updateCartUI();
});

// === Rendering ===
function renderProducts(list) {
  productGrid.innerHTML = "";
  list.forEach((p, index) => {
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <div class="card-figure">
        <img src="${p.img}" alt="${p.name}" loading="lazy">
      </div>
      <div class="card-body">
        <h3 class="product-title">${p.name}</h3>
        <p>⭐ ${p.rating}</p>
        <div class="row">
          <span class="product-category">${p.category}</span>
          <span class="price">$${p.price}</span>
        </div>
        <div class="row">
          <button class="add-btn" data-index="${index}" aria-label="Add ${p.name} to cart">
            Add to Cart
          </button>
        </div>
      </div>`;
    productGrid.appendChild(card);
  });
}

// === Filtering ===
function applyFilters() {
  const q = searchInput.value.trim().toLowerCase();
  const cat = categoryFilter.value;
  const filtered = products.filter(
    (p) =>
      (p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)) &&
      (cat === "all" || p.category === cat)
  );
  renderProducts(filtered);
}

// === Cart ===
function loadCart() {
  cart = JSON.parse(localStorage.getItem("mini_cart_v1") || "{}");
}
function saveCart() {
  localStorage.setItem("mini_cart_v1", JSON.stringify(cart));
}
function addToCart(index) {
  const key = index.toString();
  cart[key] = (cart[key] || 0) + 1;
  saveCart();
  updateCartUI();
}
function removeFromCart(key) {
  delete cart[key];
  saveCart();
  updateCartUI();
}
function changeQty(key, qty) {
  qty = parseInt(qty);
  if (qty <= 0) return removeFromCart(key);
  cart[key] = qty;
  saveCart();
  updateCartUI();
}
function clearCart() {
  cart = {};
  saveCart();
  updateCartUI();
}
function cartItemsArray() {
  return Object.entries(cart).map(([key, qty]) => ({
    ...products[key],
    key,
    qty,
  }));
}
function cartTotal() {
  return cartItemsArray().reduce((sum, i) => sum + i.price * i.qty, 0);
}
function updateCartUI() {
  const items = cartItemsArray();
  cartCount.textContent = items.reduce((s, i) => s + i.qty, 0);
  cartTotalEl.textContent = cartTotal().toFixed(2);

  cartItemsEl.innerHTML =
    items.length === 0
      ? "<p>Your cart is empty.</p>"
      : items
          .map(
            (i) => `
        <div class="cart-item">
          <img src="${i.img}" alt="${i.name}" loading="lazy">
          <div class="meta">
            <strong>${i.name}</strong>
            <small>$${i.price} × ${i.qty}</small>
          </div>
          <div class="controls">
            <input type="number" min="1" value="${i.qty}" data-key="${i.key}" class="qty-input">
            <button data-remove="${i.key}" class="btn">Remove</button>
          </div>
        </div>`
          )
          .join("");
}

// === Events ===
function bindEvents() {
  searchInput.addEventListener("input", applyFilters);
  categoryFilter.addEventListener("change", applyFilters);

  productGrid.addEventListener("click", (e) => {
    if (e.target.matches(".add-btn")) addToCart(e.target.dataset.index);
  });

  cartItemsEl.addEventListener("input", (e) => {
    if (e.target.matches(".qty-input")) changeQty(e.target.dataset.key, e.target.value);
  });

  cartItemsEl.addEventListener("click", (e) => {
    if (e.target.dataset.remove) removeFromCart(e.target.dataset.remove);
  });

  cartBtn.addEventListener("click", () => (cartModal.showModal ? cartModal.showModal() : (cartModal.style.display = "block")));
  closeCartBtn.addEventListener("click", () => (cartModal.close ? cartModal.close() : (cartModal.style.display = "none")));

  checkoutBtn.addEventListener("click", () => {
    if (cartTotal() === 0) return alert("Cart is empty.");
    alert(`Thank you! Your total is $${cartTotal().toFixed(2)}`);
    clearCart();
    cartModal.close();
  });
}
