// Número da unidade (formato internacional, sem símbolos) — trocar pelo WhatsApp real da franquia.
const UNIT_WHATSAPP_NUMBER = '5511940028922';

const PRODUCTS = [
  {
    id: 'ant-original-350',
    brand: 'antarctica',
    brandLabel: 'Antarctica',
    name: 'Antarctica Original',
    desc: 'Pack c/ 12 latas 350ml',
    price: 44.9,
    icon: '🧊',
  },
  {
    id: 'ant-subzero-350',
    brand: 'antarctica',
    brandLabel: 'Antarctica',
    name: 'Antarctica Sub Zero',
    desc: 'Pack c/ 12 latas 350ml',
    price: 47.9,
    icon: '❄️',
  },
  {
    id: 'ant-original-600',
    brand: 'antarctica',
    brandLabel: 'Antarctica',
    name: 'Antarctica Original',
    desc: 'Garrafa long neck 600ml',
    price: 9.9,
    icon: '🍾',
  },
  {
    id: 'skol-lata-350',
    brand: 'skol',
    brandLabel: 'Skol',
    name: 'Skol Pilsen',
    desc: 'Pack c/ 12 latas 350ml',
    price: 42.9,
    icon: '🥫',
  },
  {
    id: 'skol-puromalte-350',
    brand: 'skol',
    brandLabel: 'Skol',
    name: 'Skol Puro Malte',
    desc: 'Pack c/ 12 latas 350ml',
    price: 45.9,
    icon: '🍺',
  },
  {
    id: 'skol-beats-269',
    brand: 'skol',
    brandLabel: 'Skol',
    name: 'Skol Beats Senses',
    desc: 'Pack c/ 8 latas 269ml',
    price: 34.9,
    icon: '✨',
  },
  {
    id: 'brahma-duplomalte-350',
    brand: 'brahma',
    brandLabel: 'Brahma',
    name: 'Brahma Duplo Malte',
    desc: 'Pack c/ 12 latas 350ml',
    price: 46.9,
    icon: '🍻',
  },
  {
    id: 'brahma-chopp-473',
    brand: 'brahma',
    brandLabel: 'Brahma',
    name: 'Brahma Chopp',
    desc: 'Pack c/ 8 latas 473ml',
    price: 39.9,
    icon: '🍺',
  },
  {
    id: 'brahma-zero-350',
    brand: 'brahma',
    brandLabel: 'Brahma',
    name: 'Brahma Zero Álcool',
    desc: 'Pack c/ 12 latas 350ml',
    price: 43.9,
    icon: '🚫',
  },
];

const state = {
  quantities: Object.fromEntries(PRODUCTS.map((p) => [p.id, 0])),
  cart: {}, // { productId: quantity }
  filter: 'todos',
};

const el = {
  grid: document.getElementById('productGrid'),
  filters: document.getElementById('filters'),
  cartBtn: document.getElementById('cartBtn'),
  cartCount: document.getElementById('cartCount'),
  cart: document.getElementById('cart'),
  cartOverlay: document.getElementById('cartOverlay'),
  cartClose: document.getElementById('cartClose'),
  cartItems: document.getElementById('cartItems'),
  cartEmpty: document.getElementById('cartEmpty'),
  cartTotal: document.getElementById('cartTotal'),
  checkoutForm: document.getElementById('checkoutForm'),
  floatingWhatsapp: document.getElementById('floatingWhatsapp'),
  whatsappContact: document.getElementById('whatsappContact'),
};

function formatBRL(value) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function renderProducts() {
  const visible = PRODUCTS.filter((p) => state.filter === 'todos' || p.brand === state.filter);

  el.grid.innerHTML = visible
    .map((p) => {
      const qty = state.quantities[p.id];
      return `
        <article class="product-card" data-id="${p.id}">
          <div class="product-card__top">
            <span class="product-card__tag tag--${p.brand}">${p.brandLabel}</span>
          </div>
          <div class="product-card__visual visual--${p.brand}">${p.icon}</div>
          <h3>${p.name}</h3>
          <p class="product-card__desc">${p.desc}</p>
          <p class="product-card__price">${formatBRL(p.price)}</p>
          <div class="qty-row">
            <div class="qty">
              <button type="button" data-action="dec" aria-label="Diminuir quantidade">−</button>
              <span data-role="qty">${qty}</span>
              <button type="button" data-action="inc" aria-label="Aumentar quantidade">+</button>
            </div>
            <button type="button" class="add-btn" data-action="add">Adicionar</button>
          </div>
        </article>
      `;
    })
    .join('');
}

