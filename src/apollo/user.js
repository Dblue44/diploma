import {gql} from '@apollo/client'


export const SEND_PHOTO = gql`
    mutation ($file: Upload!) {
        photoUpload(file: $file) {
            prediction {
                happy
                sad
                normal
                angry
            }
            music {
                id
                artist
                trackName
                photoId
            }
        }
    }     
`;