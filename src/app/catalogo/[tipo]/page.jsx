'use client';

import { useQuery, gql } from '@apollo/client';
import { useParams } from 'next/navigation';
import client from '@/lib/apolloClient';
import { FaBath, FaBed, FaCar, FaRulerCombined } from 'react-icons/fa';

const GET_PROPIEDADES = gql`
  query {
    propiedades {
      id
      descripcion
      precio
      area
      habitaciones
      banos
      garage
      longitud
      tipoPropiedad
      estadoPropiedad
      direccion  
      pais
      departamento
      provincia
      distrito
      imgenPrincipla
      imagenes {
        id
        url
      }
      createdAt
    }
  }
`;

export default function Page() {
  const { tipo } = useParams();
  const { loading, error, data } = useQuery(GET_PROPIEDADES, { client });

  if (loading) return (
    <div className="flex justify-center items-center h-[50vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500" />
    </div>
  );

  if (error) return (
    <div className="text-center mt-10 text-red-600 font-semibold">
      ⚠️ Error al cargar propiedades. Intenta más tarde.
    </div>
  );

  const propiedadesFiltradas = data.propiedades.filter(
    (propiedad) => propiedad.tipoPropiedad.toLowerCase() === tipo.toLowerCase()
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-left text-gray-800">
         <span className="capitalize text-blue-600">{tipo}s</span>
      </h1>

      {propiedadesFiltradas.length === 0 ? (
        <p className="text-center text-gray-500">No se encontraron propiedades del tipo <strong>{tipo}</strong>.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {propiedadesFiltradas.map((prop) => (
            <div
              key={prop.id}
              className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={prop.imgenPrincipla || '/placeholder-img.jpg'}
                alt="Imagen principal"
                className="w-full h-56 object-cover"
                onError={(e) => (e.currentTarget.src = '/placeholder-img.jpg')}
              />
              <div className="p-4">
                <h2 className="text-lg font-bold text-gray-800 truncate mb-2">{prop.descripcion}</h2>
                <p className="text-blue-600 font-semibold text-xl mb-2">${parseFloat(prop.precio).toLocaleString()}</p>

                <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
                  <div className="flex items-center gap-2">
                    <FaRulerCombined className="text-blue-500" />
                    {prop.area} m²
                  </div>
                  <div className="flex items-center gap-2">
                    <FaBed className="text-blue-500" />
                    {prop.habitaciones} Hab.
                  </div>
                  <div className="flex items-center gap-2">
                    <FaBath className="text-blue-500" />
                    {prop.banos} Baños
                  </div>
                  <div className="flex items-center gap-2">
                    <FaCar className="text-blue-500" />
                    {prop.garage ? 'Sí' : 'No'}
                  </div>
                </div>

                <p className="text-xs text-gray-500">📍 {prop.direccion}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