el.grid.addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-action]');
  if (!btn) return;
  const card = e.target.closest('.product-card');
  const id = card.dataset.id;
  const action = btn.dataset.action;

  if (action === 'inc') {
    state.quantities[id] += 1;
    card.querySelector('[data-role="qty"]').textContent = state.quantities[id];
  } else if (action === 'dec') {
    state.quantities[id] = Math.max(0, state.quantities[id] - 1);
    card.querySelector('[data-role="qty"]').textContent = state.quantities[id];
  } else if (action === 'add') {
    const qty = state.quantities[id];
    if (qty <= 0) return;
    state.cart[id] = (state.cart[id] || 0) + qty;
    state.quantities[id] = 0;
    card.querySelector('[data-role="qty"]').textContent = 0;
    renderCart();
    openCart();
  }
});

el.filters.addEventListener('click', (e) => {
  const btn = e.target.closest('.filter-btn');
  if (!btn) return;
  state.filter = btn.dataset.filter;
  [...el.filters.children].forEach((b) => b.classList.toggle('is-active', b === btn));
  renderProducts();
});

function cartTotalValue() {
  return Object.entries(state.cart).reduce((sum, [id, qty]) => {
    const product = PRODUCTS.find((p) => p.id === id);
    return sum + product.price * qty;
  }, 0);
}

function cartItemCount() {
  return Object.values(state.cart).reduce((sum, qty) => sum + qty, 0);
}

function renderCart() {
  const entries = Object.entries(state.cart).filter(([, qty]) => qty > 0);
  el.cartCount.textContent = cartItemCount();

  if (entries.length === 0) {
    el.cartItems.innerHTML = '';
    el.cartItems.appendChild(el.cartEmpty);
    el.cartTotal.textContent = formatBRL(0);
    return;
  }

  el.cartItems.innerHTML = entries
    .map(([id, qty]) => {
      const product = PRODUCTS.find((p) => p.id === id);
      return `
        <div class="cart-item" data-id="${id}">
          <div>
            <p class="cart-item__name">${qty}x ${product.name}</p>
            <p class="cart-item__price">${formatBRL(product.price * qty)}</p>
          </div>
          <button type="button" class="cart-item__remove" data-remove="${id}">remover</button>
        </div>
      `;
    })
    .join('');

  el.cartTotal.textContent = formatBRL(cartTotalValue());
}

el.cartItems.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-remove]');
  if (!btn) return;
  delete state.cart[btn.dataset.remove];
  renderCart();
});

function openCart() {
  el.cart.classList.add('is-open');
  el.cartOverlay.classList.add('is-open');
  el.cart.setAttribute('aria-hidden', 'false');
}
function closeCart() {
  el.cart.classList.remove('is-open');
  el.cartOverlay.classList.remove('is-open');
  el.cart.setAttribute('aria-hidden', 'true');
}

el.cartBtn.addEventListener('click', openCart);
el.cartClose.addEventListener('click', closeCart);
el.cartOverlay.addEventListener('click', closeCart);

function buildWhatsappMessage({ name, phone, address }) {
  const entries = Object.entries(state.cart).filter(([, qty]) => qty > 0);
  const lines = entries.map(([id, qty]) => {
    const product = PRODUCTS.find((p) => p.id === id);
    return `- ${qty}x ${product.name} (${product.desc}) — ${formatBRL(product.price * qty)}`;
  });

  return [
    '🏁 *Novo pedido Pit Stop Bebidas*',
    '',
    `*Cliente:* ${name}`,
    `*Contato:* ${phone}`,
    `*Endereço de entrega:* ${address}`,
    '',
    '*Itens do pedido:*',
    ...lines,
    '',
    `*Total: ${formatBRL(cartTotalValue())}*`,
  ].join('\n');
}

el.checkoutForm.addEventListener('submit', (e) => {
  e.preventDefault();

  if (cartItemCount() === 0) {
    alert('Seu carrinho está vazio. Adicione ao menos um produto antes de enviar o pedido.');
    return;
  }

  const name = document.getElementById('custName').value.trim();
  const phone = document.getElementById('custPhone').value.trim();
  const address = document.getElementById('custAddress').value.trim();

  const message = buildWhatsappMessage({ name, phone, address });
  const url = `https://wa.me/${UNIT_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank', 'noopener');
});

function setupStaticWhatsappLinks() {
  const genericMessage = 'Olá! Vim pelo site da Pit Stop Bebidas e gostaria de fazer um pedido.';
  const url = `https://wa.me/${UNIT_WHATSAPP_NUMBER}?text=${encodeURIComponent(genericMessage)}`;
  el.floatingWhatsapp.href = url;
  el.whatsappContact.href = url;
}

renderProducts();
renderCart();
setupStaticWhatsappLinks();
