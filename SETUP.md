# 🚗 Car House - Admin Panel Setup Guide

A modern, full-stack admin panel for managing a car spare parts e-commerce store with **Supabase** authentication and database.

---

## 📋 Table of Contents

- [Features](#-features)
- [Prerequisites](#-prerequisites)
- [Supabase Setup](#-supabase-setup)
- [Project Configuration](#️-project-configuration)
- [Running the Application](#-running-the-application)
- [Creating an Admin User](#-creating-an-admin-user)
- [Project Structure](#-project-structure)
- [Usage Guide](#-usage-guide)
- [Troubleshooting](#-troubleshooting)

---

## ✨ Features

### 🔐 **Authentication**
- Secure login and registration with Supabase Auth
- Admin-only access to the panel
- Session management
- Auto-logout on blocked accounts

### 📊 **Dashboard**
- Real-time statistics (products, categories, orders, revenue)
- Clean, modern dark UI

### 🛠️ **Product Management**
- Full CRUD operations (Create, Read, Update, Delete)
- Category assignment
- Stock management
- Brand and car model tracking

### 🏷️ **Category Management**
- Organize products into categories
- Custom icons with emojis
- Easy editing and deletion

### 📦 **Order Management**
- View all customer orders
- Update order status (pending, shipped, delivered, cancelled)
- Track order items and totals

### 👥 **User Management**
- View all registered users
- Block/unblock user accounts
- Role management (admin/customer)

---

## 🔧 Prerequisites

Before you begin, ensure you have:

- A **Supabase** account (free tier works!)
- A modern web browser
- Basic knowledge of SQL (for database setup)

---

## 🗄️ Supabase Setup

### Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click **"Start your project"**
3. Create a new organization (if you don't have one)
4. Create a new project:
   - **Name**: Car House
   - **Database Password**: (choose a strong password)
   - **Region**: Select closest to you
   - Click **"Create new project"**

### Step 2: Set Up the Database

1. Wait for your project to finish setting up
2. Go to the **SQL Editor** in the left sidebar
3. Click **"New query"**
4. Copy the entire contents of `database.sql` from this project
5. Paste it into the SQL editor
6. Click **"Run"** (or press Ctrl+Enter)

This will create all tables, set up Row Level Security (RLS), and insert sample data.

### Step 3: Get Your Supabase Credentials

1. Go to **Settings** (gear icon) → **API**
2. Copy the following:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon/public key** (long string starting with `eyJ...`)

---

## ⚙️ Project Configuration

### Update Supabase Configuration

1. Open `js/config.js` in your project
2. Replace the placeholder values with your Supabase credentials:

```javascript
const SUPABASE_CONFIG = {
  url: 'https://your-project-id.supabase.co',  // ← Paste your Project URL
  anonKey: 'your-anon-key-here'                 // ← Paste your anon key
};
```

**⚠️ Important:** Keep your anon key secure! Don't commit it to public repositories.

---

## 🚀 Running the Application

### Quick Start (Simple Method)

1. Open `login.html` in your web browser:
   - **Windows**: Double-click `login.html`
   - **Mac**: Right-click → Open With → Browser
   - **Linux**: `xdg-open login.html`

### Professional Method (Local Server)

For best results, use a local development server:

**Option 1: Python**
```bash
# Python 3
python -m http.server 8000

# Then open: http://localhost:8000/login.html
```

**Option 2: Node.js**
```bash
npx http-server -p 8000

# Then open: http://localhost:8000/login.html
```

**Option 3: VS Code**
- Install "Live Server" extension
- Right-click `login.html`
- Select "Open with Live Server"

---

## 👨‍💼 Creating an Admin User

By default, new registrations create **customer** accounts. To create an admin:

### Method 1: Via Supabase Dashboard (Recommended)

1. Go to your Supabase project
2. Click **Table Editor** in the sidebar
3. Select the **users** table
4. Find your user (or register first via the app)
5. Click on the row to edit it
6. Change the `role` column from `customer` to `admin`
7. Click **Save**
8. Log out and log back in to the app

### Method 2: Via SQL

1. Go to **SQL Editor**
2. Run this query (replace with your email):

```sql
UPDATE users
SET role = 'admin'
WHERE email = 'your-email@example.com';
```

---

## 📁 Project Structure

```
car-house/
├── index.html              # Main admin panel
├── login.html              # Login page
├── register.html           # Registration page
├── database.sql            # Database schema & sample data
├── SETUP.md               # This file
├── README.md              # Project overview
├── css/
│   └── styles.css         # Custom styles
└── js/
    ├── config.js          # Supabase configuration
    ├── auth.js            # Authentication service
    ├── database.js        # Database CRUD operations
    └── app.js             # Main application logic
```

---

## 📖 Usage Guide

### First Login

1. Open `register.html` in your browser
2. Fill in the registration form:
   - Full Name
   - Email Address
   - Password (minimum 6 characters)
3. Click **"Create Account"**
4. Check your email for verification (if enabled in Supabase)
5. **Make yourself an admin** (see section above)
6. Go to `login.html`
7. Login with your credentials

### Managing Products

1. Click **Products** in the sidebar
2. Click **"Add product"** button
3. Fill in the form:
   - Product name
   - Brand
   - Category (dropdown)
   - Car model (optional)
   - Price
   - Stock quantity
   - Description (optional)
4. Click **"Save"**

**Edit/Delete:**
- Click **"Edit"** to modify a product
- Click **"Delete"** to remove a product (with confirmation)

### Managing Categories

1. Click **Categories** in the sidebar
2. Click **"Add category"**
3. Enter:
   - Category name
   - Icon (emoji, e.g., ⚙️ 🛑 💡)
   - Description (optional)
4. Click **"Save"**

### Managing Orders

1. Click **Orders** in the sidebar
2. View all customer orders
3. Change status using the dropdown:
   - **Pending** → **Shipped** → **Delivered**
   - Or **Cancelled** at any time
4. Changes save automatically

### Managing Users

1. Click **Users** in the sidebar
2. View all registered users
3. Click **"Block"** to prevent login
4. Click **"Unblock"** to restore access

---

## 🔧 Troubleshooting

### "Failed to initialize Supabase"
- ✅ Check that you've updated `js/config.js` with your credentials
- ✅ Ensure your Supabase project is running (green status)
- ✅ Check browser console for errors (F12)

### "Access denied. Admin privileges required"
- ✅ Make sure you've set your user's role to `admin` in the database
- ✅ Log out and log back in after changing role

### Login doesn't work
- ✅ Verify your email if Supabase email confirmation is enabled
- ✅ Check **Authentication** → **Users** in Supabase dashboard
- ✅ Ensure user exists and is not deleted

### Data doesn't appear
- ✅ Check browser console for errors
- ✅ Verify RLS policies are set up correctly (run `database.sql` again)
- ✅ Ensure you're logged in as an admin

### Registration fails
- ✅ Password must be at least 6 characters
- ✅ Email must be valid format
- ✅ Check if email is already registered
- ✅ Verify the `handle_new_user()` function exists in your database

### Browser shows CORS errors
- ✅ Use a local server instead of opening files directly
- ✅ Check Supabase allowed domains in project settings

---

## 🎨 Customization

### Change Colors

Edit `css/styles.css` and modify the CSS variables:

```css
:root {
  --color-primary: #f97316;    /* Orange */
  --color-secondary: #14b8a6;  /* Teal */
  --color-background: #020617; /* Dark slate */
}
```

### Modify Text

Edit the `config` object in `js/app.js`:

```javascript
const config = {
  app_title: "Your App Name",
  dashboard_title: "Your Custom Title",
  // ... other titles
};
```

---

## 🔒 Security Notes

- **Never commit** `js/config.js` with real credentials to public repos
- Use **environment variables** in production
- Keep Supabase **RLS policies** enabled
- Regularly **update** Supabase client library
- Use **HTTPS** in production

---

## 📝 Sample Admin Credentials (Development Only)

After running the setup, you can create a test admin:

1. Register via the app with:
   - Email: `admin@carhouse.com`
   - Password: `admin123` (or your choice)
2. Set role to `admin` in database
3. Login with these credentials

**⚠️ Delete test accounts before going to production!**

---

## 🆘 Getting Help

If you encounter issues:

1. Check the **browser console** (F12 → Console tab)
2. Check **Supabase logs** (Logs section in dashboard)
3. Verify your database schema matches `database.sql`
4. Review RLS policies in **Database** → **Policies**

---

## 🎉 You're All Set!

Your Car House admin panel is now ready to use. Enjoy managing your car spare parts store!

**Next Steps:**
- Add real product data
- Customize the UI to match your brand
- Set up image uploads (Supabase Storage)
- Add email notifications for orders
- Build a customer-facing store

---

**Built with ❤️ using Supabase, Tailwind CSS, and Vanilla JavaScript**
