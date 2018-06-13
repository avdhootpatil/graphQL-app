import React, { Component } from 'react';
import { graphql,compose } from 'react-apollo';
import { getAuthorsQuery,addBookMutation,addAuthorMutation } from '../Queries/queries';
import '../index.css';


class AddAuthor extends Component {

    constructor(props){
        super(props);
        this.state = {
            name : '',
           age : '',
           success : false
            
        }
    }

   
   
   submit(e){
       e.preventDefault();
       this.props.addAuthorMutation({
           variables : {
               name : this.state.name,
               age : this.state.age,
               success :true
              
           },
           refetchQueries:[
               {
                   query : getAuthorsQuery
               }
           ]
           
       });
   }

   added(){
    if(this.state.success){
        return(<div>Author added succesfully..</div>);
    }else{
     return(<div>Author could not be added</div>);
    }
   }
   
   render() {     
     return (
         <div>
       <form id="adbook" onSubmit={this.submit.bind(this)} >
            <div className="field" >
                <label>Author name : </label>
                <input type="text" onChange={(e)=>this.setState({name : e.target.value})} />
            </div>
            <div className="field">
                <label>Age : </label>
                <input type="text"  onChange={(e)=>this.setState({age : e.target.value})} />
            </div>
            <button>+</button>
           
       </form>
       {this.added()}
       </div>
     );
   }
 }
 
 export default compose(
    graphql(getAuthorsQuery,{name : "getAuthorsQuery"}),
    graphql(addAuthorMutation,{name : "addAuthorMutation"})
 )(AddAuthor);