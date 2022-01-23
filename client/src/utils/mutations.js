import { gql } from '@apollo/client';

export const ADD_USER = gql`

    mutation addUser($username: String!, $email: String!, $password: String!) 
    {
        addUser(username: $username, email: $email, password: $password) 
        {
            token
            user
            {
                _id
                username
            }
        }
    }`

export const LOGIN_USER = gql`

    mutation login($email: String!, $password: String!)
    {
        login(email: $email, password: $password)
        {
            token
            user 
            {
                _id
                username
                email
                savedBooks
            }
        }
    }`

export const SAVE_BOOK = gql`

    mutation saveBook($bookId: String!, $title: String!, $description: String!, $link: String!, $image: String!, $authors: [String!])
    {
        saveBook(bookId: $bookId, title: $title, description: $description, link: $link, image: $image, authors: $authors)
        {
            bookId
            link
            image
            authors
            title
            description
        }
    }`

export const REMOVE_BOOK = gql`

    mutation removeBook($bookId: ID!) {
        removeBook(bookId: $bookId) {
            bookId
        }
    }`

