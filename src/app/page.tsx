"use client"

import { useQuery, gql } from '@apollo/client';
import client from '../lib/apolloClient';
import { ApolloProvider } from '@apollo/client';
import { Propiedad } from '../types/propiedad';
import Navbar from '@/components/navegation'
import Carousel from '@/components/Carousel';


import {
  BedSingle,
  Bath,
  Car,
  Ruler,
  MapPin,
  CalendarDays,
} from 'lucide-react';

// Definir la query GraphQL
const GET_PROPIEDADES = gql`
  query GetPropiedades {
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

// Definir el tipo para la respuesta de la query
interface PropiedadesData {
  propiedades: Propiedad[];
}

const Propiedades = () => {
  const { loading, error, data } = useQuery<PropiedadesData>(GET_PROPIEDADES);

  return (
    <div className="">
      <Navbar />
      <Carousel />

      {loading
        ? <p className="text-center text-gray-500">Cargando...</p>
        : <div className='container mx-auto py-5'>
          {
            data
              ? <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-20">
              {data?.propiedades.map((propiedad: Propiedad) => (
                <div
                  key={propiedad.id}
                  className="bg-sky-700 text-white rounded-lg shadow hover:shadow-xl transition duration-300 overflow-hidden border border-gray-200"
                >
                  <img
                    src={propiedad.imgenPrincipla || 'https://via.placeholder.com/400x200'}
                    alt={propiedad.descripcion}
                    className="w-full h-48 object-cover"
                  />
        
                  <div className="py-5 space-y-3 px-6">
                    <div className="flex justify-between items-start">
                      <h2 className="text-lg font-bold  flex items-center gap-1">
                        
                        {propiedad.tipoPropiedad}
                      </h2>
                      <span
                        className={`text-xs font-semibold px-2 py-1 rounded-full ${
                          propiedad.estadoPropiedad === 'RESERVADO'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-green-100 text-green-700'
                        }`}
                      >
                        {propiedad.estadoPropiedad}
                      </span>
                    </div>
        
                    <p className="text-sm ">{propiedad.descripcion}</p>
        
                    <div className="grid grid-cols-2 gap-2 text-sm ">
                      <div className="flex items-center gap-1">
                        <Ruler size={16} />
                        <span>{propiedad.area} m²</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <BedSingle size={16} />
                        <span>{propiedad.habitaciones} hab</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Bath size={16} />
                        <span>{propiedad.banos} baños</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Car size={16} />
                        <span>{propiedad.garage} garage</span>
                      </div>
                    </div>
        
                    <div className="flex items-center text-sm  gap-1">
                      <MapPin size={16} />
                      <span>
                        {propiedad.direccion}, {propiedad.distrito}, {propiedad.provincia}, {propiedad.pais}
                      </span>
                    </div>
        
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-lg font-bold text-green-600 bg-amber-300 rounded-full px-3 py-2">
                        Cuota desde ${propiedad.precio.toLocaleString()}
                      </p>
                      <span className="flex items-center text-xs text-gray-400">
                        <CalendarDays size={14} className="mr-1" />
                        {new Date(propiedad.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
              : <p className="text-center text-red-500">{error?.message}</p>
          }
        </div>}

    </div>
  );
};

// Envolver el componente en ApolloProvider
export default function Home() {
  return (
    <ApolloProvider client={client}>
      <Propiedades />
    </ApolloProvider>
  );
}