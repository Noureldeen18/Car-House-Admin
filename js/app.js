/* ========================================== */
/* CAR HOUSE - ADMIN PANEL APPLICATION */
/* Light Mode Version */
/* ========================================== */

/* ========================================== */
/* CONFIGURATION & DEFAULT VALUES */
/* ========================================== */

/**
 * Configuration object for the Car House admin panel
 */
const config = {
  app_title: "Car House",
  dashboard_title: "Dashboard Overview",
  products_title: "Product Management",
  categories_title: "Category Management",
  orders_title: "Orders",
  users_title: "Users",
  footer_text: "Car House · Admin Panel"
};

/* ========================================== */
/* UTILITY FUNCTIONS */
/* ========================================== */

/**
 * Formats a number as currency (EGP)
 * @param {number} value - The numeric value to format
 * @returns {string} Formatted currency string
 */
function formatCurrency(value) {
  return value.toFixed(2) + " EGP";
}

/**
 * Format date to readable string
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date
 */
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

/**
 * Update rating display with stars
 * @param {number} rating - Rating value (0-5)
 */
function updateRatingDisplay(rating) {
  const display = document.getElementById('rating-display');
  if (!display) return;

  const fullStars = Math.floor(rating);
  const stars = '★'.repeat(fullStars) + '☆'.repeat(5 - fullStars);
  display.textContent = `${stars} (${rating.toFixed(1)})`;
}

/* ========================================== */
/* TAX CONFIGURATION */
/* ========================================== */

const TAX_RATE = 0.14; // 14% VAT

/**
 * Calculate tax amount
 * @param {number} subtotal - Subtotal before tax
 * @returns {number} Tax amount
 */
function calculateTax(subtotal) {
  return subtotal * TAX_RATE;
}

/**
 * Calculate subtotal from total (reverse calculation)
 * @param {number} total - Total including tax
 * @returns {number} Subtotal before tax
 */
function calculateSubtotal(total) {
  return total / (1 + TAX_RATE);
}

/**
 * Calculate total with tax
 * @param {number} subtotal - Subtotal before tax
 * @returns {number} Total including tax
 */
function calculateTotalWithTax(subtotal) {
  return subtotal * (1 + TAX_RATE);
}

/* ========================================== */
/* BASE LAYOUT CREATION */
/* ========================================== */

/**
 * Creates the main layout structure of the admin panel
 */
function createBaseLayout() {
  const root = document.getElementById("root");
  root.innerHTML = "";

  const appWrapper = document.createElement("div");
  appWrapper.id = "app-wrapper";
  appWrapper.className = "w-full h-full flex flex-col bg-slate-50 text-slate-800 font-sans";

  /* ====================================== */
  /* TOP HEADER BAR */
  /* ====================================== */

  const header = document.createElement("header");
  header.className = "w-full flex items-center justify-between px-6 py-3 border-b border-slate-200 bg-white shadow-sm";
  header.innerHTML = `
    <div class="flex items-center gap-3">
      <div class="flex items-center justify-center w-9 h-9 rounded-xl bg-white shadow-md overflow-hidden">
        <img src="Logo.png" alt="Car House" class="w-full h-full object-contain" />
      </div>
      <div class="flex flex-col">
        <h1 id="app-title" class="text-sm sm:text-base font-semibold tracking-tight text-slate-800">${config.app_title}</h1>
        <p class="text-[11px] sm:text-xs text-slate-500">Manage products, orders & customers</p>
      </div>
    </div>
    <div class="flex items-center gap-3 text-xs sm:text-sm text-slate-600">
      <span class="hidden sm:inline" id="user-name">Admin</span>
      <button id="logout-btn" class="focus-outline px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-xs text-slate-700 hover:border-orange-500 hover:text-orange-600 shadow-sm">
        Logout
      </button>
    </div>
  `;

  /* ====================================== */
  /* MAIN CONTENT AREA */
  /* ====================================== */

  const mainArea = document.createElement("div");
  mainArea.className = "flex-1 w-full flex overflow-hidden";

  /* ====================================== */
  /* SIDEBAR NAVIGATION */
  /* ====================================== */

  const sidebar = document.createElement("aside");
  sidebar.id = "sidebar";
  sidebar.className = "w-56 md:w-64 h-full bg-white border-r border-slate-200 flex flex-col shadow-sm";
  sidebar.innerHTML = `
    <nav class="flex-1 overflow-y-auto app-scrollbar py-4">
      <ul class="space-y-1 px-3" aria-label="Main navigation">
        <li>
          <button data-page="dashboard" class="nav-link w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium text-slate-600 hover:bg-slate-100 focus-outline">
            <span class="inline-flex items-center justify-center w-7 h-7 rounded-md bg-orange-50 text-orange-500 text-sm">📊</span>
            <span>Dashboard</span>
          </button>
        </li>
        <li>
          <button data-page="products" class="nav-link w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium text-slate-600 hover:bg-slate-100 focus-outline">
            <span class="inline-flex items-center justify-center w-7 h-7 rounded-md bg-teal-50 text-teal-600 text-sm">🛠️</span>
            <span>Products</span>
          </button>
        </li>
        <li>
          <button data-page="categories" class="nav-link w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium text-slate-600 hover:bg-slate-100 focus-outline">
            <span class="inline-flex items-center justify-center w-7 h-7 rounded-md bg-orange-50 text-orange-500 text-sm">🏷️</span>
            <span>Categories</span>
          </button>
        </li>
        <li>
          <button data-page="orders" class="nav-link w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium text-slate-600 hover:bg-slate-100 focus-outline">
            <span class="inline-flex items-center justify-center w-7 h-7 rounded-md bg-teal-50 text-teal-600 text-sm">📦</span>
            <span>Orders</span>
          </button>
        </li>
        <li>
          <button data-page="users" class="nav-link w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium text-slate-600 hover:bg-slate-100 focus-outline">
            <span class="inline-flex items-center justify-center w-7 h-7 rounded-md bg-orange-50 text-orange-500 text-sm">👥</span>
            <span>Users</span>
          </button>
        </li>
      </ul>
    </nav>
    <div class="px-3 py-3 border-t border-slate-200 text-[11px] text-slate-500">
      <p id="footer-text" class="truncate">${config.footer_text}</p>
    </div>
  `;

  const main = document.createElement("main");
  main.id = "main-content";
  main.className = "flex-1 h-full overflow-y-auto app-scrollbar bg-slate-50";
  main.setAttribute("role", "main");
  main.setAttribute("aria-live", "polite");

  mainArea.appendChild(sidebar);
  mainArea.appendChild(main);
  appWrapper.appendChild(header);
  appWrapper.appendChild(mainArea);
  root.appendChild(appWrapper);

  // Attach logout handler
  document.getElementById('logout-btn').addEventListener('click', async () => {
    await AuthService.logout();
    window.location.href = 'login.html';
  });
}

