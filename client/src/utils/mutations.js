import { gql } from '@apollo/client';

// export const ADD_EVENT = gql`
//     mutation saveEncounter(  
//         $encounterUser: String,
//         # $title: String,
//         $category: String, 
//         $desc: String,
//         $date: String, 
//         $type: String, 
//         $lat: Float, 
//         $lng: Float, 
//         $userId: String,
//         ) {
//         saveEncounter( 
//             encounterUser: $encounterUser,
//             category: $category,             
//             description: $desc,
//             date: $date, 
//             type: $type, 
//             lat: $lat, 
//             lng: $lng, 
//             userId: $userId,
//             ) {
//             _id
//             date
//             category
//             type
//             lat
//             lng
//             description
//             userId
//             createdAt
//         }
//     }
// `;

export const ADD_EVENT = gql`
    mutation saveEncounter(  
        $description: String,
        $type: String,
        $category: [String],
        $date: String,
        $lat: Float,
        $lng: Float,
        ) {
        saveEncounter(             
            description: $description,
            type: $type,
            category: $category,
            date: $date,
            lat: $lat,
            lng: $lng,
            ) {
            _id
            description
            type
            category
            date
            lat
            lng
        }
    }
`;

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
        token
        user {
            _id
            username
        }
      }
    }
`;

