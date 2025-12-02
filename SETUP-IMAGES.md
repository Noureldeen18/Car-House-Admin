# 📸 Image Upload Setup Guide

To enable image uploading for Categories and Products, you need to set up Supabase Storage.

## ✅ Step 1: Run the Setup Script

1.  Open your **Supabase Dashboard**.
2.  Go to the **SQL Editor** (left sidebar).
3.  Click **New Query**.
4.  Copy and paste the code from `setup-storage.sql`.
5.  Click **Run**.

This will:
- Create two storage buckets: `categories` and `products`.
- Set up security policies so:
    - Everyone can **view** images.
    - Only admins can **upload** images.

## ✅ Step 2: Refresh Your App

1.  Reload your admin panel (`index.html`).
2.  Try adding a new Category with an image.
3.  Try adding a new Product with an image.

## ⚠️ Troubleshooting

-   **"Bucket not found"**: Make sure you ran the SQL script successfully.
-   **"Permission denied"**: Ensure you are logged in as an admin.
-   **"Upload failed"**: Check the browser console (F12) for specific error messages.

## 📝 Note on Product Images

-   When you upload an image for a product, it is saved to the `products` bucket.
-   A reference is then added to the `product_images` table.
-   The main product list will display the first image found for that product.