/* ========================================== */
/* DASHBOARD PAGE */
/* ========================================== */

async function renderDashboard() {
  const main = document.getElementById("main-content");
  if (!main) return;

  // Show loading
  main.innerHTML = '<div class="w-full h-full flex items-center justify-center"><p class="text-slate-500">Loading...</p></div>';

  // Fetch statistics
  const stats = await DatabaseService.getStatistics();

  main.innerHTML = `
    <section class="w-full h-full px-4 sm:px-6 py-4 flex flex-col gap-4 fade-in">
      <header class="flex items-center justify-between gap-3">
        <div>
          <h2 class="text-base sm:text-lg font-semibold tracking-tight text-slate-800">${config.dashboard_title}</h2>
          <p class="text-[11px] sm:text-xs text-slate-500 mt-1">Quick overview of your car spare parts store.</p>
        </div>
      </header>

      <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-1">
        <article class="card-elevated rounded-xl bg-white border border-slate-200 px-3 py-3 flex flex-col gap-2 shadow-sm">
          <div class="flex items-center justify-between">
            <h3 class="text-[11px] text-slate-500 font-medium">Total Products</h3>
            <span class="text-xs px-2 py-[1px] rounded-full bg-orange-50 text-orange-600 border border-orange-200">Inventory</span>
          </div>
          <p class="text-lg font-semibold text-slate-800">${stats.totalProducts}</p>
          <p class="text-[11px] text-slate-500">Active spare parts in catalog</p>
        </article>

        <article class="card-elevated rounded-xl bg-white border border-slate-200 px-3 py-3 flex flex-col gap-2 shadow-sm">
          <div class="flex items-center justify-between">
            <h3 class="text-[11px] text-slate-500 font-medium">Categories</h3>
            <span class="text-xs px-2 py-[1px] rounded-full bg-teal-50 text-teal-600 border border-teal-200">Structure</span>
          </div>
          <p class="text-lg font-semibold text-slate-800">${stats.totalCategories}</p>
          <p class="text-[11px] text-slate-500">Groups for easy browsing</p>
        </article>

        <article class="card-elevated rounded-xl bg-white border border-slate-200 px-3 py-3 flex flex-col gap-2 shadow-sm">
          <div class="flex items-center justify-between">
            <h3 class="text-[11px] text-slate-500 font-medium">Orders</h3>
            <span class="text-xs px-2 py-[1px] rounded-full bg-orange-50 text-orange-600 border border-orange-200">Activity</span>
          </div>
          <p class="text-lg font-semibold text-slate-800">${stats.totalOrders}</p>
          <p class="text-[11px] text-slate-500">Customer purchases</p>
        </article>

        <article class="card-elevated rounded-xl bg-white border border-slate-200 px-3 py-3 flex flex-col gap-2 shadow-sm">
          <div class="flex items-center justify-between">
            <h3 class="text-[11px] text-slate-500 font-medium">Revenue</h3>
            <span class="text-xs px-2 py-[1px] rounded-full bg-teal-50 text-teal-600 border border-teal-200">Total</span>
          </div>
          <p class="text-lg font-semibold text-slate-800">${formatCurrency(stats.totalRevenue)}</p>
          <p class="text-[11px] text-slate-500">Total sales revenue</p>
        </article>
      </div>
    </section>
  `;
}

/* ========================================== */
/* PRODUCTS PAGE */
/* ========================================== */

