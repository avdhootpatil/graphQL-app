import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { showBookDetails } from '../Queries/queries';
import  '../index.css';

class BookDetails extends Component {
 
   showBook(){
       const {book} = this.props.data;
       if(book){
           return(
               <div id="bookdetails" >
                   <h2>{book.name}</h2>
                   <p>{book.genre}</p>
                   <p>{book.author.name}</p>
                   <p>All books by author</p>
                   <ul className="otherbooks">
                    {
                        book.author.books.map(item =>{
                            return(<li key={item.Id} >{item.name}</li>);
                        })
                    }
                   </ul> 
               </div>
           );
       } else {
           return (<p>No book selected</p>);
       }
   }

   render() {     
     return (
       <div>
          <p>{this.showBook()}</p>
       </div>
     );
   }
 }
 
 export default graphql(showBookDetails,{
     options : (props) =>{
         return{
            variables : {
                id : props.bookId
            }
        }
     }
 })(BookDetails);