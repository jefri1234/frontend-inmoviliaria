import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://localhost:3000/graphql', // Endpoint del backend
    credentials: 'include', // Incluir credenciales si es necesario
  }),
  cache: new InMemoryCache(),
});

export default client;