# 🚗 Car House - Admin Panel

A modern, full-stack admin panel for managing a car spare parts e-commerce store. Built with **Supabase**, **Tailwind CSS**, and **Vanilla JavaScript** with a beautiful dark theme.

---

## 🌟 What's New

✅ **Supabase Integration** - Full backend with authentication & database  
✅ **Secure Login/Register** - Email-based authentication  
✅ **Admin-Only Access** - Role-based access control  
✅ **Real Database** - All data persisted in Supabase  
✅ **Row Level Security** - Protected data with RLS policies  

---

## ✨ Features

### 🔐 **Authentication**
- Secure email/password registration and login
- Session management with auto-logout
- Admin-only panel access
- Block/unblock user accounts

### 📊 **Dashboard**
- Real-time statistics from database
- Total products, categories, orders, and revenue
- Clean, responsive cards with hover effects

### 🛠️ **Product Management**
- Full CRUD operations with Supabase
- Category assignment
- Stock and price management
- Brand and car model compatibility tracking
- Automatic updates reflected in UI

### 🏷️ **Category Management**
- Create, edit, and delete categories
- Custom emoji icons
- Description support
- Used for product organization

### 📦 **Order Management**
- View all customer orders
- Real-time status updates (pending → shipped → delivered)
- Track order items and totals
- Customer information display

### 👥 **User Management**
- View all registered users
- Block/unblock accounts
- Role management (admin/customer)
- Email and name display

---

## 🚀 Quick Start

