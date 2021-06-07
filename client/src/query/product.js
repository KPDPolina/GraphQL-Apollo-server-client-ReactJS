import {gql} from '@apollo/client'

export const GET_ALL_PRODUCTS = gql`
    query {
        productEvery {
            name, desc, price, tags
        }
    }
`