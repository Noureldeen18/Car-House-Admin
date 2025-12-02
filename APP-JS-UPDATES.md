# Field Mapping Updates for app.js

## Changes to Make in `js/app.js`:

### **Products Section:**

Replace `p.name` with `p.title`
Replace `p.stock` with `p.total_stock`
Replace `product.name` with `product.title`

### **Orders Section:**

Replace `o.user?.full_name` with `o.profile?.full_name`
Replace `o.total` with `o.total_amount`

### **Users Section:**

Replace `DatabaseService.getUsers()` with `DatabaseService.getProfiles()`
Replace `users` variable with `profiles`

### **Product Form:**

Add fields for:
- `sku` (SKU field)
- `tags` (if needed)
- `is_active` checkbox
- `is_new` checkbox

Current fields to update in form submission:
- `name` → `title`

---

## Quick Find & Replace:

In `js/app.js`, use your editor's find & replace:

1. Find: `p.name`  
   Replace: `p.title`

2. Find: `product.name`  
   Replace: `product.title`

3. Find: `p.stock`  
   Replace: `p.total_stock || 0`

4. Find: `o.user?.full_name`  
   Replace: `o.profile?.full_name`

5. Find: `o.total`  
   Replace: `o.total_amount`

6. Find: `DatabaseService.getUsers()`  
   Replace: `DatabaseService.getProfiles()`

7. Find: `const users =`  
   Replace: `const profiles =`

8. Find: `users.map(u =>`  
   Replace: `profiles.map(u =>`

9. Find: `${users.length}`  
   Replace: `${profiles.length}`

---

## Or Use This Updated Form Data Object:

In the product form submission (around line 436), replace the `data` object with:

```javascript
const data = {
  title: document.getElementById('product-name').value,  // Changed from 'name'
  sku: document.getElementById('product-sku')?.value || null,  // New field
  brand: document.getElementById('product-brand').value,
  category_id: document.getElementById('product-category').value || null,
  price: parseFloat(document.getElementById('product-price').value),
  description: document.getElementById('product-description').value,
  is_active: true,  // Can add checkbox for this
  is_new: false      // Can add checkbox for this
};
```

---

## Note:

The database service (`database.js`) already handles these correctly!
Only `app.js` needs these field name updates to match your new schema.