### 1. **Prerequisites**
- Supabase account (free tier available at [supabase.com](https://supabase.com))
- Modern web browser
- Basic SQL knowledge (optional)

### 2. **Clone or Download**
Download this project to your local machine.

### 3. **Set Up Supabase**
📖 **See [SETUP.md](SETUP.md)** for detailed instructions

**Quick version:**
1. Create a Supabase project
2. Run the `database.sql` script in SQL Editor
3. Copy your Project URL and anon key
4. Update `js/config.js` with your credentials

### 4. **Open & Run**
Open `login.html` in your browser or use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server -p 8000

# Then navigate to:
# http://localhost:8000/login.html
```

### 5. **Create Admin User**
1. Register via the app
2. In Supabase dashboard, go to Table Editor → users
3. Change your user's `role` from `customer` to `admin`
4. Log out and log back in

---

## 📁 Project Structure

```
car-house/
├── index.html              # Main admin panel (protected)
├── login.html              # Login page
├── register.html           # Registration page
├── database.sql            # Complete database schema
├── SETUP.md               # Detailed setup instructions
├── README.md              # This file
├── css/
│   └── styles.css         # Custom styles & animations
└── js/
    ├── config.js          # Supabase configuration ⚙️
    ├── auth.js            # Authentication service
    ├── database.js        # Database CRUD operations
    └── app.js             # Main application logic
```

---

## 🎯 Usage

### **First Time Setup**
1. **Register** → Create your account at `register.html`
2. **Set Admin Role** → Update your role in Supabase
3. **Login** → Access the panel at `login.html`
4. **Manage** → Start adding products, categories, and more!

### **Daily Use**
- **Dashboard** - View statistics and overview
- **Products** - Add/edit/delete car spare parts
- **Categories** - Organize products into groups
- **Orders** - Track and update customer orders
- **Users** - Manage user accounts and access

---

## 🛠️ Technology Stack

| Technology | Purpose |
|------------|---------|
| **HTML5** | Semantic structure |
| **Tailwind CSS** | Utility-first styling (CDN) |
| **Vanilla JavaScript** | No frameworks, pure JS |
| **Supabase** | Backend, auth, & database |
| **PostgreSQL** | Database (via Supabase) |
| **Row Level Security** | Data protection |

---

## 🎨 Design Features

- ✨ **Modern Dark Theme** - Slate + Orange + Teal color scheme
- 🎭 **Smooth Animations** - Fade-in effects and hover transitions
- 📱 **Fully Responsive** - Works on desktop, tablet, and mobile
- ♿ **Accessible** - Keyboard navigation and focus outlines
- 📜 **Custom Scrollbars** - Sleek, minimal design
- 🎯 **Premium UI/UX** - Professional look and feel

---

## 🔒 Security Features

- 🔐 **Supabase Authentication** - Industry-standard auth
- 🛡️ **Row Level Security (RLS)** - Database-level protection
- 👥 **Role-Based Access** - Admin/customer separation
- 🚫 **Account Blocking** - Disable user access instantly
- 📧 **Email Verification** - Optional email confirmation
- 🔑 **Session Management** - Automatic token refresh

---

## 📊 Database Schema

### Tables
- **categories** - Product categories with icons
- **products** - Car spare parts inventory
- **users** - Registered users (admin/customer)
- **orders** - Customer orders
- **order_items** - Items within each order

### Key Features
- ✅ UUID primary keys
- ✅ Foreign key relationships
- ✅ Check constraints for status/role fields
- ✅ Automatic timestamps
- ✅ Cascade deletes where appropriate

---

## 🔄 API Operations

All database operations go through `DatabaseService`:

```javascript
// Products
await DatabaseService.getProducts()
await DatabaseService.createProduct(data)
await DatabaseService.updateProduct(id, updates)
await DatabaseService.deleteProduct(id)

// Categories
await DatabaseService.getCategories()
await DatabaseService.createCategory(data)
await DatabaseService.updateCategory(id, updates)
await DatabaseService.deleteCategory(id)

// Orders
await DatabaseService.getOrders()
await DatabaseService.updateOrderStatus(id, status)
await DatabaseService.createOrder(orderData)

// Users
await DatabaseService.getUsers()
await DatabaseService.updateUser(id, updates)

// Statistics
await DatabaseService.getStatistics()
```

---

## 🚧 Future Enhancements

- [ ] Image upload with Supabase Storage
- [ ] Advanced search and filtering
- [ ] Export data to CSV/PDF
- [ ] Email notifications for orders
- [ ] Customer-facing storefront
- [ ] Shopping cart functionality
- [ ] Payment integration
- [ ] Multi-language support
- [ ] Advanced analytics dashboard
- [ ] Inventory alerts

---

## 🐛 Troubleshooting

### Common Issues

**"Failed to initialize Supabase"**
→ Update `js/config.js` with your Supabase credentials

**"Access denied. Admin privileges required"**
→ Set your user's role to `admin` in Supabase dashboard

**Login doesn't work**
→ Check if email verification is enabled in Supabase Auth settings

**Data doesn't load**
→ Verify RLS policies are created (run `database.sql` again)

📖 **See [SETUP.md](SETUP.md)** for detailed troubleshooting

---

## 📝 Configuration

### Supabase Setup
Edit `js/config.js`:
```javascript
const SUPABASE_CONFIG = {
  url: 'YOUR_SUPABASE_URL',
  anonKey: 'YOUR_SUPABASE_ANON_KEY'
};
```

### Customize UI
Edit `css/styles.css`:
```css
:root {
  --color-primary: #f97316;
  --color-secondary: #14b8a6;
  --color-background: #020617;
}
```

---

## 🤝 Contributing

This is a single-user admin panel, but feel free to:
- Fork and customize for your needs
- Report issues or bugs
- Suggest new features
- Share improvements

---

## 📄 License

This project is open source and available for personal and commercial use.

---

## 🎓 Learning Resources

- [Supabase Docs](https://supabase.com/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

---

## 🙏 Credits

Built with:
- [Supabase](https://supabase.com) - Backend as a Service
- [Tailwind CSS](https://tailwindcss.com) - CSS Framework
- Modern web standards (HTML5, ES6+ JavaScript)

---

## 📧 Support

For setup help, see **[SETUP.md](SETUP.md)**

For technical issues:
1. Check browser console (F12)
2. Review Supabase logs
3. Verify database schema

---

**🚗 Car House - Drive Your Business Forward!**

*Built with ❤️ for car spare parts retailers*
#   C a r - H o u s e - A d m i n  
 