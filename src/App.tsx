import { useState, useEffect, useCallback } from 'react'
import { type Product, type Settings, supabase } from './lib/supabase'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Catalog from './components/Catalog'
import Footer from './components/Footer'
import AdminDashboard from './components/AdminDashboard'

export default function App() {
  const [products, setProducts] = useState<Product[]>([])
  const [settings, setSettings] = useState<Settings | null>(null)
  const [loading, setLoading] = useState(true)
  const [isAdminOpen, setIsAdminOpen] = useState(false)

  // 1. Fetch Products and Shuffle Randomly
  const fetchProducts = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
      
      if (error) throw error
      
      if (data) {
        // Randomize the product array sequence on every refresh
        const shuffled = (data as Product[]).sort(() => Math.random() - 0.5)
        setProducts(shuffled)
      }
    } catch (err: any) {
      console.error('Error fetching products:', err.message)
    }
  }, [])

  // 2. Fetch Operational Configuration Settings
  const fetchSettings = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('settings')
        .select('*')
        .maybeSingle()

      if (error) throw error

      if (data) {
        setSettings(data as Settings)
      } else {
        // Set hardcoded default values if the database is empty
        setSettings({
          id: '',
          address: '📍 Tema-Ashaiman, Adjacent MTN main office',
          phone: '📞 0535991513',
          created_at: new Date().toISOString()
        })
      }
    } catch (err: any) {
      console.error('Error fetching settings:', err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchProducts()
    fetchSettings()
  }, [fetchProducts, fetchSettings])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center font-sans">
        <p className="text-sm font-semibold tracking-wider text-slate-500 uppercase animate-pulse">
          Loading DEED Ventures Showcase...
        </p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-slate-900 selection:text-white">
      {/* Structural Components Passing Active State Data */}
      <Navbar onAdminOpen={() => setIsAdminOpen(true)} />
      
      <Hero />
      
      <main>
        <Catalog products={products} />
      </main>
      
      <Footer settings={settings} />

      {/* Hidden Management Control Panel Sheet */}
      <AdminDashboard 
        open={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        products={products}
        settings={settings}
        onProductsChange={fetchProducts}
        onSettingsChange={fetchSettings}
      />
    </div>
  )
}
