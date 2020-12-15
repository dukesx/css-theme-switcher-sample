import { WebSocketLink } from "@apollo/client/link/ws";

const apolloWs = new WebSocketLink({
  uri: `wss://hasura.thehybridmag.com/`,
  options: {
    reconnect: true,
  },
});

export default apolloWs;