async function renderProductsPage() {
  const main = document.getElementById("main-content");
  if (!main) return;

  // Show loading
  main.innerHTML = '<div class="w-full h-full flex items-center justify-center"><p class="text-slate-500">Loading products...</p></div>';

  // Fetch products and categories
  const [products, categories] = await Promise.all([
    DatabaseService.getProducts(),
    DatabaseService.getCategories()
  ]);

  const rowsHtml = products.map(p => {
    const rating = p.rating || 0;
    const stars = '★'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating));

    return `
    <tr class="border-b border-slate-200 hover:bg-slate-50">
      <td class="px-3 py-2">
        <div class="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-lg">${p.category?.icon || '🛠️'}</div>
      </td>
      <td class="px-3 py-2 text-xs sm:text-sm">
        <div class="font-medium text-slate-800">${p.name}</div>
        <div class="text-[11px] text-slate-500">${p.car_model || 'Universal'}</div>
      </td>
      <td class="px-3 py-2 text-[11px] sm:text-xs text-slate-600">${p.category?.name || 'N/A'}</td>
      <td class="px-3 py-2 text-[11px] sm:text-xs text-orange-600 font-medium">${formatCurrency(p.price)}</td>
      <td class="px-3 py-2 text-[11px] sm:text-xs">
        <div class="flex items-center gap-1">
          <span class="text-amber-500 text-sm">${stars}</span>
          <span class="text-slate-500">(${rating.toFixed(1)})</span>
        </div>
      </td>
      <td class="px-3 py-2 text-[11px] sm:text-xs">
        <span class="inline-flex items-center rounded-full px-2 py-[1px] border border-slate-300 text-slate-700 bg-slate-50">
          ${p.stock} in stock
        </span>
      </td>
      <td class="px-3 py-2">
        <div class="flex flex-wrap gap-1.5">
          <button data-action="edit-product" data-id="${p.id}" class="focus-outline text-[11px] px-2 py-[2px] rounded-full bg-white text-slate-700 border border-slate-300 hover:border-teal-500 hover:text-teal-600">Edit</button>
          <button data-action="delete-product" data-id="${p.id}" class="focus-outline text-[11px] px-2 py-[2px] rounded-full bg-white text-slate-600 border border-slate-300 hover:border-red-500 hover:text-red-600">Delete</button>
        </div>
      </td>
    </tr>
  `;
  }).join("");

  const categoriesOptions = categories.map(c => `
    <option value="${c.id}">${c.name}</option>
  `).join("");

  main.innerHTML = `
    <section class="w-full h-full px-4 sm:px-6 py-4 flex flex-col gap-4 fade-in">
      <header class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 class="text-base sm:text-lg font-semibold tracking-tight text-slate-800">${config.products_title}</h2>
          <p class="text-[11px] sm:text-xs text-slate-500 mt-1">Manage car spare parts inventory, prices and compatibility.</p>
        </div>
        <button id="btn-add-product" class="focus-outline inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-orange-500 text-white text-xs sm:text-sm font-semibold shadow-md hover:bg-orange-600">
          <span class="text-sm">＋</span>
          <span>Add product</span>
        </button>
      </header>

      <div class="flex-1 min-h-0 rounded-xl bg-white border border-slate-200 overflow-hidden flex flex-col shadow-sm">
        <div class="px-3 sm:px-4 py-2 border-b border-slate-200 bg-slate-50">
          <p class="text-[11px] sm:text-xs text-slate-500">Showing ${products.length} products</p>
        </div>

        <div class="flex-1 overflow-auto app-scrollbar">
          <table class="min-w-full text-left text-xs sm:text-sm">
            <thead class="bg-slate-50 sticky top-0 z-10">
              <tr class="text-[11px] sm:text-xs text-slate-500 border-b border-slate-200">
                <th scope="col" class="px-3 py-2 font-medium">Image</th>
                <th scope="col" class="px-3 py-2 font-medium">Name & Model</th>
                <th scope="col" class="px-3 py-2 font-medium">Category</th>
                <th scope="col" class="px-3 py-2 font-medium">Price</th>
                <th scope="col" class="px-3 py-2 font-medium">Rating</th>
                <th scope="col" class="px-3 py-2 font-medium">Stock</th>
                <th scope="col" class="px-3 py-2 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody id="products-tbody">
              ${rowsHtml}
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <div id="product-modal" class="hidden fixed inset-0 flex items-center justify-center z-20">
      <div class="modal-backdrop absolute inset-0" id="modal-backdrop"></div>
      <div class="relative w-full max-w-md rounded-2xl bg-white border border-slate-200 shadow-2xl mx-4">
        <form id="product-form" class="flex flex-col gap-3 px-4 sm:px-5 py-4">
          <div class="flex items-start justify-between gap-3">
            <div>
              <h3 id="product-modal-title" class="text-sm sm:text-base font-semibold text-slate-800">New product</h3>
              <p class="text-[11px] sm:text-xs text-slate-500 mt-1">Add or update car spare part details.</p>
            </div>
            <button type="button" id="btn-close-product-modal" class="focus-outline text-slate-400 hover:text-slate-600 text-lg leading-none">×</button>
          </div>

          <input type="hidden" id="product-id" />
          
          <div class="flex flex-col gap-1 mt-1">
            <label for="product-image" class="text-[11px] text-slate-600 font-medium">Product Image</label>
            <input id="product-image" type="file" accept="image/*" class="focus-outline text-xs px-2 py-1.5 rounded-lg bg-slate-50 border border-slate-300 text-slate-700 file:mr-4 file:py-1 file:px-2 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-orange-500 file:text-white hover:file:bg-orange-600" />
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
            <div class="flex flex-col gap-1">
              <label for="product-name" class="text-[11px] text-slate-600 font-medium">Product name</label>
              <input id="product-name" type="text" required class="focus-outline text-xs px-2 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-800" />
            </div>
            <div class="flex flex-col gap-1">
              <label for="product-brand" class="text-[11px] text-slate-600 font-medium">Brand</label>
              <input id="product-brand" type="text" required class="focus-outline text-xs px-2 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-800" />
            </div>
            <div class="flex flex-col gap-1">
              <label for="product-category" class="text-[11px] text-slate-600 font-medium">Category</label>
              <select id="product-category" required class="focus-outline text-xs px-2 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-800">
                <option value="">Select category</option>
                ${categoriesOptions}
              </select>
            </div>
            <div class="flex flex-col gap-1">
              <label for="product-car-model" class="text-[11px] text-slate-600 font-medium">Car model</label>
              <input id="product-car-model" type="text" class="focus-outline text-xs px-2 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-800" />
            </div>
            <div class="flex flex-col gap-1">
              <label for="product-price" class="text-[11px] text-slate-600 font-medium">Price (EGP)</label>
              <input id="product-price" type="number" step="0.01" min="0" required class="focus-outline text-xs px-2 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-800" />
            </div>
            <div class="flex flex-col gap-1">
              <label for="product-stock" class="text-[11px] text-slate-600 font-medium">Stock</label>
              <input id="product-stock" type="number" min="0" required class="focus-outline text-xs px-2 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-800" />
            </div>
            <div class="flex flex-col gap-1 sm:col-span-2">
              <label for="product-rating" class="text-[11px] text-slate-600 font-medium">Rating (0-5 stars)</label>
              <div class="flex items-center gap-2">
                <input id="product-rating" type="range" min="0" max="5" step="0.1" value="0" class="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500" />
                <span id="rating-display" class="text-amber-500 text-sm min-w-[80px]">☆☆☆☆☆ (0.0)</span>
              </div>
            </div>
          </div>

          <div class="flex flex-col gap-1 mt-1">
            <label for="product-description" class="text-[11px] text-slate-600 font-medium">Description</label>
            <textarea id="product-description" rows="2" class="focus-outline text-xs px-2 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-800"></textarea>
          </div>

          <div class="flex items-center justify-between gap-3 mt-1">
            <p id="product-form-message" class="text-[11px] text-slate-500"></p>
            <div class="flex items-center gap-2">
              <button type="button" id="btn-cancel-product" class="focus-outline px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-[11px] sm:text-xs text-slate-700 hover:border-slate-400">Cancel</button>
              <button type="submit" id="btn-save-product" class="focus-outline px-3 py-1.5 rounded-lg bg-orange-500 text-white text-[11px] sm:text-xs font-semibold hover:bg-orange-600">Save</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  `;

  attachProductHandlers();
}

