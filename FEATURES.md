# Car House - Website Features Documentation

This document provides a comprehensive overview of the features implemented in the Car House Admin Panel. For each feature, we detail the rationale, the **UI (Frontend) Code** responsible for display/interaction, and the **Backend (Database) Code** responsible for data persistence.

---

## 1. Authentication & Security

### 1.1 Secure Login System

**Description:** Authenticates users via Supabase Auth. It verifies credentials and strictly checks if the user has an 'admin' role before granting access.
**Why:** To protect sensitive business data and ensure only authorized staff can manage the system.

**frontend Code (UI):**

- **File:** `js/app.js` (Login Page logic is separated in `login.html` inline script)
- **File:** `login.html`
- **Lines:** 85 - 130 (Form Handler)

**Backend Code (Logic):**

- **File:** `js/auth.js`
- **Function:** `login(email, password)`
- **Lines:** 102 - 145
- **Details:** Calls `supabase.auth.signInWithPassword` and then queries the `admins` table to verify role.

---

### 1.2 Password Reset

**Description:** A self-service flow allowing users to reset their forgotten passwords via an email link.
**Why:** Reduces support overhead by allowing users to recover their own accounts secureley.

**Frontend Code (UI):**

- **File:** `login.html` (Forgot Password Button)
- **File:** `reset-password.html` (New Password Form)
- **Lines:** Entire file `reset-password.html` handles the token verification UI.

**Backend Code (Logc):**

- **File:** `js/auth.js`
- **Function:** `resetPasswordForEmail(email)` (Wrapped in `supabase.auth`)
- **Lines:** The logic uses Supabase's built-in `resetPasswordForEmail` method directly in the UI handler.

---

## 2. Product Management

### 2.1 View & Manage Products

**Description:** A data grid displaying all products with images, stock levels, and prices. Includes search and filter capabilities.
**Why:** The core catalog management interface for the business.

**Frontend Code (UI):**

- **File:** `js/app.js`
- **Function:** `renderProductsPage()`
- **Lines:** 372 - 550 (approx)
- **Details:** Generates the HTML table and attaches event listeners for buttons.

**Backend Code (Logic):**

- **File:** `js/database.js`
- **Function:** `getProducts()`
- **Lines:** 157 - 196
- **Details:** Fetches products joining with `categories` and `inventory` tables.

### 2.2 Create/Edit Product

**Description:** A modal form to add new items or update existing ones, including image uploading.
**Why:** To keep the inventory up to date.

**Frontend Code (UI):**

- **File:** `js/app.js`
- **Function:** `attachProductHandlers()` (Modal & Form Logic)
- **Lines:** 560 - 700 (approx)

**Backend Code (Logic):**

- **File:** `js/database.js`
- **Function:** `createProduct(product)` / `updateProduct(id, updates)`
- **Lines:** 198 - 217 (Create) / 219 - 237 (Update)

### 2.3 Delete Product

**Description:** Permanently removes a product.
**Why:** Cleanup of obsolete data.

**Frontend Code (UI):**

- **File:** `js/app.js`
- **Handler:** `click` event on `.btn-delete`
- **Lines:** 600 - 608

**Backend Code (Logic):**

- **File:** `js/database.js`
- **Function:** `deleteProduct(id)`
- **Lines:** 239 - 252

---

## 3. Order Management

### 3.1 View Orders

**Description:** Lists all customer orders with status indicators (Pending, Shipped, etc.).
**Why:** To track sales and fulfillment progress.

**Frontend Code (UI):**

- **File:** `js/app.js`
- **Function:** `renderOrdersPage()`
- **Lines:** 905 - 990 (approx)

**Backend Code (Logic):**

- **File:** `js/database.js`
- **Function:** `getOrders()`
- **Lines:** 426 - 445

### 3.2 Update Order Status

**Description:** A dropdown menu to instantly change an order's status (e.g. mark as Delivered).
**Why:** Streamlines the workflow without needing to open a separate edit screen.

**Frontend Code (UI):**

- **File:** `js/app.js`
- **Handler:** `change` event on `select[data-order-id]`
- **Lines:** 993 - 1002

**Backend Code (Logic):**

- **File:** `js/database.js`
- **Function:** `updateOrderStatus(id, status)`
- **Lines:** 447 - 465

### 3.3 Delete Order

**Description:** A "Delete" button to remove orders.
**Why:** Essential for removing cancelled, test, or spam orders.

**Frontend Code (UI):**

- **File:** `js/app.js`
- **Handler:** `click` event on `button[data-action="delete-order"]`
- **Lines:** 1004 - 1016

**Backend Code (Logic):**

- **File:** `js/database.js`
- **Function:** `deleteOrder(id)`
- **Lines:** 514 - 539
- **Details:** Performs a cascade delete: first deletes `order_items`, then the `orders` record.

---

## 4. Service & Workshop Management

### 4.1 Service Types (Menu)

**Description:** A management page for workshop services (e.g., Oil Change, Tire Rotation), allowing admins to set prices, icons, and visibility.
**Why:** Allows the workshop to dynamically configure their service offerings.

**Frontend Code (UI):**

- **File:** `js/app.js`
- **Function:** `renderServiceTypesPage()`
- **Lines:** 1556 - 1670

**Backend Code (Logic):**

- **File:** `js/database.js`
- **Function:** `getServiceTypes()` / `createServiceType()` / `deleteServiceType()`
- **Lines:** 900+ (New additions at end of file)

### 4.2 Workshop Bookings

**Description:** Tracks customer appointments.
**Why:** Replaces manual scheduling systems.

**Frontend Code (UI):**

- **File:** `js/app.js`
- **Function:** `renderBookingsPage()`
- **Lines:** 1217 - 1290

**Backend Code (Logic):**

- **File:** `js/database.js`
- **Function:** `getBookings()`
- **Lines:** 650+ (approx)

---

## 5. Mobile Optimization Features

### 5.1 Responsive Sidebar

**Description:** The sidebar automatically hides on small screens and can be toggled via a hamburger button.
**Why:** Critical for mobile usability.

**Frontend Code (UI):**

- **File:** `js/app.js`
- **Function:** `toggleMobileMenu()` (inside initialization)
- **Lines:** 236 - 249
- **Details:** Toggles CSS classes `-translate-x-full` and `hidden` to animate the menu.

### 5.2 Touch UX

**Description:** Larger buttons, horizontal scrolling tables, and prevented text selection.
**Why:** Makes the app feel like a native mobile app.

**Frontend Code (UI):**

- **File:** `css/styles.css`
- **Section:** `MOBILE-SPECIFIC STYLES`
- **Lines:** 155 - 200

---

## 6. Database Security

### 6.1 Row Level Security (RLS)

**Description:** Database policies that enforce "Admins Only" rules for writing data.
**Why:** Prevents hacking attempts even if the frontend code is bypassed.

**Backend Code (Logic):**

- **File:** `database.sql`
- **Section:** `ROW LEVEL SECURITY`
- **Lines:** 400 - 550
- **Details:** Uses `CREATE POLICY ... USING (is_admin())` to lock down tables.
