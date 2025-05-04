'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-primary text-primary shadow-md font-bold py-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3">
          <div className="flex-shrink-0 text-xl font-bold">
            <Link href="/">MiSitio</Link>
          </div>

          {/* Botón hamburguesa */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white focus:outline-none"
            >
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Menú grande */}
          <div className="hidden md:flex space-x-1">
            <Link href="/catalogo/casa" className="hover:underline py-3 px-4 ">Casas</Link>
            <Link href="/catalogo/terreno" className="hover:underline py-3 px-4 ">Terrenos</Link>
            <Link href="/catalogo/departamento" className="hover:underline py-3 px-4 ">Departamentos</Link>
            <Link href="/catalogo/Lotes" className="hover:underline py-3 px-4 ">Lotes</Link>
            <Link href="/catalogo/refiere" className="hover:underline py-3 px-4 ">Refiere y Gana</Link>
            <Link  href="/catalogo/departamento" className="bg-amber-400 py-3 px-4 rounded-2xl text-black hover:bg-amber-500  transition-all">Contactanos</Link>
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      {menuOpen && (
        <div className="md:hidden px-2 pt-2 pb-3 space-y-1 bg-sky-600">
          <Link href="/" className="block py-2">Inicio</Link>
          <Link href="/about" className="block py-2">Acerca</Link>
          <Link href="/contact" className="block py-2">Contacto</Link>
        </div>
      )}
    </nav>
  );
}
