import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getBooksQuery } from '../Queries/queries';
import BookDetails from './BookDetails';





class BookList extends Component {

    constructor(props){
        super(props);
        this.state = {
            selected : null
        }
    }

   showBooks(){
       var data = this.props.data;
       if(data.loading){
           return(<div>Books Loading.....</div>);
       } else {
           return data.books.map(book =>{
               return(
                   <li key={book.id} onClick={(e)=>{this.setState({selected : book.id})} } >{book.name} <button onClick={(e)=>{this.setState({selected : book.id})} } >+</button></li>
               );
           })
       }
   }

  render() {     
    return (
      <div>
        <ul id="book-list" >
            {this.showBooks()}
        </ul>
        <BookDetails bookId = {this.state.selected} />
      </div>
    );
  }
}

export default graphql(getBooksQuery)(BookList);
