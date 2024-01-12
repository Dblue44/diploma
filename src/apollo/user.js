import {gql} from '@apollo/client'

export const ALL_USERS = gql`
    query AllUsers {
        allUsers{
            id,
            name
        }
    }
`;