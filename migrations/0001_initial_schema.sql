-- TBOR Initial Schema
-- Migration: 0001_initial_schema
-- Date: 2026-02-23

-- petition_signers: stores each person who signs the petition
CREATE TABLE IF NOT EXISTS petition_signers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  zip_code TEXT NOT NULL,
  congressional_district TEXT,
  certificate_id TEXT UNIQUE NOT NULL,
  signed_at TEXT NOT NULL DEFAULT (datetime('now')),
  ip_hash TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_signers_state ON petition_signers(state);
CREATE INDEX IF NOT EXISTS idx_signers_zip ON petition_signers(zip_code);
CREATE INDEX IF NOT EXISTS idx_signers_district ON petition_signers(congressional_district);
CREATE INDEX IF NOT EXISTS idx_signers_email ON petition_signers(email);

-- businesses: certified businesses directory
CREATE TABLE IF NOT EXISTS businesses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  zip_code TEXT NOT NULL,
  category TEXT NOT NULL,
  website TEXT,
  contact_email TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  living_wage_certified INTEGER NOT NULL DEFAULT 0,
  ethical_pos_certified INTEGER NOT NULL DEFAULT 0,
  certification_status TEXT NOT NULL DEFAULT 'pending',
  applied_at TEXT NOT NULL DEFAULT (datetime('now')),
  certified_at TEXT,
  verification_notes TEXT
);

CREATE INDEX IF NOT EXISTS idx_businesses_city_state ON businesses(city, state);
CREATE INDEX IF NOT EXISTS idx_businesses_zip ON businesses(zip_code);
CREATE INDEX IF NOT EXISTS idx_businesses_status ON businesses(certification_status);
CREATE INDEX IF NOT EXISTS idx_businesses_category ON businesses(category);

-- story_submissions: hall of absurdity user-submitted stories
CREATE TABLE IF NOT EXISTS story_submissions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  author_name TEXT,
  location TEXT,
  category TEXT NOT NULL,
  tip_requested TEXT,
  story TEXT NOT NULL,
  submitted_at TEXT NOT NULL DEFAULT (datetime('now')),
  ip_hash TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending'
);

CREATE INDEX IF NOT EXISTS idx_stories_category ON story_submissions(category);
CREATE INDEX IF NOT EXISTS idx_stories_status ON story_submissions(status);
