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

      <Carousel />

      {loading
        ? <p className="text-center text-gray-500">Cargando...</p>
        : <div className='container mx-auto py-20'>
          {
            data
              ? <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-5">
                {data?.propiedades.map((propiedad: Propiedad) => (

                  <div key={propiedad.id} >
                    <div className='w-full flex flex-row-reverse bg-white text-black font-bold'>
                      <div className='bg-amber-300 max-w-min  px-7 py-4 rounded-tl-full rounded-tr-2xl text-center'>{propiedad.tipoPropiedad}</div>
                    </div>
                    <div
                      key={propiedad.id}
                      className="bg-sky-700 text-white transition duration-300  shadow-lg overflow-hidden rounded-tl-4xl rounded-bl-4xl"
                    >

                      <img
                        src={propiedad.imgenPrincipla || 'https://via.placeholder.com/400x200'}
                        alt={propiedad.descripcion}
                        className="w-full h-60 object-cover "
                      />

                      <div className="py-2 space-y-3 px-6">
                        <div className="flex justify-between items-start">
                          <h2 className="text-2xl font-bold  flex items-center gap-1">

                            {propiedad.departamento}
                          </h2>

                        </div>

                        <p className="text-sm font-bold ">{propiedad.descripcion}</p>



                        <div className="flex items-center text-sm  gap-1">
                          <MapPin size={20} />
                          <span>
                            {propiedad.direccion}, {propiedad.distrito}
                          </span>
                        </div>

                        <div className="flex items-center text-sm  gap-1">
                          <BedSingle size={20} />
                          <span>
                            Pre venta
                          </span>
                        </div>

                        <div className="flex items-center justify-between pt-3 pb-8">
                          <p className="text-md font-bold  text-black  bg-yellow-400 rounded-2xl px-4 py-3">
                            Cuota desde $ <span className='font-bold'>{propiedad.precio.toLocaleString()}</span>
                          </p>

                        </div>
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