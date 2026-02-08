# Supabase Setup Guide

This guide will help you set up Supabase for the Repo Motors application.

## Prerequisites

- Supabase account and project created
- Project URL and API keys from Supabase dashboard

## Step 1: Run Database Migration

1. Open your Supabase project dashboard
2. Go to **SQL Editor** (in the left sidebar)
3. Click **New query**
4. Copy the contents of `supabase/migrations/001_init_schema.sql`
5. Paste into the SQL Editor
6. Click **Run** or press `Cmd+Enter` (Mac) / `Ctrl+Enter` (Windows/Linux)

This will create:
- `vehicles` table with all necessary fields including `down_payment`
- `contacts` table for contact form submissions
- Row Level Security (RLS) policies
- Indexes for performance
- Auto-update timestamp trigger

## Step 2: Verify Tables Created

1. Go to **Table Editor** in Supabase dashboard
2. You should see two tables: `vehicles` and `contacts`
3. Click on each table to verify the structure

## Step 3: Migrate Existing Data

After running the SQL migration, migrate your existing vehicles from JSON to Supabase:

```bash
# Make sure you're in the project root
cd /Users/apple/repo-motors

# Run the migration script
npx tsx scripts/migrate-to-supabase.ts
```

The script will:
- Read all vehicles from `data/vehicles.json`
- Insert them into the Supabase `vehicles` table
- Skip vehicles that already exist (by slug)
- Show a summary of inserted, skipped, and failed records

## Step 4: Test the Connection

1. Restart your Next.js development server:
   ```bash
   npm run dev
   ```

2. Test frontend:
   - Visit `http://localhost:3000`
   - Homepage should show featured vehicles from Supabase
   - Visit `/inventory` - all vehicles should display
   - Click on a vehicle to view details

3. Test admin dashboard:
   - Visit `http://localhost:3000/admin/login`
   - Login with: `admin@repomotors.com` / `admin123`
   - View products list - should show all vehicles from Supabase
   - Try creating a new vehicle (including down payment field)
   - Edit an existing vehicle
   - View contacts page

4. Test contact form:
   - Visit `/contact`
   - Submit a contact form
   - Check admin dashboard `/admin/contacts` - submission should appear

## Environment Variables

Your `.env.local` file should have:

```env
NEXT_PUBLIC_SUPABASE_URL=https://drsmqdzugtxpbvhcsdng.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## Database Schema

### Vehicles Table

- `id` (UUID) - Primary key
- `slug` (TEXT) - Unique URL-friendly identifier
- `stock_id` (TEXT) - Unique stock identifier
- `make`, `model`, `year` - Vehicle basics
- `price`, `mileage` - Numeric fields
- **`down_payment`** (NUMERIC) - NEW: Optional down payment amount
- `engine`, `transmission`, `fuel_type`, `color` - Vehicle specs
- `vin`, `engine_capacity`, `drive_train` - Technical details
- `description`, `location` - Text fields
- `image_urls` (JSONB) - Array of image URLs (up to 10)
- `features` (JSONB) - Array of feature strings
- `inspection_report` (JSONB) - Object with inspection fields
- `created_at`, `updated_at` - Timestamps

### Contacts Table

- `id` (UUID) - Primary key
- `name`, `email` - Contact information
- `subject`, `message` - Form submission content
- `created_at` - Timestamp

## Row Level Security (RLS)

The database has RLS enabled with these policies:

**Vehicles:**
- Public can **read** all vehicles (for frontend display)
- Authenticated users (admins) can **insert**, **update**, and **delete**

**Contacts:**
- Public can **insert** (submit contact forms)
- Authenticated users (admins) can **read** all submissions

## Troubleshooting

### Migration Script Fails

If the migration script fails with "Cannot access vehicles table":
1. Verify you ran the SQL migration in Step 1
2. Check table names are exactly `vehicles` and `contacts` (lowercase)
3. Verify your `SUPABASE_SERVICE_ROLE_KEY` in `.env.local` is correct

### No Vehicles Showing on Frontend

1. Check browser console for errors
2. Verify `.env.local` has `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Restart the dev server after adding environment variables
4. Check Supabase dashboard > Table Editor > vehicles has data

### Contact Form Not Saving

1. Check RLS policies are enabled on `contacts` table
2. Verify the "Public can insert contacts" policy exists
3. Check browser console and server logs for errors

### Admin Dashboard Shows "Unauthorized"

1. The current admin auth uses cookies, not Supabase Auth
2. Login is still `admin@repomotors.com` / `admin123`
3. Supabase RLS uses `authenticated` role for API operations with service key

## Next Steps

After Supabase is working:

1. **Keep JSON files as backup** - Don't delete `data/vehicles.json` and `data/contacts.json`
2. **Test thoroughly** - Try all CRUD operations in admin dashboard
3. **Monitor usage** - Check Supabase dashboard for API usage and errors
4. **Future enhancements**:
   - Add Supabase Auth for admin users
   - Add file upload for images (Supabase Storage)
   - Add search indexes for better performance

## Support

If you encounter issues:
1. Check Supabase logs in dashboard
2. Check browser console for frontend errors
3. Check terminal for API/server errors
4. Verify all environment variables are set correctly
