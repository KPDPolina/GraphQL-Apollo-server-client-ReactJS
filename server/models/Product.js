const { Schema, model } = require('mongoose')

const poductShema = new Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  tags: {
    type: Array,
  },

})
module.exports = model('Product', poductShema) //модель под названием Product