function attachProductHandlers() {
  const modal = document.getElementById("product-modal");
  const tbody = document.getElementById("products-tbody");

  // Close modal handlers
  document.getElementById('btn-close-product-modal')?.addEventListener('click', () => modal.classList.add('hidden'));
  document.getElementById('btn-cancel-product')?.addEventListener('click', () => modal.classList.add('hidden'));
  document.getElementById('modal-backdrop')?.addEventListener('click', () => modal.classList.add('hidden'));

  // Add product
  document.getElementById('btn-add-product')?.addEventListener('click', () => {
    document.getElementById('product-modal-title').textContent = 'New product';
    document.getElementById('product-id').value = '';
    document.getElementById('product-image').value = ''; // Reset file input
    document.getElementById('product-form').reset();
    document.getElementById('product-form-message').textContent = '';
    document.getElementById('product-rating').value = 0;
    updateRatingDisplay(0);
    modal.classList.remove('hidden');
  });

  // Rating slider live update
  document.getElementById('product-rating')?.addEventListener('input', (e) => {
    updateRatingDisplay(parseFloat(e.target.value));
  });

  // Edit/Delete handlers
  tbody?.addEventListener('click', async (e) => {
    const btn = e.target.closest('button[data-action]');
    if (!btn) return;

    const id = btn.dataset.id;
    const action = btn.dataset.action;

    if (action === 'delete-product') {
      if (confirm('Are you sure you want to delete this product?')) {
        const result = await DatabaseService.deleteProduct(id);
        if (result.success) {
          renderProductsPage();
        } else {
          alert('Failed to delete product: ' + result.error);
        }
      }
    } else if (action === 'edit-product') {
      const products = await DatabaseService.getProducts();
      const product = products.find(p => p.id === id);
      if (!product) return;

      document.getElementById('product-modal-title').textContent = 'Edit product';
      document.getElementById('product-id').value = product.id;
      document.getElementById('product-image').value = ''; // Reset file input
      document.getElementById('product-name').value = product.name;
      document.getElementById('product-brand').value = product.brand || '';
      document.getElementById('product-category').value = product.category_id || '';
      document.getElementById('product-car-model').value = product.car_model || '';
      document.getElementById('product-price').value = product.price;
      document.getElementById('product-stock').value = product.stock;
      document.getElementById('product-description').value = product.description || '';

      // Set rating
      const rating = product.rating || 0;
      document.getElementById('product-rating').value = rating;
      updateRatingDisplay(rating);

      modal.classList.remove('hidden');
    }
  });

  // Form submission
  document.getElementById('product-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const msg = document.getElementById('product-form-message');
    const btn = document.getElementById('btn-save-product');
    const id = document.getElementById('product-id').value;

    const data = {
      name: document.getElementById('product-name').value,
      brand: document.getElementById('product-brand').value,
      category_id: document.getElementById('product-category').value || null,
      car_model: document.getElementById('product-car-model').value,
      price: parseFloat(document.getElementById('product-price').value),
      stock: parseInt(document.getElementById('product-stock').value),
      rating: parseFloat(document.getElementById('product-rating').value) || 0,
      description: document.getElementById('product-description').value
    };

    btn.disabled = true;
    btn.textContent = 'Saving...';

    // 1. Save Product Data
    const result = id
      ? await DatabaseService.updateProduct(id, data)
      : await DatabaseService.createProduct(data);

    if (result.success) {
      // 2. Handle Image Upload if selected
      const imageFile = document.getElementById('product-image').files[0];
      if (imageFile) {
        try {
          const productId = result.data.id;
          const imageUrl = await DatabaseService.uploadFile(imageFile, 'products');

          if (imageUrl) {
            await DatabaseService.addProductImage(productId, {
              url: imageUrl,
              alt: data.title,
              position: 0
            });
          }
        } catch (uploadError) {
          console.error('Image upload failed:', uploadError);
          // Don't fail the whole operation, just warn
          alert('Product saved, but image upload failed: ' + uploadError.message);
        }
      }

      msg.textContent = 'Saved successfully!';
      msg.className = 'text-[11px] text-teal-600';
      setTimeout(() => {
        modal.classList.add('hidden');
        renderProductsPage();
      }, 500);
    } else {
      msg.textContent = result.error;
      msg.className = 'text-[11px] text-red-600';
      btn.disabled = false;
      btn.textContent = 'Save';
    }
  });
}

/* ========================================== */
/* CATEGORIES PAGE */
/* ========================================== */

