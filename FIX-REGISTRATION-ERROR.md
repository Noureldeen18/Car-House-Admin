# 🔧 Fix: "Database error saving new user"

## ✅ **Solution (2 Steps)**

### **Step 1: Run the SQL Fix**

1. Open **Supabase Dashboard**
2. Go to **SQL Editor**
3. Open the file `fix-profile-creation.sql`
4. Copy **ALL** the code
5. Paste into SQL Editor
6. Click **RUN** (or Ctrl+Enter)

This will:
- ✅ Fix the trigger
- ✅ Update RLS policies
- ✅ Allow profile creation

---

### **Step 2: Refresh Your App**

1. **Hard refresh** your browser (Ctrl+Shift+R or Cmd+Shift+R)
2. Try registering again
3. Should work now! ✅

---

## 🎯 **What Was Wrong?**

The RLS (Row Level Security) policy was blocking profile creation during registration. The new `auth.js` now:

1. Creates profiles **manually** (doesn't rely on trigger)
2. Has **fallback** if trigger works
3. **Auto-creates** missing profiles on login
4. Has **better error handling**

---

## 🧪 **Test It:**

### **Try Registering:**
1. Go to `register.html`
2. Fill in:
   - **Full Name:** Test User
   - **Email:** test@example.com
   - **Password:** test123456
3. Click **Create Account**
4. Should succeed! ✅

### **Check Profile Was Created:**
Run this in Supabase SQL Editor:
```sql
SELECT * FROM public.profiles 
ORDER BY created_at DESC 
LIMIT 5;
```

You should see your new profile!

---

## ⚠️ **Still Getting Errors?**

### **Error: "permission denied for table profiles"**

**Fix:** Run this:
```sql
GRANT ALL ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
```

---

### **Error: "duplicate key value violates unique constraint"**

**Meaning:** Profile already exists!

**Fix:** Just login instead of registering.

Or delete and try again:
```sql
-- Find the user
SELECT id, email FROM auth.users 
WHERE email = 'your@email.com';

-- Delete (this will cascade to profiles)
DELETE FROM auth.users 
WHERE email = 'your@email.com';
```

---

### **Error: "new row violates row-level security policy"**

**Fix:** The SQL script should have fixed this. Try:

1. Run `fix-profile-creation.sql` again
2. Make sure this policy exists:
```sql
SELECT policyname FROM pg_policies 
WHERE tablename = 'profiles' 
AND policyname = 'Allow profile creation via trigger';
```

Should return: `Allow profile creation via trigger`

---

## 🔍 **Debug Mode**

Open browser console (F12) and try registering. You'll see detailed logs:

```
✅ Supabase client initialized
⚠️ Profile insert failed (might already exist): {...}
✅ Profile created successfully
```

---

## ✅ **Verify Everything Works:**

### **1. Can Register?**
```bash
✅ Go to register.html
✅ Create account
✅ See success message
```

### **2. Profile Created?**
```sql
SELECT * FROM public.profiles WHERE email = 'your@email.com';
```

### **3. Can Login?**
```bash
✅ Go to login.html  
✅ Enter credentials
✅ Access admin panel (if you're admin)
```

---

## 📝 **Summary:**

**Old behavior:**
- Relied on database trigger
- Trigger had RLS issues
- Failed silently

**New behavior:**
- ✅ Creates profile manually in auth.js
- ✅ Has fallback to trigger
- ✅ Better error messages
- ✅ Auto-fixes missing profiles on login

---

## 🎉 **You're Set!**

After running `fix-profile-creation.sql`, registration should work perfectly!

**Still stuck?** Check browser console for specific error messages and let me know!
