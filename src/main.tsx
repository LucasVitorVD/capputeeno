import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { CartContextProvider } from './context/CartContext.tsx'
import { FilterContextProvider } from './context/FilterContext.tsx'

const client = new ApolloClient({
  uri: 'http://localhost:3333/', 
  cache: new InMemoryCache()
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <FilterContextProvider>
        <CartContextProvider>
          <App />
        </CartContextProvider>
      </FilterContextProvider>
    </ApolloProvider>
  </React.StrictMode>,
)
