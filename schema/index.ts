import * as SQLite from 'expo-sqlite'

export const db = SQLite.openDatabaseSync('calogo.db')

export const createTables = () => {
  db.execAsync(`
  -- ============================================
  --  1. USERS
  -- ============================================
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT,
    email TEXT UNIQUE,
    gender TEXT CHECK (gender IN ('male','female','other')),
    age INTEGER,
    height REAL,
    weight REAL,
    activity_level TEXT CHECK (activity_level IN ('sedentary','light','moderate','active','very_active')),
    goal_description TEXT,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now'))
  );

  -- ============================================
  --  2. USER_GOALS
  -- ============================================
  CREATE TABLE IF NOT EXISTS user_goals (
    id TEXT PRIMARY KEY,
    user_id TEXT,
    goal_type TEXT CHECK (goal_type IN ('lose_weight','maintain','gain_muscle')),
    target_calories REAL,
    target_protein REAL,
    target_carbs REAL,
    target_fat REAL,
    start_date TEXT DEFAULT (date('now')),
    end_date TEXT,
    is_active INTEGER DEFAULT 1,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
  );
  CREATE INDEX IF NOT EXISTS idx_user_goals_user_id ON user_goals(user_id);

  -- ============================================
  --  3. USER_SETTINGS
  -- ============================================
  CREATE TABLE IF NOT EXISTS user_settings (
    user_id TEXT PRIMARY KEY,
    theme TEXT DEFAULT 'light',
    language TEXT DEFAULT 'en',
    unit_preference TEXT DEFAULT 'metric',
    reminder_enabled INTEGER DEFAULT 0,
    updated_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
  );

  -- ============================================
  --  4. FOOD_CATEGORIES
  -- ============================================
  CREATE TABLE IF NOT EXISTS food_categories (
    id TEXT PRIMARY KEY,
    user_id TEXT,
    name TEXT NOT NULL,
    icon TEXT,
    color TEXT,
    description TEXT,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
  );

  -- ============================================
  --  5. FOODS
  -- ============================================
  CREATE TABLE IF NOT EXISTS foods (
    id TEXT PRIMARY KEY,
    user_id TEXT,
    category_id TEXT,
    name TEXT NOT NULL,
    calories REAL NOT NULL,
    protein REAL DEFAULT 0,
    carbs REAL DEFAULT 0,
    fat REAL DEFAULT 0,
    unit TEXT DEFAULT '100g',
    image_url TEXT,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY(category_id) REFERENCES food_categories(id) ON DELETE SET NULL
  );
  CREATE INDEX IF NOT EXISTS idx_foods_user_id ON foods(user_id);
  CREATE INDEX IF NOT EXISTS idx_foods_category_id ON foods(category_id);

  -- ============================================
  --  6. MEAL_TYPES
  -- ============================================
  CREATE TABLE IF NOT EXISTS meal_types (
    id TEXT PRIMARY KEY,
    user_id TEXT,
    name TEXT NOT NULL,
    display_name TEXT,
    icon TEXT,
    color TEXT,
    order_index INTEGER DEFAULT 0,
    created_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
  );

  -- ============================================
  --  7. MEALS
  -- ============================================
  CREATE TABLE IF NOT EXISTS meals (
    id TEXT PRIMARY KEY,
    user_id TEXT,
    goal_id TEXT,
    meal_type_id TEXT,
    date TEXT NOT NULL,
    total_calories REAL DEFAULT 0,
    created_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY(goal_id) REFERENCES user_goals(id) ON DELETE SET NULL,
    FOREIGN KEY(meal_type_id) REFERENCES meal_types(id) ON DELETE SET NULL
  );
  CREATE INDEX IF NOT EXISTS idx_meals_user_id ON meals(user_id);
  CREATE INDEX IF NOT EXISTS idx_meals_date ON meals(date);

  -- ============================================
  --  8. MEAL_ITEMS
  -- ============================================
  CREATE TABLE IF NOT EXISTS meal_items (
    id TEXT PRIMARY KEY,
    meal_id TEXT,
    food_id TEXT,
    quantity REAL DEFAULT 0,
    calories REAL DEFAULT 0,
    protein REAL DEFAULT 0,
    carbs REAL DEFAULT 0,
    fat REAL DEFAULT 0,
    note TEXT,
    created_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY(meal_id) REFERENCES meals(id) ON DELETE CASCADE,
    FOREIGN KEY(food_id) REFERENCES foods(id) ON DELETE SET NULL
  );
  CREATE INDEX IF NOT EXISTS idx_meal_items_meal_id ON meal_items(meal_id);
  CREATE INDEX IF NOT EXISTS idx_meal_items_food_id ON meal_items(food_id);

  -- ============================================
  --  9. STATISTICS
  -- ============================================
  CREATE TABLE IF NOT EXISTS statistics (
    id TEXT PRIMARY KEY,
    user_id TEXT,
    goal_id TEXT,
    date TEXT NOT NULL,
    total_calories REAL DEFAULT 0,
    protein REAL DEFAULT 0,
    carbs REAL DEFAULT 0,
    fat REAL DEFAULT 0,
    goal_calories REAL DEFAULT 0,
    created_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY(goal_id) REFERENCES user_goals(id) ON DELETE SET NULL
  );
  CREATE INDEX IF NOT EXISTS idx_statistics_user_id ON statistics(user_id);
  CREATE INDEX IF NOT EXISTS idx_statistics_date ON statistics(date);

  -- ============================================
  --  10. ACTIVITIES
  -- ============================================
  CREATE TABLE IF NOT EXISTS activities (
    id TEXT PRIMARY KEY,
    user_id TEXT,
    name TEXT NOT NULL,
    calories_burned REAL DEFAULT 0,
    duration INTEGER,
    date TEXT NOT NULL,
    created_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
  );
  CREATE INDEX IF NOT EXISTS idx_activities_user_id ON activities(user_id);

  -- ============================================
  --  11. FAVORITES
  -- ============================================
  CREATE TABLE IF NOT EXISTS favorites (
    id TEXT PRIMARY KEY,
    user_id TEXT,
    food_id TEXT,
    created_at TEXT DEFAULT (datetime('now')),
    UNIQUE(user_id, food_id),
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY(food_id) REFERENCES foods(id) ON DELETE CASCADE
  );

  -- ============================================
  --  12. SYNC_QUEUE
  -- ============================================
  CREATE TABLE IF NOT EXISTS sync_queue (
    id TEXT PRIMARY KEY,
    table_name TEXT NOT NULL,
    record_data TEXT NOT NULL,
    synced INTEGER DEFAULT 0,
    updated_at TEXT DEFAULT (datetime('now'))
  );

  -- ============================================
  --  13. NOTIFICATIONS
  -- ============================================
  CREATE TABLE IF NOT EXISTS notifications (
    id TEXT PRIMARY KEY,
    user_id TEXT,
    title TEXT NOT NULL,
    body TEXT,
    type TEXT CHECK (type IN ('goal','meal','system','reminder')) DEFAULT 'system',
    is_read INTEGER DEFAULT 0,
    created_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
  );
  `)
}
