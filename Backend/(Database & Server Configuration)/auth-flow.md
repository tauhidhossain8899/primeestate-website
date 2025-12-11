# Authentication Flow
## User Registration Process
1. User fills registration form
2. Supabase Auth creates user account
3. User profile created in database
4. Email verification (if enabled)
5. User can login and access dashboard
## Login Process
1. Credentials validated by Supabase Auth
2. User profile fetched from database
3. Redirected to appropriate dashboard based on role
## Role-Based Access
- **Buyer**: Browse properties, send inquiries, save favorites
- **Seller**: List properties, manage listings, respond to inquiries
- **Admin**: Approve properties, manage users, view analytics
