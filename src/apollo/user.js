import {gql} from '@apollo/client'

export const ALL_USERS = gql`
    query AllUsers {
        allUsers{
            id,
            name
        }
    }
`;

export const SEND_PHOTO = gql`
   mutation ($file: Upload!) {
        photoUpload(file: $file) {
            filename
        }
   }     
`;