import React, { Component } from 'react';
import BookList from './components/BookList';
import AddBook from './components/AddBook';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import AddAuthor from './components/AddAuthor';




//Apollo client setup
const apolloClient = new ApolloClient({
    uri:'http://localhost:4000/graphql'
})


class App extends Component {
  render() {
    return (
      <ApolloProvider client={apolloClient}>
        <div id="main">
          <h1> My Reading list</h1>
          <BookList/>
          <AddBook/>
          <AddAuthor />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
