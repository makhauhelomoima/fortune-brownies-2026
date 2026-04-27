import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// FORT KNOX PRICING: M250 until July 25, then M500
export const getCurrentPricing = async () => {
  const launchEndDate = new Date('2026-07-25T23:59:59')
  const now = new Date()
  
  const isLaunch = now <= launchEndDate
  const daysLeft = isLaunch? Math.ceil((launchEndDate - now) / (1000 * 60 * 60 * 24)) : 0
  
  const priceMaloti = isLaunch? 250 : 500
  const priceUSD = isLaunch? 14.38 : 28.76
  
  return {
    price: priceMaloti,
    usd: priceUSD,
    isLaunch: isLaunch,
    daysLeft: daysLeft
  }
}

// FORT KNOX: Get current logged-in user profile from public.users
export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null
  
  const { data, error } = await supabase
   .from('users')
   .select('*')
   .eq('auth_id', user.id)
   .single()
    
  if (error) {
    console.error('Fort Knox user fetch error:', error)
    return null
  }
  
  return data
}

// FORT KNOX: Sign out
export const signOut = async () => {
  await supabase.auth.signOut()
    }
