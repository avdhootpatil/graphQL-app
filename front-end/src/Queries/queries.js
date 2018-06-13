import { gql } from 'apollo-boost';


const getBooksQuery = gql`
    {
        books{
            name
            id
        }
    }
`


const getAuthorsQuery = gql`
    {
        authors{
            name
            id
        }
    }
`

const addBookMutation = gql`
        mutation($name:String!,$genre:String!,$authorid:String!){
            addBook(name:$name,genre:$genre,authorId:$authorid){
                name
                id
            }
        }
    
`

const addAuthorMutation = gql`
        mutation($name:String!,$age:Int!){
            addAuthor(name:$name,age:$age){
            name
            age
            }
        }
`

const showBookDetails = gql`
        query($id:ID!){
            book(id:$id){
                name
                genre
                author{
                    id
                    name
                    age
                    books{
                        name
                        genre
                    }
                }
            }
        }
`

export { getAuthorsQuery,getBooksQuery,addBookMutation ,showBookDetails,addAuthorMutation };