async function renderCategoriesPage() {
  const main = document.getElementById("main-content");
  if (!main) return;

  main.innerHTML = '<div class="w-full h-full flex items-center justify-center"><p class="text-slate-500">Loading categories...</p></div>';

  const categories = await DatabaseService.getCategories();

  const listHtml = categories.map(c => {
    // Check if icon is a URL (image) or an emoji
    const isImageUrl = c.icon && (c.icon.startsWith('http') || c.icon.startsWith('data:') || c.icon.endsWith('.svg') || c.icon.endsWith('.png') || c.icon.endsWith('.jpg') || c.icon.endsWith('.webp'));
    const iconDisplay = isImageUrl
      ? `<img src="${c.icon}" alt="${c.name}" class="w-full h-full object-contain" onerror="this.parentElement.innerHTML='🏷️'" />`
      : (c.icon || '🏷️');

    return `
    <li class="flex items-center justify-between gap-3 px-3 py-2 rounded-lg bg-white border border-slate-200 hover:border-teal-400 card-elevated shadow-sm">
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-lg overflow-hidden">${iconDisplay}</div>
        <div class="flex flex-col">
          <span class="text-xs sm:text-sm font-medium text-slate-800">${c.name}</span>
          <span class="text-[10px] text-slate-500">${c.description || ''}</span>
        </div>
      </div>
      <div class="flex items-center gap-1.5">
        <button data-action="edit-category" data-id="${c.id}" class="focus-outline text-[10px] px-2 py-[2px] rounded-full bg-white text-slate-700 border border-slate-300 hover:border-teal-500 hover:text-teal-600">Edit</button>
        <button data-action="delete-category" data-id="${c.id}" class="focus-outline text-[10px] px-2 py-[2px] rounded-full bg-white text-slate-600 border border-slate-300 hover:border-red-500 hover:text-red-600">Delete</button>
      </div>
    </li>
  `;
  }).join("");

  main.innerHTML = `
    <section class="w-full h-full px-4 sm:px-6 py-4 flex flex-col gap-4 fade-in">
      <header class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 class="text-base sm:text-lg font-semibold tracking-tight text-slate-800">${config.categories_title}</h2>
          <p class="text-[11px] sm:text-xs text-slate-500 mt-1">Organize spare parts into clear, searchable groups.</p>
        </div>
        <button id="btn-add-category" class="focus-outline inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-teal-500 text-white text-xs sm:text-sm font-semibold shadow-md hover:bg-teal-600">
          <span class="text-sm">＋</span>
          <span>Add category</span>
        </button>
      </header>

      <div class="flex-1 min-h-0 rounded-xl bg-slate-50 border border-slate-200 p-3 sm:p-4 flex flex-col gap-3">
        <p class="text-[11px] sm:text-xs text-slate-500">You have ${categories.length} categories.</p>
        <ul id="categories-list" class="space-y-2 overflow-auto app-scrollbar">
          ${listHtml}
        </ul>
      </div>

      <div id="category-modal" class="hidden fixed inset-0 flex items-center justify-center z-20">
        <div class="modal-backdrop absolute inset-0" id="cat-modal-backdrop"></div>
        <div class="relative w-full max-w-sm rounded-2xl bg-white border border-slate-200 shadow-2xl mx-4">
          <form id="category-form" class="flex flex-col gap-3 px-4 sm:px-5 py-4">
            <div class="flex items-start justify-between gap-3">
              <div>
                <h3 id="category-modal-title" class="text-sm sm:text-base font-semibold text-slate-800">New category</h3>
                <p class="text-[11px] sm:text-xs text-slate-500 mt-1">Create or rename a category.</p>
              </div>
              <button type="button" id="btn-close-category-modal" class="focus-outline text-slate-400 hover:text-slate-600 text-lg leading-none">×</button>
            </div>

            <input type="hidden" id="category-id" />

            <div class="flex flex-col gap-1">
              <label for="category-name" class="text-[11px] text-slate-600 font-medium">Category name</label>
              <input id="category-name" type="text" required class="focus-outline text-xs px-2 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-800" />
            </div>

            <div class="flex flex-col gap-1">
              <label for="category-icon" class="text-[11px] text-slate-600 font-medium">Icon (Image)</label>
              <input id="category-icon" type="file" accept="image/svg+xml,image/png,image/jpeg,image/jpg,image/webp,image/gif,.svg,.png,.jpg,.jpeg,.webp,.gif" class="focus-outline text-xs px-2 py-1.5 rounded-lg bg-slate-50 border border-slate-300 text-slate-700 file:mr-4 file:py-1 file:px-2 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-teal-500 file:text-white hover:file:bg-teal-600" />
              <p class="text-[10px] text-slate-400">Supports: SVG, PNG, JPG, WEBP, GIF</p>
              <input type="hidden" id="category-icon-url" />
            </div>

            <div class="flex flex-col gap-1">
              <label for="category-description" class="text-[11px] text-slate-600 font-medium">Description</label>
              <input id="category-description" type="text" class="focus-outline text-xs px-2 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-800" />
            </div>

            <div class="flex items-center justify-between gap-3 mt-1">
              <p id="category-form-message" class="text-[11px] text-slate-500"></p>
              <div class="flex items-center gap-2">
                <button type="button" id="btn-cancel-category" class="focus-outline px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-[11px] sm:text-xs text-slate-700 hover:border-slate-400">Cancel</button>
                <button type="submit" id="btn-save-category" class="focus-outline px-3 py-1.5 rounded-lg bg-teal-500 text-white text-[11px] sm:text-xs font-semibold hover:bg-teal-600">Save</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  `;

  attachCategoryHandlers();
}

function attachCategoryHandlers() {
  const modal = document.getElementById("category-modal");
  const list = document.getElementById("categories-list");

  document.getElementById('btn-close-category-modal')?.addEventListener('click', () => modal.classList.add('hidden'));
  document.getElementById('btn-cancel-category')?.addEventListener('click', () => modal.classList.add('hidden'));
  document.getElementById('cat-modal-backdrop')?.addEventListener('click', () => modal.classList.add('hidden'));

  document.getElementById('btn-add-category')?.addEventListener('click', () => {
    document.getElementById('category-modal-title').textContent = 'New category';
    document.getElementById('category-id').value = '';
    document.getElementById('category-form').reset();
    document.getElementById('category-form-message').textContent = '';
    modal.classList.remove('hidden');
  });

  list?.addEventListener('click', async (e) => {
    const btn = e.target.closest('button[data-action]');
    if (!btn) return;

    const id = btn.dataset.id;
    const action = btn.dataset.action;

    if (action === 'delete-category') {
      if (confirm('Delete this category? Products will be uncategorized.')) {
        const result = await DatabaseService.deleteCategory(id);
        if (result.success) {
          renderCategoriesPage();
        } else {
          alert('Failed to delete: ' + result.error);
        }
      }
    } else if (action === 'edit-category') {
      const categories = await DatabaseService.getCategories();
      const category = categories.find(c => c.id === id);
      if (!category) return;

      document.getElementById('category-modal-title').textContent = 'Edit category';
      document.getElementById('category-id').value = category.id;
      document.getElementById('category-name').value = category.name;
      document.getElementById('category-icon-url').value = category.icon || '';
      // Reset file input
      document.getElementById('category-icon').value = '';
      document.getElementById('category-description').value = category.description || '';
      modal.classList.remove('hidden');
    }
  });

  document.getElementById('category-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const msg = document.getElementById('category-form-message');
    const btn = document.getElementById('btn-save-category');
    const id = document.getElementById('category-id').value;

    btn.disabled = true;
    btn.textContent = 'Saving...';

    let iconUrl = document.getElementById('category-icon-url').value;
    const iconFile = document.getElementById('category-icon').files[0];

    if (iconFile) {
      try {
        const uploadedUrl = await DatabaseService.uploadFile(iconFile, 'categories');
        if (uploadedUrl) iconUrl = uploadedUrl;
      } catch (error) {
        console.error('Upload failed:', error);
        msg.textContent = 'Image upload failed: ' + error.message;
        btn.disabled = false;
        btn.textContent = 'Save';
        return;
      }
    }

    const data = {
      name: document.getElementById('category-name').value,
      icon: iconUrl || '🏷️', // Fallback to emoji if no image
      description: document.getElementById('category-description').value
    };

    const result = id
      ? await DatabaseService.updateCategory(id, data)
      : await DatabaseService.createCategory(data);

    if (result.success) {
      msg.textContent = 'Saved!';
      msg.className = 'text-[11px] text-teal-600';
      setTimeout(() => {
        modal.classList.add('hidden');
        renderCategoriesPage();
      }, 500);
    } else {
      msg.textContent = result.error;
      msg.className = 'text-[11px] text-red-600';
      btn.disabled = false;
      btn.textContent = 'Save';
    }
  });
}

