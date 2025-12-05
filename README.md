# Car House - Admin Panel

A modern, responsive admin panel for managing a car spare parts e-commerce store. Built with HTML, JavaScript, Tailwind CSS, and Supabase backend.

![Car House Admin Panel](Logo.png)

## 🚗 Features

### Dashboard
- **Overview Statistics**: Total products, categories, orders, and revenue
- **Real-time Data**: Connected to Supabase for live data updates

### Product Management
- **Full CRUD Operations**: Create, read, update, and delete products
- **Product Details**: Name, brand, category, car model, price, stock
- **⭐ Rating Control**: Set product ratings (0-5 stars) with interactive slider
- **Image Upload**: Upload product images (PNG, JPG, SVG, WebP, GIF)
- **Category Association**: Link products to categories

### Category Management
- **Category CRUD**: Manage product categories
- **Icon Upload**: Upload category icons/images (supports SVG)
- **Description Support**: Add descriptions for each category

### Order Management
- **Order Tracking**: View all customer orders
- **💰 Tax Breakdown**: Shows subtotal, 14% VAT tax, and total
- **Status Updates**: Change order status (Pending → Processing → Shipped → Delivered)
- **Customer Information**: View customer details and order date

### User Management
- **➕ Create Users**: Add new users with full details
- **🔐 Role Management**: Assign roles (Customer, Admin, Super Admin)
- **Block/Unblock**: Control user access
- **Profile View**: See user details and status

## 💰 Financial Features

- **Currency**: Egyptian Pound (EGP)
- **Tax Rate**: 14% VAT automatically calculated
- **Price Display**: All prices shown with tax breakdown

## 🛠️ Technology Stack

| Technology | Purpose |
|------------|---------|
| HTML5 | Structure |
| Tailwind CSS | Styling (via CDN) |
| JavaScript | Application Logic |
| Supabase | Backend (Auth, Database, Storage) |

## 📁 Project Structure

```
car-house/
├── index.html          # Main admin panel
├── login.html          # Login page
├── register.html       # Registration page
├── Logo.png            # Brand logo
├── database.sql        # Complete database schema
├── css/
│   └── styles.css      # Custom styles
├── js/
│   ├── app.js          # Main application
│   ├── auth.js         # Authentication service
│   ├── config.js       # Supabase configuration
│   └── database.js     # Database operations
└── *.sql               # Migration scripts
```

## 🚀 Quick Start

### 1. Setup Supabase

1. Create a [Supabase](https://supabase.com) project
2. Run `database.sql` in the SQL Editor
3. Run `fix-storage.sql` for image storage
4. Run `add-rating-column.sql` for product ratings

### 2. Configure the App

Edit `js/config.js`:
```javascript
const SUPABASE_URL = 'https://YOUR_PROJECT.supabase.co';
const SUPABASE_ANON_KEY = 'YOUR_ANON_KEY';
```

### 3. Create Admin User

1. Register a new account
2. In Supabase SQL Editor, run:
```sql
-- Update profile role
UPDATE profiles SET role = 'admin' WHERE email = 'your@email.com';

-- Add to admins table
INSERT INTO admins (user_id, role, meta)
SELECT id, 'superadmin', '{"permissions": ["all"]}'::jsonb
FROM profiles WHERE email = 'your@email.com';
```

### 4. Launch

Open `index.html` in your browser or use a local server:
```bash
npx serve .
```

## 📦 Database Schema

### Core Tables
- `profiles` - User profiles (linked to Supabase Auth)
- `admins` - Admin users with roles
- `categories` - Product categories
- `products` - Product catalog with ratings
- `orders` - Customer orders
- `order_items` - Order line items

### Additional Tables
- `product_images` - Multiple images per product
- `inventory` - Stock management by store
- `reviews` - Customer reviews
- `coupons` - Discount codes
- `audit_logs` - Admin activity tracking

## 🔒 Security

- **Row Level Security (RLS)**: All tables protected
- **Role-based Access**: Admin-only operations
- **Secure Authentication**: Supabase Auth integration

## 🎨 Theme

- **Light Mode**: Clean, modern light theme
- **Primary Color**: Orange (#f97316)
- **Secondary Color**: Teal (#0d9488)
- **Font**: Inter (system fonts fallback)

## 📱 Mobile App Integration

This admin panel works with the Car House mobile app:
- Shared Supabase backend
- Public storage URLs for images
- Real-time data sync

## 📄 License

MIT License - Feel free to use for your projects.

---

**Car House Admin Panel** - Built with ❤️ for car enthusiasts