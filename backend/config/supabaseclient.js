import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY

const supabase = createClient(supabaseUrl, supabaseKey)

async function testConnection() {
  const { data, error } = await supabase.from('products_table').select('*')
  console.log('Data:', data)
  console.log('Error:', error)
  if (error) {
    console.error('Supabase connection error (products_table):', error)
  } else {
    console.log('Supabase connection successful (products_table):')
    console.table(data)
  }
}

testConnection()

export default supabase