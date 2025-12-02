/* ========================================== */
/* CAR HOUSE - ADMIN PANEL APPLICATION */
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
  return "EGP" + value.toFixed(2);
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
  appWrapper.className = "w-full h-full flex flex-col bg-slate-950 text-slate-100 font-sans";

  /* ====================================== */
  /* TOP HEADER BAR */
  /* ====================================== */

  const header = document.createElement("header");
  header.className = "w-full flex items-center justify-between px-6 py-3 border-b border-slate-800 bg-slate-950/95";
  header.innerHTML = `
    <div class="flex items-center gap-3">
      <div class="flex items-center justify-center w-9 h-9 rounded-xl bg-orange-500/90 text-slate-950 font-semibold text-lg">
        <span aria-hidden="true">🚗</span>
      </div>
      <div class="flex flex-col">
        <h1 id="app-title" class="text-sm sm:text-base font-semibold tracking-tight">${config.app_title}</h1>
        <p class="text-[11px] sm:text-xs text-slate-400">Manage products, orders & customers</p>
      </div>
    </div>
    <div class="flex items-center gap-3 text-xs sm:text-sm text-slate-400">
      <span class="hidden sm:inline" id="user-name">Admin</span>
      <button id="logout-btn" class="focus-outline px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-900 text-xs text-slate-200 hover:border-orange-500 hover:text-orange-300">
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
  sidebar.className = "w-56 md:w-64 h-full bg-slate-950 border-r border-slate-800 flex flex-col";
  sidebar.innerHTML = `
    <nav class="flex-1 overflow-y-auto app-scrollbar py-4">
      <ul class="space-y-1 px-3" aria-label="Main navigation">
        <li>
          <button data-page="dashboard" class="nav-link w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium text-slate-300 hover:bg-slate-800 focus-outline">
            <span class="inline-flex items-center justify-center w-7 h-7 rounded-md bg-slate-900 text-orange-400 text-sm">📊</span>
            <span>Dashboard</span>
          </button>
        </li>
        <li>
          <button data-page="products" class="nav-link w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium text-slate-300 hover:bg-slate-800 focus-outline">
            <span class="inline-flex items-center justify-center w-7 h-7 rounded-md bg-slate-900 text-teal-400 text-sm">🛠️</span>
            <span>Products</span>
          </button>
        </li>
        <li>
          <button data-page="categories" class="nav-link w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium text-slate-300 hover:bg-slate-800 focus-outline">
            <span class="inline-flex items-center justify-center w-7 h-7 rounded-md bg-slate-900 text-orange-300 text-sm">🏷️</span>
            <span>Categories</span>
          </button>
        </li>
        <li>
          <button data-page="orders" class="nav-link w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium text-slate-300 hover:bg-slate-800 focus-outline">
            <span class="inline-flex items-center justify-center w-7 h-7 rounded-md bg-slate-900 text-teal-300 text-sm">📦</span>
            <span>Orders</span>
          </button>
        </li>
        <li>
          <button data-page="users" class="nav-link w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium text-slate-300 hover:bg-slate-800 focus-outline">
            <span class="inline-flex items-center justify-center w-7 h-7 rounded-md bg-slate-900 text-orange-200 text-sm">👥</span>
            <span>Users</span>
          </button>
        </li>
      </ul>
    </nav>
    <div class="px-3 py-3 border-t border-slate-800 text-[11px] text-slate-500">
      <p id="footer-text" class="truncate">${config.footer_text}</p>
    </div>
  `;

  const main = document.createElement("main");
  main.id = "main-content";
  main.className = "flex-1 h-full overflow-y-auto app-scrollbar bg-slate-950/95";
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
  main.innerHTML = '<div class="w-full h-full flex items-center justify-center"><p class="text-slate-400">Loading...</p></div>';

  // Fetch statistics
  const stats = await DatabaseService.getStatistics();

  main.innerHTML = `
    <section class="w-full h-full px-4 sm:px-6 py-4 flex flex-col gap-4 fade-in">
      <header class="flex items-center justify-between gap-3">
        <div>
          <h2 class="text-base sm:text-lg font-semibold tracking-tight">${config.dashboard_title}</h2>
          <p class="text-[11px] sm:text-xs text-slate-400 mt-1">Quick overview of your car spare parts store.</p>
        </div>
      </header>

      <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-1">
        <article class="card-elevated rounded-xl bg-slate-900/80 border border-slate-800/80 px-3 py-3 flex flex-col gap-2">
          <div class="flex items-center justify-between">
            <h3 class="text-[11px] text-slate-400 font-medium">Total Products</h3>
            <span class="text-xs px-2 py-[1px] rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/40">Inventory</span>
          </div>
          <p class="text-lg font-semibold">${stats.totalProducts}</p>
          <p class="text-[11px] text-slate-500">Active spare parts in catalog</p>
        </article>

        <article class="card-elevated rounded-xl bg-slate-900/80 border border-slate-800/80 px-3 py-3 flex flex-col gap-2">
          <div class="flex items-center justify-between">
            <h3 class="text-[11px] text-slate-400 font-medium">Categories</h3>
            <span class="text-xs px-2 py-[1px] rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/40">Structure</span>
          </div>
          <p class="text-lg font-semibold">${stats.totalCategories}</p>
          <p class="text-[11px] text-slate-500">Groups for easy browsing</p>
        </article>

        <article class="card-elevated rounded-xl bg-slate-900/80 border border-slate-800/80 px-3 py-3 flex flex-col gap-2">
          <div class="flex items-center justify-between">
            <h3 class="text-[11px] text-slate-400 font-medium">Orders</h3>
            <span class="text-xs px-2 py-[1px] rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/40">Activity</span>
          </div>
          <p class="text-lg font-semibold">${stats.totalOrders}</p>
          <p class="text-[11px] text-slate-500">Customer purchases</p>
        </article>

        <article class="card-elevated rounded-xl bg-slate-900/80 border border-slate-800/80 px-3 py-3 flex flex-col gap-2">
          <div class="flex items-center justify-between">
            <h3 class="text-[11px] text-slate-400 font-medium">Revenue</h3>
            <span class="text-xs px-2 py-[1px] rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/40">Total</span>
          </div>
          <p class="text-lg font-semibold">${formatCurrency(stats.totalRevenue)}</p>
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
  main.innerHTML = '<div class="w-full h-full flex items-center justify-center"><p class="text-slate-400">Loading products...</p></div>';

  // Fetch products and categories
  const [products, categories] = await Promise.all([
    DatabaseService.getProducts(),
    DatabaseService.getCategories()
  ]);

  const rowsHtml = products.map(p => `
    <tr class="border-b border-slate-800/80 hover:bg-slate-900/60">
      <td class="px-3 py-2">
        <div class="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center text-lg">${p.category?.icon || '🛠️'}</div>
      </td>
      <td class="px-3 py-2 text-xs sm:text-sm">
        <div class="font-medium">${p.name}</div>
        <div class="text-[11px] text-slate-400">${p.car_model || 'Universal'}</div>
      </td>
      <td class="px-3 py-2 text-[11px] sm:text-xs text-slate-300">${p.category?.name || 'N/A'}</td>
      <td class="px-3 py-2 text-[11px] sm:text-xs text-slate-300">${p.brand || 'N/A'}</td>
      <td class="px-3 py-2 text-[11px] sm:text-xs text-orange-300 font-medium">${formatCurrency(p.price)}</td>
      <td class="px-3 py-2 text-[11px] sm:text-xs">
        <span class="inline-flex items-center rounded-full px-2 py-[1px] border border-slate-700 text-slate-200">
          ${p.stock} in stock
        </span>
      </td>
      <td class="px-3 py-2">
        <div class="flex flex-wrap gap-1.5">
          <button data-action="edit-product" data-id="${p.id}" class="focus-outline text-[11px] px-2 py-[2px] rounded-full bg-slate-800 text-slate-100 border border-slate-700 hover:border-teal-400 hover:text-teal-300">Edit</button>
          <button data-action="delete-product" data-id="${p.id}" class="focus-outline text-[11px] px-2 py-[2px] rounded-full bg-slate-900 text-slate-300 border border-slate-800 hover:border-orange-500 hover:text-orange-300">Delete</button>
        </div>
      </td>
    </tr>
  `).join("");

  const categoriesOptions = categories.map(c => `
    <option value="${c.id}">${c.name}</option>
  `).join("");

  main.innerHTML = `
    <section class="w-full h-full px-4 sm:px-6 py-4 flex flex-col gap-4 fade-in">
      <header class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 class="text-base sm:text-lg font-semibold tracking-tight">${config.products_title}</h2>
          <p class="text-[11px] sm:text-xs text-slate-400 mt-1">Manage car spare parts inventory, prices and compatibility.</p>
        </div>
        <button id="btn-add-product" class="focus-outline inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-orange-500 text-slate-950 text-xs sm:text-sm font-semibold shadow-sm hover:bg-orange-400">
          <span class="text-sm">＋</span>
          <span>Add product</span>
        </button>
      </header>

      <div class="flex-1 min-h-0 rounded-xl bg-slate-900/80 border border-slate-800/80 overflow-hidden flex flex-col">
        <div class="px-3 sm:px-4 py-2 border-b border-slate-800/80">
          <p class="text-[11px] sm:text-xs text-slate-400">Showing ${products.length} products</p>
        </div>

        <div class="flex-1 overflow-auto app-scrollbar">
          <table class="min-w-full text-left text-xs sm:text-sm">
            <thead class="bg-slate-900/90 sticky top-0 z-10">
              <tr class="text-[11px] sm:text-xs text-slate-400 border-b border-slate-800/80">
                <th scope="col" class="px-3 py-2 font-medium">Image</th>
                <th scope="col" class="px-3 py-2 font-medium">Name & Model</th>
                <th scope="col" class="px-3 py-2 font-medium">Category</th>
                <th scope="col" class="px-3 py-2 font-medium">Brand</th>
                <th scope="col" class="px-3 py-2 font-medium">Price</th>
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
      <div class="relative w-full max-w-md rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl mx-4">
        <form id="product-form" class="flex flex-col gap-3 px-4 sm:px-5 py-4">
          <div class="flex items-start justify-between gap-3">
            <div>
              <h3 id="product-modal-title" class="text-sm sm:text-base font-semibold">New product</h3>
              <p class="text-[11px] sm:text-xs text-slate-400 mt-1">Add or update car spare part details.</p>
            </div>
            <button type="button" id="btn-close-product-modal" class="focus-outline text-slate-400 hover:text-slate-200 text-lg leading-none">×</button>
          </div>

          <input type="hidden" id="product-id" />

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
            <div class="flex flex-col gap-1">
              <label for="product-name" class="text-[11px] text-slate-300 font-medium">Product name</label>
              <input id="product-name" type="text" required class="focus-outline text-xs px-2 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-100" />
            </div>
            <div class="flex flex-col gap-1">
              <label for="product-brand" class="text-[11px] text-slate-300 font-medium">Brand</label>
              <input id="product-brand" type="text" required class="focus-outline text-xs px-2 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-100" />
            </div>
            <div class="flex flex-col gap-1">
              <label for="product-category" class="text-[11px] text-slate-300 font-medium">Category</label>
              <select id="product-category" required class="focus-outline text-xs px-2 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-100">
                <option value="">Select category</option>
                ${categoriesOptions}
              </select>
            </div>
            <div class="flex flex-col gap-1">
              <label for="product-car-model" class="text-[11px] text-slate-300 font-medium">Car model</label>
              <input id="product-car-model" type="text" class="focus-outline text-xs px-2 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-100" />
            </div>
            <div class="flex flex-col gap-1">
              <label for="product-price" class="text-[11px] text-slate-300 font-medium">Price (EGP)</label>
              <input id="product-price" type="number" step="0.01" min="0" required class="focus-outline text-xs px-2 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-100" />
            </div>
            <div class="flex flex-col gap-1">
              <label for="product-stock" class="text-[11px] text-slate-300 font-medium">Stock</label>
              <input id="product-stock" type="number" min="0" required class="focus-outline text-xs px-2 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-100" />
            </div>
          </div>

          <div class="flex flex-col gap-1 mt-1">
            <label for="product-description" class="text-[11px] text-slate-300 font-medium">Description</label>
            <textarea id="product-description" rows="2" class="focus-outline text-xs px-2 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-100"></textarea>
          </div>

          <div class="flex items-center justify-between gap-3 mt-1">
            <p id="product-form-message" class="text-[11px] text-slate-400"></p>
            <div class="flex items-center gap-2">
              <button type="button" id="btn-cancel-product" class="focus-outline px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-900 text-[11px] sm:text-xs text-slate-200 hover:border-slate-500">Cancel</button>
              <button type="submit" id="btn-save-product" class="focus-outline px-3 py-1.5 rounded-lg bg-orange-500 text-slate-950 text-[11px] sm:text-xs font-semibold hover:bg-orange-400">Save</button>
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
    document.getElementById('product-form').reset();
    document.getElementById('product-form-message').textContent = '';
    modal.classList.remove('hidden');
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
      document.getElementById('product-name').value = product.name;
      document.getElementById('product-brand').value = product.brand || '';
      document.getElementById('product-category').value = product.category_id || '';
      document.getElementById('product-car-model').value = product.car_model || '';
      document.getElementById('product-price').value = product.price;
      document.getElementById('product-stock').value = product.stock;
      document.getElementById('product-description').value = product.description || '';
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
      description: document.getElementById('product-description').value
    };

    btn.disabled = true;
    btn.textContent = 'Saving...';

    const result = id
      ? await DatabaseService.updateProduct(id, data)
      : await DatabaseService.createProduct(data);

    if (result.success) {
      msg.textContent = 'Saved successfully!';
      msg.className = 'text-[11px] text-teal-400';
      setTimeout(() => {
        modal.classList.add('hidden');
        renderProductsPage();
      }, 500);
    } else {
      msg.textContent = result.error;
      msg.className = 'text-[11px] text-orange-400';
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

  main.innerHTML = '<div class="w-full h-full flex items-center justify-center"><p class="text-slate-400">Loading categories...</p></div>';

  const categories = await DatabaseService.getCategories();

  const listHtml = categories.map(c => `
    <li class="flex items-center justify-between gap-3 px-3 py-2 rounded-lg bg-slate-900/80 border border-slate-800/80 hover:border-teal-500/60 card-elevated">
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-lg">${c.icon || '🏷️'}</div>
        <div class="flex flex-col">
          <span class="text-xs sm:text-sm font-medium">${c.name}</span>
          <span class="text-[10px] text-slate-500">${c.description || ''}</span>
        </div>
      </div>
      <div class="flex items-center gap-1.5">
        <button data-action="edit-category" data-id="${c.id}" class="focus-outline text-[10px] px-2 py-[2px] rounded-full bg-slate-900 text-slate-200 border border-slate-700 hover:border-teal-400">Edit</button>
        <button data-action="delete-category" data-id="${c.id}" class="focus-outline text-[10px] px-2 py-[2px] rounded-full bg-slate-900 text-slate-300 border border-slate-800 hover:border-orange-500 hover:text-orange-300">Delete</button>
      </div>
    </li>
  `).join("");

  main.innerHTML = `
    <section class="w-full h-full px-4 sm:px-6 py-4 flex flex-col gap-4 fade-in">
      <header class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 class="text-base sm:text-lg font-semibold tracking-tight">${config.categories_title}</h2>
          <p class="text-[11px] sm:text-xs text-slate-400 mt-1">Organize spare parts into clear, searchable groups.</p>
        </div>
        <button id="btn-add-category" class="focus-outline inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-teal-500 text-slate-950 text-xs sm:text-sm font-semibold shadow-sm hover:bg-teal-400">
          <span class="text-sm">＋</span>
          <span>Add category</span>
        </button>
      </header>

      <div class="flex-1 min-h-0 rounded-xl bg-slate-900/80 border border-slate-800/80 p-3 sm:p-4 flex flex-col gap-3">
        <p class="text-[11px] sm:text-xs text-slate-400">You have ${categories.length} categories.</p>
        <ul id="categories-list" class="space-y-2 overflow-auto app-scrollbar">
          ${listHtml}
        </ul>
      </div>

      <div id="category-modal" class="hidden fixed inset-0 flex items-center justify-center z-20">
        <div class="modal-backdrop absolute inset-0" id="cat-modal-backdrop"></div>
        <div class="relative w-full max-w-sm rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl mx-4">
          <form id="category-form" class="flex flex-col gap-3 px-4 sm:px-5 py-4">
            <div class="flex items-start justify-between gap-3">
              <div>
                <h3 id="category-modal-title" class="text-sm sm:text-base font-semibold">New category</h3>
                <p class="text-[11px] sm:text-xs text-slate-400 mt-1">Create or rename a category.</p>
              </div>
              <button type="button" id="btn-close-category-modal" class="focus-outline text-slate-400 hover:text-slate-200 text-lg leading-none">×</button>
            </div>

            <input type="hidden" id="category-id" />

            <div class="flex flex-col gap-1">
              <label for="category-name" class="text-[11px] text-slate-300 font-medium">Category name</label>
              <input id="category-name" type="text" required class="focus-outline text-xs px-2 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-100" />
            </div>

            <div class="flex flex-col gap-1">
              <label for="category-icon" class="text-[11px] text-slate-300 font-medium">Icon (emoji)</label>
              <input id="category-icon" type="text" maxlength="4" class="focus-outline text-xs px-2 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-100" />
            </div>

            <div class="flex flex-col gap-1">
              <label for="category-description" class="text-[11px] text-slate-300 font-medium">Description</label>
              <input id="category-description" type="text" class="focus-outline text-xs px-2 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-100" />
            </div>

            <div class="flex items-center justify-between gap-3 mt-1">
              <p id="category-form-message" class="text-[11px] text-slate-400"></p>
              <div class="flex items-center gap-2">
                <button type="button" id="btn-cancel-category" class="focus-outline px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-900 text-[11px] sm:text-xs text-slate-200 hover:border-slate-500">Cancel</button>
                <button type="submit" id="btn-save-category" class="focus-outline px-3 py-1.5 rounded-lg bg-teal-500 text-slate-950 text-[11px] sm:text-xs font-semibold hover:bg-teal-400">Save</button>
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
      document.getElementById('category-icon').value = category.icon || '';
      document.getElementById('category-description').value = category.description || '';
      modal.classList.remove('hidden');
    }
  });

  document.getElementById('category-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const msg = document.getElementById('category-form-message');
    const btn = document.getElementById('btn-save-category');
    const id = document.getElementById('category-id').value;

    const data = {
      name: document.getElementById('category-name').value,
      icon: document.getElementById('category-icon').value || '🏷️',
      description: document.getElementById('category-description').value
    };

    btn.disabled = true;
    btn.textContent = 'Saving...';

    const result = id
      ? await DatabaseService.updateCategory(id, data)
      : await DatabaseService.createCategory(data);

    if (result.success) {
      msg.textContent = 'Saved!';
      msg.className = 'text-[11px] text-teal-400';
      setTimeout(() => {
        modal.classList.add('hidden');
        renderCategoriesPage();
      }, 500);
    } else {
      msg.textContent = result.error;
      msg.className = 'text-[11px] text-orange-400';
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

  main.innerHTML = '<div class="w-full h-full flex items-center justify-center"><p class="text-slate-400">Loading orders...</p></div>';

  const orders = await DatabaseService.getOrders();

  const rowsHtml = orders.map(o => {
    let badgeClass = "inline-flex items-center px-2 py-[1px] rounded-full border text-[10px]";
    if (o.status === "pending") badgeClass += " border-orange-500/60 text-orange-300 bg-orange-500/10";
    else if (o.status === "shipped") badgeClass += " border-teal-500/60 text-teal-300 bg-teal-500/10";
    else badgeClass += " border-slate-600 text-slate-200 bg-slate-700/30";

    const itemCount = o.items?.length || 0;

    return `
      <tr class="border-b border-slate-800/80 hover:bg-slate-900/60">
        <td class="px-3 py-2 text-[11px] sm:text-xs font-medium">${o.id.substring(0, 8)}</td>
        <td class="px-3 py-2 text-xs sm:text-sm">
          <div>${o.user?.full_name || 'N/A'}</div>
          <div class="text-[10px] text-slate-400">${formatDate(o.created_at)}</div>
        </td>
        <td class="px-3 py-2 text-[11px] sm:text-xs">${itemCount} items</td>
        <td class="px-3 py-2 text-[11px] sm:text-xs text-orange-300 font-medium">${formatCurrency(o.total)}</td>
        <td class="px-3 py-2 text-[11px] sm:text-xs">
          <span class="${badgeClass}">${o.status}</span>
        </td>
        <td class="px-3 py-2 text-right">
          <select data-order-id="${o.id}" class="focus-outline bg-slate-900 border border-slate-700 rounded-full px-2 py-[1px] text-[11px] text-slate-200">
            <option value="pending" ${o.status === "pending" ? "selected" : ""}>Pending</option>
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
        <h2 class="text-base sm:text-lg font-semibold tracking-tight">${config.orders_title}</h2>
        <p class="text-[11px] sm:text-xs text-slate-400 mt-1">Track order status from pending to delivered.</p>
      </header>

      <div class="flex-1 min-h-0 rounded-xl bg-slate-900/80 border border-slate-800/80 overflow-hidden flex flex-col">
        <div class="px-3 sm:px-4 py-2 border-b border-slate-800/80">
          <p class="text-[11px] sm:text-xs text-slate-400">Total ${orders.length} orders</p>
        </div>

        <div class="flex-1 overflow-auto app-scrollbar">
          <table class="min-w-full text-left text-xs sm:text-sm">
            <thead class="bg-slate-900/90 sticky top-0 z-10">
              <tr class="text-[11px] sm:text-xs text-slate-400 border-b border-slate-800/80">
                <th scope="col" class="px-3 py-2 font-medium">Order ID</th>
                <th scope="col" class="px-3 py-2 font-medium">Customer</th>
                <th scope="col" class="px-3 py-2 font-medium">Items</th>
                <th scope="col" class="px-3 py-2 font-medium">Total</th>
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

  main.innerHTML = '<div class="w-full h-full flex items-center justify-center"><p class="text-slate-400">Loading users...</p></div>';

  const users = await DatabaseService.getUsers();

  const rowsHtml = users.map(u => {
    const statusClass = u.blocked
      ? "bg-slate-900 text-orange-300 border border-orange-500/60"
      : "bg-slate-900 text-teal-300 border border-teal-500/60";
    const statusLabel = u.blocked ? "Blocked" : "Active";
    const btnLabel = u.blocked ? "Unblock" : "Block";

    return `
      <tr class="border-b border-slate-800/80 hover:bg-slate-900/60">
        <td class="px-3 py-2 text-xs sm:text-sm">
          <div class="flex items-center gap-2">
            <div class="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center text-[11px]">
              ${u.full_name?.charAt(0) || 'U'}
            </div>
            <div class="flex flex-col">
              <span class="font-medium">${u.full_name || 'N/A'}</span>
              <span class="text-[10px] text-slate-400">${u.email}</span>
            </div>
          </div>
        </td>
        <td class="px-3 py-2 text-[11px] sm:text-xs text-slate-300">${u.role}</td>
        <td class="px-3 py-2 text-[11px] sm:text-xs">
          <span class="inline-flex items-center px-2 py-[1px] rounded-full ${statusClass} text-[10px]">
            ${statusLabel}
          </span>
        </td>
        <td class="px-3 py-2 text-right">
          <button data-user-id="${u.id}" data-blocked="${u.blocked}" class="focus-outline text-[11px] px-3 py-1 rounded-full bg-slate-900 text-slate-100 border border-slate-700 hover:border-orange-500 hover:text-orange-300">
            ${btnLabel}
          </button>
        </td>
      </tr>
    `;
  }).join("");

  main.innerHTML = `
    <section class="w-full h-full px-4 sm:px-6 py-4 flex flex-col gap-4 fade-in">
      <header>
        <h2 class="text-base sm:text-lg font-semibold tracking-tight">${config.users_title}</h2>
        <p class="text-[11px] sm:text-xs text-slate-400 mt-1">Review registered users and manage access.</p>
      </header>

      <div class="flex-1 min-h-0 rounded-xl bg-slate-900/80 border border-slate-800/80 overflow-hidden flex flex-col">
        <div class="px-3 sm:px-4 py-2 border-b border-slate-800/80">
          <p class="text-[11px] sm:text-xs text-slate-400">Total ${users.length} users</p>
        </div>

        <div class="flex-1 overflow-auto app-scrollbar">
          <table class="min-w-full text-left text-xs sm:text-sm">
            <thead class="bg-slate-900/90 sticky top-0 z-10">
              <tr class="text-[11px] sm:text-xs text-slate-400 border-b border-slate-800/80">
                <th scope="col" class="px-3 py-2 font-medium">User</th>
                <th scope="col" class="px-3 py-2 font-medium">Role</th>
                <th scope="col" class="px-3 py-2 font-medium">Status</th>
                <th scope="col" class="px-3 py-2 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody id="users-tbody">
              ${rowsHtml}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  `;

  document.getElementById('users-tbody')?.addEventListener('click', async (e) => {
    const btn = e.target.closest('button[data-user-id]');
    if (!btn) return;

    const isBlocked = btn.dataset.blocked === 'true';
    const result = await DatabaseService.updateUser(btn.dataset.userId, { blocked: !isBlocked });

    if (result.success) {
      renderUsersPage();
    } else {
      alert('Failed to update user: ' + result.error);
    }
  });
}

/* ========================================== */
/* NAVIGATION */
/* ========================================== */

function setActivePage(pageKey) {
  document.querySelectorAll(".nav-link").forEach(btn => {
    if (btn.dataset.page === pageKey) {
      btn.classList.add("bg-slate-800", "text-slate-50");
      btn.classList.remove("text-slate-300");
    } else {
      btn.classList.remove("bg-slate-800", "text-slate-50");
      btn.classList.add("text-slate-300");
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

