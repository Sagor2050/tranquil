-- Add breathing sessions table to track user breathing exercises
CREATE TABLE IF NOT EXISTS breathing_sessions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  technique VARCHAR(100) NOT NULL,
  duration_seconds INTEGER NOT NULL,
  cycles_completed INTEGER NOT NULL,
  notes TEXT,
  completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_breathing_sessions_user_id ON breathing_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_breathing_sessions_completed_at ON breathing_sessions(completed_at);
