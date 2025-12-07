// Apollo.js
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const httpLink = new HttpLink({
  uri: 'https://ap-south-1.cdn.hygraph.com/content/cmio69m9e019w07w8us95dgxc/master',
});

 export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;