# 🚗 Car House - Quick Reference Card

## 🚀 Quick Start Checklist

- [ ] Create Supabase account at [supabase.com](https://supabase.com)
- [ ] Create new Supabase project
- [ ] Run `database.sql` in SQL Editor
- [ ] Copy Project URL and anon key
- [ ] Update `js/config.js` with credentials
- [ ] Open `login.html` in browser
- [ ] Register your first account
- [ ] Set role to 'admin' in Supabase dashboard
- [ ] Login and start managing!

---

## 📂 File Overview

| File | Purpose |
|------|---------|
| `login.html` | User login page |
| `register.html` | User registration page |
| `index.html` | Main admin panel (protected) |
| `database.sql` | Complete database schema |
| `SETUP.md` | Detailed setup guide |
| `README.md` | Project documentation |
| `js/config.js` | **⚙️ Configure your Supabase here** |
| `js/auth.js` | Authentication service |
| `js/database.js` | Database operations |
| `js/app.js` | Main application |
| `css/styles.css` | Custom styles |

---

## 🔑 Important Credentials

### Supabase Configuration (`js/config.js`)
```javascript
const SUPABASE_CONFIG = {
  url: 'YOUR_SUPABASE_URL',      // ← Get from Supabase Settings → API
  anonKey: 'YOUR_ANON_KEY'        // ← Get from Supabase Settings → API
};
```

### Where to Find Them:
1. Go to your Supabase project
2. Click **Settings** (gear icon) → **API**
3. Copy **Project URL** and **anon public key**

---

## 👨‍💼 Making Yourself Admin

### In Supabase Dashboard:
1. **Table Editor** → **users** table
2. Find your user row
3. Change `role` from `customer` to `admin`
4. Save
5. Log out and log back in

### Or via SQL:
```sql
UPDATE users
SET role = 'admin'
WHERE email = 'your-email@example.com';
```

---

## 🌐 Running Locally

### Simple Method:
```bash
# Just double-click login.html
```

### Professional Method:
```bash
# Python 3
python -m http.server 8000

# Node.js
npx http-server -p 8000

# Then open:
http://localhost:8000/login.html
```

---

## 🎯 User Roles

| Role | Access Level |
|------|-------------|
| **admin** | Full access to admin panel |
| **customer** | Can only place orders (future) |

**Default:** New users are `customer` by default

---

## 📊 Database Tables

| Table | Purpose |
|-------|---------|
| `categories` | Product categories |
| `products` | Car spare parts inventory |
| `users` | Registered users |
| `orders` | Customer orders |
| `order_items` | Items in orders |

---

## 🔒 Security Checklist

- ✅ RLS (Row Level Security) enabled on all tables
- ✅ Admin-only access to panel
- ✅ Secure authentication with Supabase
- ✅ Session management
- ✅ Block/unblock users capability
- ✅ Protected API endpoints

---

## 🐛 Common Issues & Fixes

### "Failed to initialize Supabase"
**Fix:** Update `js/config.js` with your credentials

### "Access denied"
**Fix:** Set your role to `admin` in database

### "Login doesn't work"
**Fix:** Verify email in Supabase if required

### Data doesn't show
**Fix:** Check RLS policies are created

### CORS errors
**Fix:** Use a local server, don't open files directly

---

## 🎨 Color Scheme

| Color | Hex | Usage |
|-------|-----|-------|
| Orange | `#f97316` | Primary actions |
| Teal | `#14b8a6` | Secondary actions |
| Dark Slate | `#020617` | Background |
| Light Slate | `#0f172a` | Cards/panels |
| Gray | `#e5e7eb` | Text |

---

## 📱 Pages Overview

### 🔐 Login Page (`login.html`)
- Email/password login
- Link to registration
- Admin access only

### ✍️ Register Page (`register.html`)
- Create new account
- Email verification (optional)
- Automatic customer role

### 🏠 Admin Panel (`index.html`)
- **Dashboard** - Statistics
- **Products** - CRUD operations
- **Categories** - Organize products
- **Orders** - Track & update
- **Users** - Manage accounts

---

## 🔧 Development

### Tech Stack:
- HTML5
- Tailwind CSS (CDN)
- Vanilla JavaScript
- Supabase (Backend)
- PostgreSQL (Database)

### No Build Required:
Just edit and refresh! 🎉

---

## 📞 Need Help?

1. Read **SETUP.md** for detailed instructions
2. Check **README.md** for features
3. Review browser console (F12)
4. Check Supabase logs
5. Verify database schema

---

## ✅ Post-Setup Test

After setup, verify:
- [ ] Can register new account
- [ ] Can login as admin
- [ ] Dashboard shows statistics
- [ ] Can add/edit/delete products
- [ ] Can create categories
- [ ] Can view orders
- [ ] Can manage users

---

## 🎯 Next Steps After Setup

1. **Add Real Data** - Replace sample products
2. **Customize UI** - Edit colors in `css/styles.css`
3. **Add Images** - Set up Supabase Storage
4. **Email Setup** - Configure email templates
5. **Go Live** - Deploy to production!

---

**🚗 Car House - Your Complete Admin Solution**

*For support, see SETUP.md | For features, see README.md*
