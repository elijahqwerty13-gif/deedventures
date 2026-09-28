import { useState, useEffect } from 'react'
import { type Product, type Settings, CATEGORIES, formatGHS, supabase } from '../lib/supabase'

type AdminDashboardProps = {
  open: boolean
  onClose: () => void
  products: Product[]
  settings: Settings | null
  onProductsChange: () => void
  onSettingsChange: () => void
}

const MASTER_PASSWORD = 'deed'

export default function AdminDashboard({
  open,
  onClose,
  products,
  settings,
  onProductsChange,
  onSettingsChange,
}: AdminDashboardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  
  // Product form states
  const [name, setName] = useState('')
  const [category, setCategory] = useState(CATEGORIES[0] || '')
  const [price, setPrice] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [description, setDescription] = useState('')
  
  // Settings form states
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

  useEffect(() => {
    if (settings) {
      setAddress(settings.address || '')
      setPhone(settings.phone || '')
    }
  }, [settings])

  if (!open) return null

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === MASTER_PASSWORD) {
      setIsAuthenticated(true)
      setMessage({ type: '', text: '' })
    } else {
      setMessage({ type: 'error', text: 'Access Denied: Invalid Master Password.' })
    }
  }

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage({ type: '', text: '' })

    try {
      const { error } = await supabase.from('products').insert([
        {
          name,
          category,
          price: parseFloat(price),
          image_url: imageUrl,
          description,
        },
      ])

      if (error) throw error

      setMessage({ type: 'success', text: 'Product published securely onto storefront!' })
      setName('')
      setPrice('')
      setImageUrl('')
      setDescription('')
      onProductsChange()
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Remove item completely from your public showcase page?')) return

    try {
      const { error } = await supabase.from('products').delete().eq('id', id)
      if (error) throw error
      onProductsChange()
    } catch (err: any) {
      alert(err.message)
    }
  }

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage({ type: '', text: '' })

    try {
      let error
      if (settings?.id) {
        const { error: err } = await supabase
          .from('settings')
          .update({ address, phone })
          .eq('id', settings.id)
        error = err
      } else {
        const { error: err } = await supabase
          .from('settings')
          .insert([{ address, phone }])
        error = err
      }

      if (error) throw error
      setMessage({ type: 'success', text: 'Contact configuration parameters synchronized!' })
      onSettingsChange()
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 bg-gray-950 flex items-center justify-center z-50">
        <div className="max-w-sm w-full bg-gray-900 border border-gray-800 p-8 rounded-xl shadow-2xl mx-4 text-center">
          <h2 className="text-xl font-black tracking-widest text-gray-100 mb-1">DEED VENTURES</h2>
          <p className="text-xs text-gray-500 mb-6">OWNER ACCESS VERIFICATION</p>
          
          {message.text && (
            <p className="text-xs text-red-400 mb-4 bg-red-950/30 border border-red-900/50 p-2 rounded">{message.text}</p>
          )}
          
          <form onSubmit={handleLogin}>
            <input
              type="password"
              placeholder="Enter dashboard password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-950 border border-gray-700 rounded p-2.5 text-sm text-center outline-none text-white mb-4 focus:border-gray-500"
            />
            <button type="submit" className="w-full bg-white text-gray-900 font-bold text-xs uppercase tracking-widest py-3 rounded hover:bg-gray-100 transition">
              Enter Dashboard
            </button>
          </form>
          <button onClick={onClose} className="text-xs text-gray-500 hover:text-gray-400 mt-4 block mx-auto underline">
            Cancel
          </button>
        </div>
      </div>
    )
  }
  return (
    <div className="fixed inset-0 bg-gray-950 z-50 overflow-y-auto min-h-screen text-white">
      <nav className="bg-gray-900 p-6 flex justify-between items-center max-w-6xl mx-auto rounded-b-xl border-b border-gray-800">
        <h1 className="text-xs font-black tracking-widest text-gray-400 uppercase">DEED Ventures Control Panel</h1>
        <button onClick={onClose} className="text-xs bg-gray-800 px-3 py-1.5 rounded text-gray-300 hover:text-white transition">
          ← Exit to Main Store
        </button>
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-3 gap-8">
        <div className="space-y-6">
          {message.text && (
            <div className={`text-xs p-3 rounded border ${message.type === 'success' ? 'bg-green-950/30 border-green-900 text-green-400' : 'bg-red-950/30 border-red-900 text-red-400'}`}>
              {message.text}
            </div>
          )}

          {/* Product Form */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 shadow-lg">
            <h2 className="text-xs font-bold text-gray-400 uppercase mb-4 tracking-wider">Post New Item</h2>
            <form onSubmit={handleAddProduct} className="space-y-3">
              <input
                type="text"
                placeholder="Item Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-gray-950 border border-gray-800 rounded p-2 text-xs outline-none text-white focus:border-gray-500"
              />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-gray-950 border border-gray-800 rounded p-2 text-xs outline-none text-gray-400 focus:border-gray-500"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <input
                type="number"
                step="0.01"
                placeholder="Price (GH₵)"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                className="w-full bg-gray-950 border border-gray-800 rounded p-2 text-xs outline-none text-white focus:border-gray-500"
              />
              <input
                type="url"
                placeholder="Image URL"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                required
                className="w-full bg-gray-950 border border-gray-800 rounded p-2 text-xs outline-none text-white focus:border-gray-500"
              />
              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
                className="w-full bg-gray-950 border border-gray-800 rounded p-2 text-xs outline-none text-white focus:border-gray-500"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-white text-gray-900 font-bold text-xs uppercase py-2.5 rounded hover:bg-gray-200 transition disabled:opacity-50"
              >
                {isSubmitting ? 'Publishing...' : 'Publish Item'}
              </button>
            </form>
          </div>

          {/* Edit Contact Settings Form */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 shadow-lg">
            <h2 className="text-xs font-bold text-gray-400 uppercase mb-4 tracking-wider">Edit Contact Settings</h2>
            <form onSubmit={handleSaveSettings} className="space-y-3">
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-1">Company Locations (Hit enter for next line)</label>
                <textarea
                  id="set-address"
                  rows={3}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="e.g. 📍 Osu branch, Accra&#10;📍 Adum branch, Kumasi"
                  className="w-full bg-gray-950 border border-gray-800 rounded p-2 text-xs outline-none text-white focus:border-gray-500"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-1">Contact Lines (Hit enter for next line)</label>
                <textarea
                  id="set-phone"
                  rows={3}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 📞 Sales: +233 24...&#10;📞 Delivery: +233 55..."
                  className="w-full bg-gray-950 border border-gray-800 rounded p-2 text-xs outline-none text-white focus:border-gray-500"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gray-800 border border-gray-700 text-gray-300 font-bold text-xs uppercase py-2 rounded hover:bg-gray-700 transition disabled:opacity-50"
              >
                {isSubmitting ? 'Saving...' : 'Save Details'}
              </button>
            </form>
          </div>
        </div>

        {/* Active Inventory Manager List */}
        <div className="md:col-span-2 bg-gray-900 border border-gray-800 rounded-xl p-5 shadow-lg">
          <h2 className="text-xs font-bold text-gray-400 uppercase mb-4 tracking-wider">Active Inventory Manager</h2>
          <div className="space-y-2 max-h-[600px] overflow-y-auto">
            {products.length === 0 ? (
              <p className="text-xs text-gray-600">No items uploaded yet.</p>
            ) : (
              products.map((p) => (
                <div key={p.id} className="flex items-center justify-between p-3 bg-gray-950 rounded border border-gray-800 text-xs">
                  <div className="flex items-center space-x-3">
                    <img 
                      src={p.image_url} 
                      className="w-8 h-8 object-cover rounded bg-gray-900" 
                      onError={(e) => {(e.target as HTMLImageElement).src = 'https://placeholder.com'}}
                    />
                    <div>
                      <h4 className="font-bold text-gray-200">{p.name}</h4>
                      <p className="text-[10px] text-gray-500">{p.category} — {formatGHS(p.price)}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteProduct(p.id)}
                    className="bg-red-950 text-red-400 border border-red-900 px-3 py-1 rounded hover:bg-red-900 hover:text-white transition"
                  >
                    Remove
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
