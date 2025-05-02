"use client"

import { useQuery, gql } from '@apollo/client';
import client from '../lib/apolloClient';
import { ApolloProvider } from '@apollo/client';
import { Propiedad } from '../types/propiedad';
import Navbar from '@/components/navegation'

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

  if (loading) return <p className="text-center text-gray-500">Cargando...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error.message}</p>;

  return (
    <div className="">
      <Navbar />
      <h1 className="text-3xl font-bold mb-6 text-center">Propiedades Disponibles</h1>

      <div className='container mx-auto'>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.propiedades.map((propiedad: Propiedad) => (
            <div
              key={propiedad.id}
              className="bg-primary rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={propiedad.imgenPrincipla || 'https://via.placeholder.com/400x200'}
                alt={propiedad.descripcion}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  {propiedad.tipoPropiedad} - <span className={propiedad.estadoPropiedad === 'RESERVADO' ? 'bg-red-500 px-3 py-2 rounded-md' : 'bg-green-700 py-2 px-3 rounded-sm'}>
                    {propiedad.estadoPropiedad}
                  </span>
                </h2>
                <p className="text-gray-600 mt-2">{propiedad.descripcion}</p>
                <div className="mt-4">
                  <p className="text-lg font-bold text-green-600">${propiedad.precio.toLocaleString()}</p>
                  <p className="text-sm text-gray-500">
                    {propiedad.area} m² | {propiedad.habitaciones} hab | {propiedad.banos} baños |{' '}
                    {propiedad.garage} garage
                  </p>
                  <p className="text-sm text-gray-500">
                    {propiedad.direccion}, {propiedad.distrito}, {propiedad.provincia}, {propiedad.pais}
                  </p>
                </div>
                <div className="mt-4">
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    Creado: {new Date(propiedad.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
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