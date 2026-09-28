import { useState, useMemo, useRef } from 'react'
import { type Product, formatGHS } from '../lib/supabase'

type CatalogProps = {
  products: Product[]
  loading: boolean
  catalogRef: React.RefObject<HTMLDivElement | null>
}

const CATEGORY_COLORS: Record<string, string> = {
  'Leather Case Series': 'bg-amber-100 text-amber-800 border-amber-200',
  'Multi-Port Hubs': 'bg-blue-100 text-blue-800 border-blue-200',
  'Fast Cables': 'bg-emerald-100 text-emerald-800 border-emerald-200',
  'Magnetic Car Mounts': 'bg-rose-100 text-rose-800 border-rose-200',
}

function shuffle<T>(array: T[]): T[] {
  const result = [...array]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

export default function Catalog({ products, loading, catalogRef }: CatalogProps) {
  const sectionRef = useRef<HTMLElement>(null)

  const setSectionRef = (el: HTMLElement | null) => {
    ;(sectionRef as React.MutableRefObject<HTMLElement | null>).current = el
    if (catalogRef) {
      ;(catalogRef as React.MutableRefObject<HTMLDivElement | null>).current = el as HTMLDivElement | null
    }
  }

  const shuffled = useMemo(() => shuffle(products), [products])

  return (
    <section ref={setSectionRef} className="py-16 lg:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10 lg:mb-14">
          <p className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-3">
            Curated Selection
          </p>
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
            Active Inventory
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-sm lg:text-base">
            A meticulously curated catalog of premium mobile electronics and accessories.
          </p>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl lg:rounded-2xl border border-slate-200 overflow-hidden"
              >
                <div className="aspect-square skeleton-shimmer"></div>
                <div className="p-4 lg:p-5 space-y-3">
                  <div className="h-3 w-20 rounded skeleton-shimmer"></div>
                  <div className="h-4 w-full rounded skeleton-shimmer"></div>
                  <div className="h-4 w-16 rounded skeleton-shimmer"></div>
                </div>
              </div>
            ))}
          </div>
        ) : shuffled.length === 0 ? (
          <div className="text-center py-20 lg:py-32">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-slate-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
            </div>
            <p className="text-slate-400 font-medium">No products available yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
            {shuffled.map((product, idx) => (
              <ProductCard key={product.id} product={product} index={idx} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const badgeClass = CATEGORY_COLORS[product.category] || 'bg-slate-100 text-slate-700 border-slate-200'

  return (
    <div
      className="group bg-white rounded-xl lg:rounded-2xl border border-slate-200 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-slate-900/10 hover:border-slate-300 hover:-translate-y-1 animate-fade-in-up"
      style={{ animationDelay: `${Math.min(index * 60, 400)}ms`, opacity: 0 }}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-slate-100">
        {!imageLoaded && <div className="absolute inset-0 skeleton-shimmer"></div>}
        <img
          src={product.image_url}
          alt={product.name}
          className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="p-4 lg:p-5">
        <span
          className={`inline-block px-2.5 py-1 rounded-md text-[10px] lg:text-xs font-semibold tracking-wide border mb-3 ${badgeClass}`}
        >
          {product.category}
        </span>
        <h3 className="text-sm lg:text-base font-bold text-slate-900 leading-snug mb-3 line-clamp-2 min-h-[2.5rem] lg:min-h-[3rem]">
          {product.name}
        </h3>
        <p className="text-lg lg:text-xl font-extrabold text-slate-900 tracking-tight">
          {formatGHS(product.price)}
        </p>
      </div>
    </div>
  )
}
