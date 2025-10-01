import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
    uri: process.env.REACT_APP_GRAPHQL_URI || 'http://localhost:4000/graphql'
});

const authLink = setContext ( (_, { headers }) => {

    const token = localStorage.getItem("token");
    console.log("DESDE EL CLIENTE", token);

    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : ""
        }
    }
});

const client = new ApolloClient({
    connectToDevTools: true,
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink)
});

export default client;