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
          <div className="hidden md:flex space-x-6">
            <Link href="/" className="hover:underline">Inicio</Link>
            <Link href="/about" className="hover:underline">Acerca</Link>
            <Link href="/contact" className="hover:underline">Contacto</Link>
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
