// componentes/layout/Navbar.tsx
"use client";

import Link from "next/link";
import { ShoppingBag, Search, Menu, Zap } from "lucide-react"; 

export default function Navbar() {
  return (
    // IMPORTANTE: 'pointer-events-auto' para que los botones funcionen
    <nav className="fixed top-0 w-full z-50 transition-all duration-300 pointer-events-auto">
      
      {/* Caja con efecto vidrio (Blur) y borde suave */}
      <div className="mx-auto max-w-7xl px-6 h-20 flex items-center justify-between bg-black/10 backdrop-blur-md border-b border-white/5">
        
        {/* LOGO con degradado morado */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-purple-600 p-1.5 rounded-lg group-hover:rotate-12 transition-transform">
            <Zap size={20} className="text-white fill-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            NEXUS<span className="text-purple-500">.IO</span>
          </span>
        </Link>

        {/* Enlaces (Centro) - Ocultos en móvil */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-300">
          <Link href="#" className="hover:text-purple-400 transition-colors">Productos</Link>
          <Link href="#" className="hover:text-purple-400 transition-colors">Explorar</Link>
          <Link href="#" className="hover:text-purple-400 transition-colors">Empresa</Link>
        </div>

        {/* Iconos (Derecha) */}
        <div className="flex items-center gap-6">
          <button className="text-gray-300 hover:text-white transition">
            <Search size={20} />
          </button>
          
          <button className="relative text-gray-300 hover:text-white transition group">
            <ShoppingBag size={20} />
            {/* Puntito de notificación */}
            <span className="absolute -top-1 -right-1 h-2.5 w-2.5 bg-purple-600 rounded-full border-2 border-black group-hover:scale-110 transition"></span>
          </button>

          {/* Botón de Menú Móvil */}
          <button className="md:hidden text-white">
            <Menu size={24} />
          </button>
        </div>

      </div>
    </nav>
  );
}