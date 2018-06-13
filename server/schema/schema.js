const graphql = require('graphql');
const _ = require('lodash');
const Book = require('../models/book');
 const Author = require('../models/author');

const { GraphQLObjectType,
        GraphQLString,
        GraphQLSchema,
        GraphQLInt,
        GraphQLList,
        GraphQLID,
        GraphQLNonNull } = graphql;


//fakeData

// var books = [
//     {name:'Mein kampf',genre:'Biography',id:'1',authorid:'1'},
//     {name:'48 laws of power',genre:'self help',id:'2',authorid:'2'},
//     {name:'meditaions',genre:'self help',id:'3',authorid:'3'},
//     {name:'mastery',genre:'self help',id:'4',authorid:'2'},
//     {name:'38 strategies of war',genre:'self help',id:'5',authorid:'2'},
//     {name:'art of seduction',genre:'self help',id:'6',authorid:'2'},
// ];


// var authors= [
//     {name : 'Adolh hitler',age :44 ,id : '1'},
//     {name : 'Robert Greene',age :45 ,id : '2'},
//     {name : 'Marcus Aurelius',age :500 ,id : '3'}
// ]

const BookType = new GraphQLObjectType({
    name : "Book",
    fields : () => ({
        id : {type : GraphQLID},
        name : {type : GraphQLString},
        genre : {type : GraphQLString},
        author : {
            type : AuthorType,
            resolve(parent,args){
                // return _.find(authors,{id :parent.authorid});
                return Author.findById(parent.authorId);
            }
        }
    }) 
});


const AuthorType = new GraphQLObjectType({
    name : "Author",
    fields : () => ({
        id : {type : GraphQLID},
        name : {type : GraphQLString},
        age : {type : GraphQLInt},
        books : {
            type : new GraphQLList(BookType),
            resolve(parent,args){
                // return _.filter(books,{authorid:parent.id});
                return Book.find({ authorId: parent.id});
            }
        }
    })
});


const RootQuery = new GraphQLObjectType({
    name : 'RootQueryType',
    fields : {
        book : {
            type : BookType ,
            args : {id : {type : GraphQLID}},
            resolve(parent , args){
                // code for fetching data from database
            //   return _.find(books,{id: args.id});
             return Book.findById(args.id);
            }
        },
        author : {
            type : AuthorType,
            args : {id : {type : GraphQLID}},
            resolve(parent,args){
                // return _.find(authors,{id:args.id});
                return Author.findById(args.id);
            }
        },
        books : {
            type : new GraphQLList(BookType),
            resolve(parent,args){
                // return books;
                return Book.find({});
            }
        },
        authors : {
            type : new GraphQLList(AuthorType),
            resolve(parent,args){
                // return authors;
                return Author.find({});
            }
        }
    }
});


const Mutation = new GraphQLObjectType({
    name : 'Mutation',
    fields: {
        addAuthor : {
            type : AuthorType,
            args : {
                name : {type : new GraphQLNonNull( GraphQLString)},
                age : {type : new GraphQLNonNull(GraphQLInt) }
            },
            resolve(parent,args){
                let author = new Author({
                    name : args.name,
                    age : args.age
                });
               return author.save();
            }
        },
        addBook: {
            type : BookType,
            args : {
                name : {type : new GraphQLNonNull( GraphQLString)},
                genre : {type : new GraphQLNonNull(GraphQLString) },
                authorId : {type : new GraphQLNonNull( GraphQLString)}
            },
            resolve(parent,args){
                let book = new Book({
                    name : args.name,
                    genre : args.genre,
                    authorId : args.authorId
                });
                return book.save();
            }
        },
        deleteBook : {
            type : BookType,
            args: {
                id : {type : GraphQLID}
            },
            resolve(parent,args){
               return Book.delete(args.id);
            }
        }
    }
});






module.exports = new GraphQLSchema({
    query : RootQuery,
    mutation : Mutation
})