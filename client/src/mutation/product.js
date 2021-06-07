import {gql} from '@apollo/client'

export const ADD_PRODUCT = gql`
mutation($name: String, $desc: String, $price: Int, $tags: [String]) {
  productAdd(name: $name, desc: $desc, price: $price, tags: $tags){
		name
    desc
    price
    tags
  }
}
`