-
- Users table
CREATE TABLE users (
    id UUID REFERENCES auth.users NOT NULL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    phone TEXT,
    role TEXT NOT NULL CHECK (role IN ('buyer', 'seller', 'admin')),
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
-
- Properties table<br>
CREATE TABLE properties (
    id BIGSERIAL PRIMARY KEY,
    seller_id UUID REFERENCES users(id) NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    price NUMERIC NOT NULL,
    type TEXT NOT NULL,
    location TEXT NOT NULL,
    bedrooms INTEGER,
    bathrooms INTEGER,
    area INTEGER,
    features TEXT[],
    image_url TEXT,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    views INTEGER DEFAULT 0,
    inquiries INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
-
- Admins table
CREATE TABLE admins (
    id UUID REFERENCES users(id) NOT NULL PRIMARY KEY,
    permissions TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW()
);
-
- Inquiries table (optional, for message tracking)
CREATE TABLE inquiries (
    id BIGSERIAL PRIMARY KEY,
    property_id BIGINT REFERENCES properties(id),
    buyer_id UUID REFERENCES users(id),
    message TEXT NOT NULL,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW()
);
-
- Row Level Security (RLS) Policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
-
- Users can read their own data
CREATE POLICY "Users can read own data" ON users
    FOR SELECT USING (auth.uid() = id);
-
- Users can update their own data<br>
CREATE POLICY "Users can update own data" ON users
    FOR UPDATE USING (auth.uid() = id);
-
- Properties policies
CREATE POLICY "Anyone can read approved properties" ON properties
    FOR SELECT USING (status = 'approved');
CREATE POLICY "Sellers can manage their properties" ON properties
    FOR ALL USING (auth.uid() = seller_id);
CREATE POLICY "Admins can manage all properties" ON properties
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users
            WHERE id = auth.uid() AND role = 'admin'
        )
    );
