// Datos de productos (podés extender este array)
const products = [
  {
    id: "cooler-45",
    name: "Conservadora Sur 45L",
    price: 185000
  },
  {
    id: "softcooler-20",
    name: "Bolso Térmico Trek 20",
    price: 96500
  },
  {
    id: "bottle-1l",
    name: "Botella Térmica Andes 1L",
    price: 52900
  },
  {
    id: "tent-3p",
    name: "Carpa Sur Patagónico 3P",
    price: 245000
  }
];

let cart = [];

document.addEventListener("DOMContentLoaded", () => {
  /* ---------- BOTONES AGREGAR AL CARRITO ---------- */
  const addButtons = document.querySelectorAll(".btn-add-cart");
  addButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".product-card");
      const id = card.dataset.id;
      addToCart(id);
    });
  });

  /* ---------- PANEL CARRITO ---------- */
  const cartToggleBtn = document.querySelector(".cart-toggle");
  const cartPanel = document.querySelector(".cart-panel");
  const cartCloseBtn = document.querySelector(".cart-panel__close");
  const cartBackdrop = document.querySelector(".cart-backdrop");

  const openCart = () => {
    cartPanel.classList.add("cart-panel--open");
    cartBackdrop.classList.add("cart-backdrop--visible");
  };

  const closeCart = () => {
    cartPanel.classList.remove("cart-panel--open");
    cartBackdrop.classList.remove("cart-backdrop--visible");
  };

  cartToggleBtn.addEventListener("click", openCart);
  cartCloseBtn.addEventListener("click", closeCart);
  cartBackdrop.addEventListener("click", closeCart);

  /* ---------- NAV MOBILE (HAMBURGUESA) ---------- */
  const hamburger = document.querySelector(".hamburger");
  const mobileNav = document.querySelector(".mobile-nav");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("is-active");
    mobileNav.classList.toggle("mobile-nav--open");
  });

  // Cerrar menú mobile al hacer click en un link
  mobileNav.addEventListener("click", e => {
    if (e.target.classList.contains("mobile-nav__link")) {
      hamburger.classList.remove("is-active");
      mobileNav.classList.remove("mobile-nav--open");
    }
  });
});

/* ================= FUNCIONES CARRITO ================= */

function addToCart(id) {
  const product = products.find(p => p.id === id);
  if (!product) return;

  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  renderCart();
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  renderCart();
}

function formatPrice(num) {
  return num.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0
  });
}

function renderCart() {
  const container = document.querySelector(".cart-items");
  const totalSpan = document.querySelector(".cart-total");
  const countSpan = document.querySelector(".cart-count");

  container.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML = `<p style="font-size:0.9rem; color:#6b7280;">Tu carrito está vacío.</p>`;
    totalSpan.textContent = "$0";
    countSpan.textContent = "0";
    return;
  }

  let total = 0;
  let count = 0;

  cart.forEach(item => {
    const itemTotal = item.price * item.qty;
    total += itemTotal;
    count += item.qty;

    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <div class="cart-item__info">
        <span class="cart-item__name">${item.name}</span>
        <span class="cart-item__meta">${item.qty} x ${formatPrice(item.price)}</span>
      </div>
      <div>
        <span style="font-weight:500; font-size:0.9rem;">${formatPrice(itemTotal)}</span><br/>
        <button class="cart-item__remove" data-id="${item.id}">Quitar</button>
      </div>
    `;
    container.appendChild(div);
  });

  // Eventos de quitar
  container.querySelectorAll(".cart-item__remove").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      removeFromCart(id);
    });
  });

  totalSpan.textContent = formatPrice(total);
  countSpan.textContent = count.toString();
}
