import { useMemo } from "react";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { SubscriptionClient } from "subscriptions-transport-ws";
import {
  concatPagination,
  offsetLimitPagination,
} from "@apollo/client/utilities";

let apolloClient;

function createApolloClient() {
  const ssrMode = typeof window === "undefined";

  let link;
  if (ssrMode) {
    link = new HttpLink({
      uri: "https://hasura.thehybridmag.com/v1/graphql",
      credentials: "same-origin",
      fetch,
    });
  } else {
    const client = new SubscriptionClient(
      "wss://hasura.thehybridmag.com/v1/graphql",
      {
        reconnect: true,
        connectionParams: {},
      }
    );
    link = new WebSocketLink(client);
  }

  return new ApolloClient({
    ssrMode,
    link,
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            articles: offsetLimitPagination(),
          },
        },
      },
    }),
  });
}

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(initialState) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