/* ========================================== */
/* ORDERS PAGE */
/* ========================================== */

async function renderOrdersPage() {
  const main = document.getElementById("main-content");
  if (!main) return;

  main.innerHTML = '<div class="w-full h-full flex items-center justify-center"><p class="text-slate-500">Loading orders...</p></div>';

  const orders = await DatabaseService.getOrders();

  const rowsHtml = orders.map(o => {
    let badgeClass = "inline-flex items-center px-2 py-[1px] rounded-full border text-[10px]";
    if (o.status === "pending") badgeClass += " border-orange-300 text-orange-700 bg-orange-50";
    else if (o.status === "shipped") badgeClass += " border-teal-300 text-teal-700 bg-teal-50";
    else if (o.status === "delivered") badgeClass += " border-green-300 text-green-700 bg-green-50";
    else badgeClass += " border-slate-300 text-slate-600 bg-slate-50";

    const itemCount = o.items?.length || 0;
    const total = o.total || o.total_amount || 0;
    const subtotal = calculateSubtotal(total);
    const tax = calculateTax(subtotal);

    return `
      <tr class="border-b border-slate-200 hover:bg-slate-50">
        <td class="px-3 py-2 text-[11px] sm:text-xs font-medium text-slate-800">${o.id.substring(0, 8)}</td>
        <td class="px-3 py-2 text-xs sm:text-sm">
          <div class="text-slate-800">${o.profile?.full_name || o.user?.full_name || 'N/A'}</div>
          <div class="text-[10px] text-slate-500">${formatDate(o.created_at)}</div>
        </td>
        <td class="px-3 py-2 text-[11px] sm:text-xs text-slate-600">${itemCount} items</td>
        <td class="px-3 py-2 text-[11px] sm:text-xs">
          <div class="flex flex-col gap-0.5">
            <span class="text-slate-500">Subtotal: ${formatCurrency(subtotal)}</span>
            <span class="text-slate-400">Tax (14%): ${formatCurrency(tax)}</span>
            <span class="text-orange-600 font-medium">Total: ${formatCurrency(total)}</span>
          </div>
        </td>
        <td class="px-3 py-2 text-[11px] sm:text-xs">
          <span class="${badgeClass}">${o.status}</span>
        </td>
        <td class="px-3 py-2 text-right">
          <select data-order-id="${o.id}" class="focus-outline bg-white border border-slate-300 rounded-full px-2 py-[1px] text-[11px] text-slate-700">
            <option value="pending" ${o.status === "pending" ? "selected" : ""}>Pending</option>
            <option value="processing" ${o.status === "processing" ? "selected" : ""}>Processing</option>
            <option value="shipped" ${o.status === "shipped" ? "selected" : ""}>Shipped</option>
            <option value="delivered" ${o.status === "delivered" ? "selected" : ""}>Delivered</option>
            <option value="cancelled" ${o.status === "cancelled" ? "selected" : ""}>Cancelled</option>
          </select>
        </td>
      </tr>
    `;
  }).join("");

  main.innerHTML = `
    <section class="w-full h-full px-4 sm:px-6 py-4 flex flex-col gap-4 fade-in">
      <header>
        <h2 class="text-base sm:text-lg font-semibold tracking-tight text-slate-800">${config.orders_title}</h2>
        <p class="text-[11px] sm:text-xs text-slate-500 mt-1">Track order status from pending to delivered.</p>
      </header>

      <div class="flex-1 min-h-0 rounded-xl bg-white border border-slate-200 overflow-hidden flex flex-col shadow-sm">
        <div class="px-3 sm:px-4 py-2 border-b border-slate-200 bg-slate-50">
          <p class="text-[11px] sm:text-xs text-slate-500">Total ${orders.length} orders</p>
        </div>

        <div class="flex-1 overflow-auto app-scrollbar">
          <table class="min-w-full text-left text-xs sm:text-sm">
            <thead class="bg-slate-50 sticky top-0 z-10">
              <tr class="text-[11px] sm:text-xs text-slate-500 border-b border-slate-200">
                <th scope="col" class="px-3 py-2 font-medium">Order ID</th>
                <th scope="col" class="px-3 py-2 font-medium">Customer</th>
                <th scope="col" class="px-3 py-2 font-medium">Items</th>
                <th scope="col" class="px-3 py-2 font-medium">Amount (14% Tax)</th>
                <th scope="col" class="px-3 py-2 font-medium">Status</th>
                <th scope="col" class="px-3 py-2 font-medium text-right">Update</th>
              </tr>
            </thead>
            <tbody id="orders-tbody">
              ${rowsHtml}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  `;

  document.getElementById('orders-tbody')?.addEventListener('change', async (e) => {
    const select = e.target.closest('select[data-order-id]');
    if (!select) return;

    const result = await DatabaseService.updateOrderStatus(select.dataset.orderId, select.value);
    if (!result.success) {
      alert('Failed to update: ' + result.error);
      renderOrdersPage();
    }
  });
}

/* ========================================== */
/* USERS PAGE */
/* ========================================== */

