import { ApolloClient, InMemoryCache } from '@apollo/client'
import { split, HttpLink } from '@apollo/client'
import { getMainDefinition } from '@apollo/client/utilities'
import { WebSocketLink } from '@apollo/client/link/ws'

const httpLink = new HttpLink({
  uri: 'https://game-one.herokuapp.com/v1/graphql'
})

const wsLink = process.browser
  ? new WebSocketLink({
      uri: 'ws://game-one.herokuapp.com/v1/graphql',
      options: {
        reconnect: true
      }
    })
  : null

const splitLink = process.browser
  ? split(
      ({ query }) => {
        const definition = getMainDefinition(query)
        return (
          definition.kind === 'OperationDefinition' &&
          definition.operation === 'subscription'
        )
      },
      wsLink,
      httpLink
    )
  : httpLink

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache()
})

export default client
