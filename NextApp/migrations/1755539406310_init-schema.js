/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
-- =========================
-- 1. Extensions
-- =========================
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =========================
-- 2. ENUM Types
-- =========================
CREATE TYPE user_role AS ENUM ('user', 'seller', 'admin');
CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'completed', 'cancelled', 'disputed');
CREATE TYPE transaction_type AS ENUM ('purchase', 'refund', 'withdrawal',earning,commission);
CREATE TYPE chat_sender AS ENUM ('buyer', 'seller', 'ai');
CREATE TYPE collab_status AS ENUM ('pending', 'active', 'completed');
CREATE TYPE dispute_status AS ENUM ('open', 'resolved', 'rejected');

-- =========================
-- 3. Tables
-- =========================

DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
    user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    phone VARCHAR(20) UNIQUE,
    profile_picture TEXT,
    bio TEXT,
    merit_credits INT DEFAULT 0,
    is_verified BOOLEAN DEFAULT FALSE,
    role user_role DEFAULT 'user',
    balance DECIMAL(12,2) DEFAULT 0 CHECK (balance >= 0),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

DROP TABLE IF EXISTS gigs CASCADE;
CREATE TABLE gigs (
    gig_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    seller_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    min_price DECIMAL(10,2) NOT NULL,
    avg_price DECIMAL(10,2),
    location VARCHAR(150),
    contact_info JSONB,
    availability JSONB,
    rating FLOAT DEFAULT 0,
    picture TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

DROP TABLE IF EXISTS bookings CASCADE;
CREATE TABLE bookings (
    booking_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    buyer_id UUID NOT NULL REFERENCES users(user_id),
    gig_id UUID NOT NULL REFERENCES gigs(gig_id),
    seller_id UUID NOT NULL REFERENCES users(user_id),
    status booking_status DEFAULT 'pending',
    booking_date TIMESTAMPTZ DEFAULT NOW(),
    scheduled_date DATE,
    coins_paid DECIMAL(10,2),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

DROP TABLE IF EXISTS chat CASCADE;
CREATE TABLE chat (
    chat_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    buyer_id UUID NOT NULL REFERENCES users(user_id),
    gig_id UUID REFERENCES gigs(gig_id),
    booking_id UUID REFERENCES bookings(booking_id),
    sender chat_sender NOT NULL,
    message TEXT NOT NULL,
    context JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);



DROP TABLE IF EXISTS transactions CASCADE;
CREATE TABLE transactions (
    transaction_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(user_id),       -- buyer or initiator
    seller_id UUID REFERENCES users(user_id),  
    type transaction_type NOT NULL,
    amount DECIMAL(12,2) NOT NULL CHECK (amount > 0),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

DROP TABLE IF EXISTS disputes CASCADE;
CREATE TABLE disputes (
    dispute_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID NOT NULL REFERENCES bookings(booking_id),
    raised_by UUID NOT NULL REFERENCES users(user_id),
    reason TEXT,
    resolution TEXT,
    status dispute_status DEFAULT 'open',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

DROP TABLE IF EXISTS collaborations CASCADE;
CREATE TABLE collaborations (
    collaboration_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    gig_id UUID NOT NULL REFERENCES gigs(gig_id) ON DELETE CASCADE,
    collaborator_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    role VARCHAR(50),
    contribution TEXT,
    status collab_status DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT unique_collab UNIQUE (gig_id, collaborator_id, role)
);

DROP TABLE IF EXISTS merit_history CASCADE;
CREATE TABLE merit_history (
    merit_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(user_id),
    booking_id UUID REFERENCES bookings(booking_id),
    change INT NOT NULL,
    reason TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =========================
-- 4. Auto Update Triggers
-- =========================
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_timestamp_users BEFORE UPDATE ON users
FOR EACH ROW EXECUTE PROCEDURE update_timestamp();

CREATE TRIGGER set_timestamp_gigs BEFORE UPDATE ON gigs
FOR EACH ROW EXECUTE PROCEDURE update_timestamp();

CREATE TRIGGER set_timestamp_bookings BEFORE UPDATE ON bookings
FOR EACH ROW EXECUTE PROCEDURE update_timestamp();


CREATE TRIGGER set_timestamp_collaborations BEFORE UPDATE ON collaborations
FOR EACH ROW EXECUTE PROCEDURE update_timestamp();

-- =========================
-- 5. Indexes
-- =========================
CREATE INDEX idx_gigs_category ON gigs(category);
CREATE INDEX idx_bookings_buyer ON bookings(buyer_id);
CREATE INDEX idx_bookings_seller ON bookings(seller_id);
CREATE INDEX idx_transactions_wallet ON transactions(wallet_id);
CREATE INDEX idx_disputes_booking ON disputes(booking_id);
  `);
};

exports.down = (pgm) => {
  pgm.sql(`
    DROP TABLE IF EXISTS merit_history CASCADE;
    DROP TABLE IF EXISTS collaborations CASCADE;
    DROP TABLE IF EXISTS disputes CASCADE;
    DROP TABLE IF EXISTS transactions CASCADE;
    DROP TABLE IF EXISTS wallets CASCADE;
    DROP TABLE IF EXISTS chat CASCADE;
    DROP TABLE IF EXISTS bookings CASCADE;
    DROP TABLE IF EXISTS gigs CASCADE;
    DROP TABLE IF EXISTS users CASCADE;

    DROP TYPE IF EXISTS dispute_status CASCADE;
    DROP TYPE IF EXISTS collab_status CASCADE;
    DROP TYPE IF EXISTS chat_sender CASCADE;
    DROP TYPE IF EXISTS transaction_type CASCADE;
    DROP TYPE IF EXISTS booking_status CASCADE;
    DROP TYPE IF EXISTS user_role CASCADE;
  `);
};