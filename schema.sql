-- D1 Database Schema for Competitions
-- Table: competitions

CREATE TABLE IF NOT EXISTS competitions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    -- Competition details
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    image_reference TEXT NOT NULL, -- R2 object key
    
    -- Timing
    start_at TEXT NOT NULL, -- ISO 8601 timestamp
    end_at TEXT NOT NULL,   -- ISO 8601 timestamp
    
    -- Puzzle (optional)
    puzzle_type TEXT,            -- e.g., 'text', 'number', 'multiple_choice'
    puzzle_question TEXT,
    puzzle_hashed_answer TEXT,   -- Hashed answer for security
    
    -- Status and Timestamps
    published INTEGER NOT NULL DEFAULT 0, -- 0 for unpublished, 1 for published
    created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
    updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

-- Index for faster lookups on published status and end time
CREATE INDEX IF NOT EXISTS idx_published_end_at ON competitions (published, end_at);
