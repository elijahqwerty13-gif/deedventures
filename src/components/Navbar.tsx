import { useState } from 'react'

type NavbarProps = {
  onAdminOpen: () => void
}

export default function Navbar({ onAdminOpen }: NavbarProps) {
  return (
    <nav className="bg-gray-900 text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* LOGO AREA */}
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-black tracking-wider text-gray-100">DEED</span>
          <span className="text-xs uppercase tracking-widest text-gray-400 font-semibold border-l border-gray-700 pl-2">Ventures</span>
        </div>
        
        {/* FILTER CATEGORY VIEW LINKS */}
        <div className="hidden md:flex space-x-6 text-xs uppercase tracking-wider font-semibold text-gray-300">
          <a href="#catalog" className="hover:text-white transition">Leather Cases</a>
          <a href="#catalog" className="hover:text-white transition">Multi-Port Hubs</a>
          <a href="#catalog" className="hover:text-white transition">Fast Cables</a>
          <a href="#catalog" className="hover:text-white transition">Car Mounts</a>
        </div>
        
        {/* MANUAL DASHBOARD TRIGGER BUTTON */}
        <button 
          onClick={onAdminOpen}
          className="bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white text-xs uppercase font-bold px-4 py-2 rounded-lg transition duration-200"
        >
          Owner Access
        </button>
      </div>
    </nav>
  )
}
