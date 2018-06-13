import React, { Component } from 'react';
import { graphql,compose } from 'react-apollo';
import { getAuthorsQuery,addBookMutation,getBooksQuery } from '../Queries/queries';
import '../index.css';





class AddBook extends Component {

    constructor(props){
        super(props);
        this.state = {
            name : '',
            Genre : '',
            authorid : ''
        }
    }

    displyAuthors(){
        var data = this.props.getAuthorsQuery;
        if(data.loading){
            return(<option disabled >Loading Authors...</option>)
        } else {
            return data.authors.map(author =>{
                return(<option key={author.id} value={author.id} >{author.name}</option>);
            })
        }
    }
   
   submit(e){
       e.preventDefault();
       this.props.addBookMutation({
           variables : {
               name : this.state.name,
               genre : this.state.genre,
               authorid : this.state.authorid
           },
           refetchQueries:[
               {
                   query : getBooksQuery
               }
           ]
       });
   }
   render() {     
     return (
       <form id="adbook" onSubmit={this.submit.bind(this)} >
            <div className="field" >
                <label>Book name : </label>
                <input type="text" onChange={(e)=>this.setState({name : e.target.value})} />
            </div>
            <div className="field">
                <label>Genre : </label>
                <input type="text"  onChange={(e)=>this.setState({genre : e.target.value})} />
            </div>
            <div className="field">
                <label>Author : </label>
                <select  onChange={(e)=>this.setState({authorid : e.target.value})} >
                    <option>select author</option>
                    {this.displyAuthors()}
                </select>
            </div>
            <button>+</button>

       </form>
     );
   }
 }
 
 export default compose(
    graphql(getAuthorsQuery,{name : "getAuthorsQuery"}),
    graphql(addBookMutation,{name : "addBookMutation"})
 )(AddBook);