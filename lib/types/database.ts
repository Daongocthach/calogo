export type UUID = string

export interface User {
  id: UUID
  name: string | null
  email: string
  gender: 'male' | 'female' | 'other' | null
  age: number | null
  height: number | null
  weight: number | null
  activity_level: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active' | null
  goal_description: string | null
  created_at: string
  updated_at: string
}

export interface UserGoal {
  id: UUID
  user_id: UUID
  goal_type: 'lose_weight' | 'maintain' | 'gain_muscle'
  target_calories: number
  target_protein: number
  target_carbs: number
  target_fat: number
  start_date: string
  end_date: string | null
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface UserSettings {
  user_id: UUID
  theme: 'light' | 'dark'
  language: string
  unit_preference: 'metric' | 'imperial'
  reminder_enabled: boolean
  updated_at: string
}

export interface FoodCategory {
  id: UUID
  user_id: UUID
  name: string
  icon?: string | null
  color?: string | null
  description?: string | null
  created_at: string
  updated_at: string
}

export interface Food {
  id: UUID
  user_id: UUID
  category_id: UUID | null
  name: string
  calories: number
  protein: number
  carbs: number
  fat: number
  unit: string
  image_url?: string | null
  created_at: string
  updated_at: string
}

export interface MealType {
  id: UUID
  user_id: UUID
  name: string
  display_name?: string
  icon?: string | null
  color?: string | null
  background_color?: string | null
  order_index: number
  created_at: string
}

export interface Meal {
  id: UUID
  user_id: UUID
  goal_id?: UUID | null
  meal_type_id?: UUID | null
  date: string
  total_calories: number
  created_at: string
}

export interface MealItem {
  id: UUID
  meal_id: UUID
  food_id: UUID | null
  quantity: number
  calories: number
  protein: number
  carbs: number
  fat: number
  note?: string | null
  created_at: string
}

export interface Statistic {
  id: UUID
  user_id: UUID
  goal_id: UUID | null
  date: string
  total_calories: number
  protein: number
  carbs: number
  fat: number
  goal_calories: number
  created_at: string
}

export interface Activity {
  id: UUID
  user_id: UUID
  name: string
  calories_burned: number
  duration: number
  date: string
  created_at: string
}

export interface Favorite {
  id: UUID
  user_id: UUID
  food_id: UUID
  created_at: string
}

export interface SyncQueue {
  id: UUID
  table_name: string
  record_data: Record<string, any>
  synced: boolean
  updated_at: string
}

export interface Notification {
  id: UUID
  user_id: UUID
  title: string
  body?: string | null
  type: 'goal' | 'meal' | 'system' | 'reminder'
  is_read: boolean
  created_at: string
}
