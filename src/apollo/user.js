import {gql} from '@apollo/client'


export const SEND_PHOTO = gql`
    type Music {
        id: String
        author: String
        trackName: String
        photoId: String
    }

    mutation ($file: Upload!) {
        photoUpload(file: $file) {
            prediction: [Float]
            music: [Music]
        }
    }     
`;