async function renderUsersPage() {
  const main = document.getElementById("main-content");
  if (!main) return;

  main.innerHTML = '<div class="w-full h-full flex items-center justify-center"><p class="text-slate-500">Loading users...</p></div>';

  const users = await DatabaseService.getUsers();

  const rowsHtml = users.map(u => {
    const statusClass = u.blocked
      ? "bg-red-50 text-red-600 border border-red-200"
      : "bg-green-50 text-green-600 border border-green-200";
    const statusLabel = u.blocked ? "Blocked" : "Active";
    const isAdmin = u.role === 'admin' || u.role === 'superadmin' || u.isAdmin;
    const roleClass = isAdmin
      ? "bg-orange-50 text-orange-600 border border-orange-200"
      : "bg-slate-50 text-slate-600 border border-slate-200";

    return `
      <tr class="border-b border-slate-200 hover:bg-slate-50">
        <td class="px-3 py-2 text-xs sm:text-sm">
          <div class="flex items-center gap-2">
            <div class="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center text-[11px] text-slate-700 font-medium">
              ${u.full_name?.charAt(0) || 'U'}
            </div>
            <div class="flex flex-col">
              <span class="font-medium text-slate-800">${u.full_name || 'N/A'}</span>
              <span class="text-[10px] text-slate-500">${u.email}</span>
            </div>
          </div>
        </td>
        <td class="px-3 py-2 text-[11px] sm:text-xs">
          <span class="inline-flex items-center px-2 py-[1px] rounded-full ${roleClass} text-[10px]">
            ${u.role || 'customer'}
          </span>
        </td>
        <td class="px-3 py-2 text-[11px] sm:text-xs">
          <span class="inline-flex items-center px-2 py-[1px] rounded-full ${statusClass} text-[10px]">
            ${statusLabel}
          </span>
        </td>
        <td class="px-3 py-2">
          <div class="flex flex-wrap gap-1 justify-end">
            <select data-user-id="${u.id}" data-action="change-role" class="focus-outline bg-white border border-slate-300 rounded-full px-2 py-[2px] text-[10px] text-slate-700">
              <option value="customer" ${u.role === 'customer' ? 'selected' : ''}>Customer</option>
              <option value="admin" ${u.role === 'admin' ? 'selected' : ''}>Admin</option>
              <option value="superadmin" ${u.role === 'superadmin' ? 'selected' : ''}>Super Admin</option>
            </select>
            <button data-user-id="${u.id}" data-blocked="${u.blocked}" data-action="toggle-block" class="focus-outline text-[10px] px-2 py-[2px] rounded-full ${u.blocked ? 'bg-green-50 text-green-700 border-green-300' : 'bg-red-50 text-red-700 border-red-300'} border">
              ${u.blocked ? 'Unblock' : 'Block'}
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join("");

  main.innerHTML = `
    <section class="w-full h-full px-4 sm:px-6 py-4 flex flex-col gap-4 fade-in">
      <header class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 class="text-base sm:text-lg font-semibold tracking-tight text-slate-800">${config.users_title}</h2>
          <p class="text-[11px] sm:text-xs text-slate-500 mt-1">Manage users, roles and access permissions.</p>
        </div>
        <button id="btn-add-user" class="focus-outline inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-orange-500 text-white text-xs sm:text-sm font-semibold shadow-md hover:bg-orange-600">
          <span class="text-sm">＋</span>
          <span>Add User</span>
        </button>
      </header>

      <div class="flex-1 min-h-0 rounded-xl bg-white border border-slate-200 overflow-hidden flex flex-col shadow-sm">
        <div class="px-3 sm:px-4 py-2 border-b border-slate-200 bg-slate-50">
          <p class="text-[11px] sm:text-xs text-slate-500">Total ${users.length} users</p>
        </div>

        <div class="flex-1 overflow-auto app-scrollbar">
          <table class="min-w-full text-left text-xs sm:text-sm">
            <thead class="bg-slate-50 sticky top-0 z-10">
              <tr class="text-[11px] sm:text-xs text-slate-500 border-b border-slate-200">
                <th scope="col" class="px-3 py-2 font-medium">User</th>
                <th scope="col" class="px-3 py-2 font-medium">Role</th>
                <th scope="col" class="px-3 py-2 font-medium">Status</th>
                <th scope="col" class="px-3 py-2 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody id="users-tbody">
              ${rowsHtml}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Add User Modal -->
      <div id="user-modal" class="hidden fixed inset-0 flex items-center justify-center z-20">
        <div class="modal-backdrop absolute inset-0" id="user-modal-backdrop"></div>
        <div class="relative w-full max-w-md rounded-2xl bg-white border border-slate-200 shadow-2xl mx-4">
          <form id="user-form" class="flex flex-col gap-3 px-4 sm:px-5 py-4">
            <div class="flex items-start justify-between gap-3">
              <div>
                <h3 id="user-modal-title" class="text-sm sm:text-base font-semibold text-slate-800">Create New User</h3>
                <p class="text-[11px] sm:text-xs text-slate-500 mt-1">Add a new user to the system.</p>
              </div>
              <button type="button" id="btn-close-user-modal" class="focus-outline text-slate-400 hover:text-slate-600 text-lg leading-none">×</button>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
              <div class="flex flex-col gap-1 sm:col-span-2">
                <label for="user-fullname" class="text-[11px] text-slate-600 font-medium">Full Name</label>
                <input id="user-fullname" type="text" required placeholder="John Doe" class="focus-outline text-xs px-2 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-800" />
              </div>
              <div class="flex flex-col gap-1 sm:col-span-2">
                <label for="user-email" class="text-[11px] text-slate-600 font-medium">Email Address</label>
                <input id="user-email" type="email" required placeholder="user@example.com" class="focus-outline text-xs px-2 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-800" />
              </div>
              <div class="flex flex-col gap-1">
                <label for="user-password" class="text-[11px] text-slate-600 font-medium">Password</label>
                <input id="user-password" type="password" required minlength="6" placeholder="••••••••" class="focus-outline text-xs px-2 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-800" />
              </div>
              <div class="flex flex-col gap-1">
                <label for="user-role" class="text-[11px] text-slate-600 font-medium">Role</label>
                <select id="user-role" required class="focus-outline text-xs px-2 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-800">
                  <option value="customer">Customer</option>
                  <option value="admin">Admin</option>
                  <option value="superadmin">Super Admin</option>
                </select>
              </div>
              <div class="flex flex-col gap-1 sm:col-span-2">
                <label for="user-phone" class="text-[11px] text-slate-600 font-medium">Phone (Optional)</label>
                <input id="user-phone" type="tel" placeholder="+20 123 456 7890" class="focus-outline text-xs px-2 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-800" />
              </div>
            </div>

            <div class="flex items-center justify-between gap-3 mt-2">
              <p id="user-form-message" class="text-[11px] text-slate-500"></p>
              <div class="flex items-center gap-2">
                <button type="button" id="btn-cancel-user" class="focus-outline px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-[11px] sm:text-xs text-slate-700 hover:border-slate-400">Cancel</button>
                <button type="submit" id="btn-save-user" class="focus-outline px-3 py-1.5 rounded-lg bg-orange-500 text-white text-[11px] sm:text-xs font-semibold hover:bg-orange-600">Create User</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  `;

  attachUserHandlers();
}

function attachUserHandlers() {
  const modal = document.getElementById("user-modal");
  const tbody = document.getElementById("users-tbody");

  // Close modal handlers
  document.getElementById('btn-close-user-modal')?.addEventListener('click', () => modal.classList.add('hidden'));
  document.getElementById('btn-cancel-user')?.addEventListener('click', () => modal.classList.add('hidden'));
  document.getElementById('user-modal-backdrop')?.addEventListener('click', () => modal.classList.add('hidden'));

  // Add user button
  document.getElementById('btn-add-user')?.addEventListener('click', () => {
    document.getElementById('user-form').reset();
    document.getElementById('user-form-message').textContent = '';
    modal.classList.remove('hidden');
  });

  // Handle role change
  tbody?.addEventListener('change', async (e) => {
    const select = e.target.closest('select[data-action="change-role"]');
    if (!select) return;

    const userId = select.dataset.userId;
    const newRole = select.value;

    const result = await DatabaseService.updateUser(userId, { role: newRole });

    if (result.success) {
      // If making admin, also add to admins table
      if (newRole === 'admin' || newRole === 'superadmin') {
        await DatabaseService.addAdmin(userId, newRole, { permissions: ['all'] });
      } else {
        // If removing admin, remove from admins table
        await DatabaseService.removeAdmin(userId);
      }
      renderUsersPage();
    } else {
      alert('Failed to update role: ' + result.error);
      renderUsersPage();
    }
  });

  // Handle block/unblock
  tbody?.addEventListener('click', async (e) => {
    const btn = e.target.closest('button[data-action="toggle-block"]');
    if (!btn) return;

    const isBlocked = btn.dataset.blocked === 'true';
    const result = await DatabaseService.updateUser(btn.dataset.userId, { blocked: !isBlocked });

    if (result.success) {
      renderUsersPage();
    } else {
      alert('Failed to update user: ' + result.error);
    }
  });

  // Form submission - create new user
  document.getElementById('user-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const msg = document.getElementById('user-form-message');
    const btn = document.getElementById('btn-save-user');

    const fullName = document.getElementById('user-fullname').value.trim();
    const email = document.getElementById('user-email').value.trim();
    const password = document.getElementById('user-password').value;
    const role = document.getElementById('user-role').value;
    const phone = document.getElementById('user-phone').value.trim();

    btn.disabled = true;
    btn.textContent = 'Creating...';

    try {
      // Register the user
      const result = await AuthService.register(email, password, fullName, phone, role);

      if (result.success) {
        // If admin role, add to admins table
        if (role === 'admin' || role === 'superadmin') {
          await DatabaseService.addAdmin(result.user.id, role, { permissions: ['all'] });
        }

        msg.textContent = 'User created successfully!';
        msg.className = 'text-[11px] text-green-600';

        setTimeout(() => {
          modal.classList.add('hidden');
          renderUsersPage();
        }, 1000);
      } else {
        msg.textContent = result.error || 'Failed to create user';
        msg.className = 'text-[11px] text-red-600';
        btn.disabled = false;
        btn.textContent = 'Create User';
      }
    } catch (error) {
      msg.textContent = error.message || 'An error occurred';
      msg.className = 'text-[11px] text-red-600';
      btn.disabled = false;
      btn.textContent = 'Create User';
    }
  });
}

/* ========================================== */
/* NAVIGATION */
/* ========================================== */

function setActivePage(pageKey) {
  document.querySelectorAll(".nav-link").forEach(btn => {
    if (btn.dataset.page === pageKey) {
      btn.classList.add("bg-slate-100", "text-slate-900");
      btn.classList.remove("text-slate-600");
    } else {
      btn.classList.remove("bg-slate-100", "text-slate-900");
      btn.classList.add("text-slate-600");
    }
  });

  const pages = {
    dashboard: renderDashboard,
    products: renderProductsPage,
    categories: renderCategoriesPage,
    orders: renderOrdersPage,
    users: renderUsersPage
  };

  pages[pageKey]?.();
}

function attachSidebarNav() {
  document.getElementById("sidebar")?.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-page]");
    if (btn) setActivePage(btn.dataset.page);
  });
}

/* ========================================== */
/* INITIALIZATION */
/* ========================================== */

(async function init() {
  // Initialize Supabase
  if (!initializeSupabase()) {
    alert('Failed to initialize Supabase. Please check your configuration in js/config.js');
    return;
  }

  // Check authentication
  const user = await AuthService.getSession();
  if (!user) {
    window.location.href = 'login.html';
    return;
  }

  // Check if admin - use isAdmin property set by auth.js
  if (!user.isAdmin) {
    console.error('Access denied. User:', user);
    console.error('isAdmin:', user.isAdmin, 'adminRole:', user.adminRole);
    alert('Access denied. Admin privileges required.');
    await AuthService.logout();
    window.location.href = 'login.html';
    return;
  }

  // Log successful admin access
  console.log('✅ Admin access granted:', user.email, '- Role:', user.adminRole);

  // Create UI
  createBaseLayout();

  // Update user name in header
  if (user.full_name) {
    document.getElementById('user-name').textContent = user.full_name;
  }

  // Attach navigation
  attachSidebarNav();

  // Show dashboard
  setActivePage("dashboard");
})();
