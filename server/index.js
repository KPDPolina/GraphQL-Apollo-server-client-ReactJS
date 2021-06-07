require('dotenv').config()
const { ApolloServer, gql } = require('apollo-server');
const mongoose = require("mongoose")
const Product = require("./models/Product.js");

const DB_CONN = process.env.DB_CONN;

const typeDefs = gql`
  type Product {
    name: String,
    desc: String,
    price: Int,
    tags: [String],
  }

  type Query {
    productEvery: [Product],
    Hi: String,
  }

  type Mutation {
    productAdd(name: String, desc: String, price: Int, tags: [String]): Product,
    }
`;

const products = Product.find({}).lean(); 

const resolvers = {
    Query: {
        productEvery: () => products,
        Hi: () => "Hello!",  
    },
    Mutation: {
      productAdd: (parent ,args) => {
        let product = new Product({
          name: args.name, 
          desc: args.desc, 
          price: args.price, 
          tags: args.tags,
        });
        product.save();
        return product;
      }
    },
  };

const server = new ApolloServer({ typeDefs, resolvers });

async function start() {
    try{
        await mongoose.connect(DB_CONN,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
        server.listen().then(({ url }) => {
            console.log(`🚀🚀🚀  Server ready at ${url}`);
          });
    }catch (e) {
        console.log(e)
    }
}

start()
