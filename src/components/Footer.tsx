import { type Settings } from '../lib/supabase'

type FooterProps = {
  settings: Settings | null
}

export default function Footer({ settings }: FooterProps) {
  // Use database settings if available, otherwise fall back to your exact operational store info
  const displayAddress = settings?.address || "📍 Tema-Ashaiman, Adjacent MTN main office"
  const displayPhone = settings?.phone || "📞 0535991513"

  return (
    <footer className="bg-gray-950 text-gray-400 py-12 text-sm border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12">
        <div>
          <h3 className="text-white text-xs uppercase tracking-widest font-bold mb-4">DEED Ventures</h3>
          <p className="text-xs leading-relaxed max-w-sm text-gray-500">
            Engineered for modern professionals. Our smartphone hardware accessories focus on structural integrity, minimalist executive design language, and uninterrupted performance dynamics.
          </p>
        </div>
        
        {/* Dynamic Multi-line Contact Layout Block */}
        <div className="flex flex-col justify-between items-start md:items-end text-left md:text-right space-y-4">
          <div>
            <h3 className="text-white text-xs uppercase tracking-widest font-bold mb-3">Our Store Location</h3>
            <p className="text-xs text-gray-400 whitespace-pre-line leading-relaxed">
              {displayAddress}
            </p>
          </div>
          
          <div>
            <h3 className="text-white text-xs uppercase tracking-widest font-bold mb-3">Contact Channel</h3>
            <p className="text-xs text-gray-400 whitespace-pre-line leading-relaxed">
              {displayPhone}
            </p>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-gray-900 text-center">
        <p className="text-[10px] text-gray-600">© 2026 DEED VENTURES. Premium Tech Ecosystems. All rights reserved.</p>
      </div>
    </footer>
  )
}
