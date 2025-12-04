"use client"; 

import Link from "next/link";
import { ShoppingBag, Search, Menu } from "lucide-react"; 

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="text-xl font-bold tracking-tight text-black">
          Morasu
        </Link>

        {/* Menú Centro (Escritorio) */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-600">
          <Link href="/shop" className="hover:text-black transition-colors">Tienda</Link>
          <Link href="/about" className="hover:text-black transition-colors">Empresa</Link>
          <Link href="/support" className="hover:text-black transition-colors">Soporte</Link>
        </div>

        {/* Iconos Derecha */}
        <div className="flex items-center space-x-5 text-gray-600">
          <button><Search size={20} /></button>
          <button className="relative">
            <ShoppingBag size={20} />
            <span className="absolute -top-1 -right-1 h-2 w-2 bg-blue-600 rounded-full"></span>
          </button>
          <button className="md:hidden"><Menu size={20} /></button>
        </div>

      </div>
    </nav>
  );
}