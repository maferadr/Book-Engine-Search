import { gql } from '@apollo/client';

export const LOGIN_USER = gql `
    mutation login($emai: String!, $password: String!){
        login(email: $email, password: $password){
            token
            user{
                _id
                username
            }
        }
    }
`;

export const ADD_USER = gql `
    mutation addUser($username: String!, $email: String!, $password: String!){
        addUser(username: $username, email: $email, password: $password){
            token
            user{
                _id
                username
            }
        }
    }
`;

//Confirm this method since authors is an ID array
export const SAVE_BOOK = gql `
    mutation saveBook($authors: [ID]!, $description: String!, $bookId: String!, $title: String!){
        saveBook(authors: $authors, description: $descriptions, bookId: $bookId, title: $title){
            image
            link
        }
    }
`;
export const REMOVE_BOOK = gql `
    mutation removeBook($bookId: ID){
        removeBook(bookId: $bookId){
            _id
            username
            email
            bookCount
        }
    }
`