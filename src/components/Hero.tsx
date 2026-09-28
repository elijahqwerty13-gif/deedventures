type HeroProps = {
  onExplore: () => void
}

export default function Hero({ onExplore }: HeroProps) {
  return (
    <section className="relative pt-16 lg:pt-20 pb-16 lg:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[70vh] lg:min-h-[80vh]">
          {/* Left Column */}
          <div className="order-2 lg:order-1 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs font-semibold tracking-wider text-slate-600 uppercase">
                Premium Mobile Electronics
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.05] mb-6">
              Protect Your Tech.
              <br />
              <span className="text-slate-400">Elevate Your Style.</span>
            </h1>
            <p className="text-base lg:text-lg text-slate-600 leading-relaxed max-w-xl mb-8 lg:mb-10">
              Engineered for modern professionals. Discover high-performance connectivity suites
              and elite leather protection suites designed for uninterrupted daily performance.
            </p>
            <button
              onClick={onExplore}
              className="group inline-flex items-center gap-3 px-7 lg:px-8 py-3.5 lg:py-4 rounded-lg bg-slate-900 hover:bg-black text-white text-sm lg:text-base font-semibold tracking-wide transition-all duration-300 hover:shadow-2xl hover:shadow-slate-900/30 active:scale-95"
            >
              Explore Active Inventory
              <svg
                className="w-4 h-4 lg:w-5 lg:h-5 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </button>
          </div>

          {/* Right Column — Image Frame */}
          <div className="order-1 lg:order-2 animate-scale-in">
            <div className="relative aspect-[4/5] lg:aspect-square rounded-2xl lg:rounded-3xl bg-gradient-to-br from-slate-200 to-slate-300 overflow-hidden border border-slate-200/80 shadow-2xl shadow-slate-900/10">
              <div className="absolute inset-0 bg-gradient-to-br from-slate-100/50 via-transparent to-slate-400/30"></div>
              <img
                src="https://images.pexels.com/photos/10921038/pexels-photo-10921038.jpeg?auto=compress&cs=tinysrgb&w=900"
                alt="Premium smartphone showcase"
                className="w-full h-full object-cover mix-blend-multiply opacity-90"
                loading="eager"
              />
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-slate-900/20 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                <div>
                  <p className="text-xs font-semibold tracking-widest text-white/80 uppercase mb-1">
                    Signature Collection
                  </p>
                  <p className="text-lg lg:text-xl font-bold text-white">
                    Crafted for the Executive
                  </p>
                </div>
                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-slate-900"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
