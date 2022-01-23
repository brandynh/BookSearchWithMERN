import { gql } from '@apollo/client'

export const QUERY_USER = gql`

query user($username: String!) {
    user(username: $username) 
    {
        savedBooks
        
        {
            bookId
            title
            description
            authors
            link
            image
        }
    }
}
`;