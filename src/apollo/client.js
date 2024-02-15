import {ApolloClient, InMemoryCache} from '@apollo/client';
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";

const httpLink = createUploadLink({
    uri: "http://localhost:8000/graphql",
});

const client = new ApolloClient({
    uri: 'http://localhost:8000/graphql',
    cache: new InMemoryCache(),
    link: httpLink,
})

export default client;