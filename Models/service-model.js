const { Schema, model } = require('mongoose');

// Service schema
const serviceSchema = new Schema({
  service: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  provider: {
    type: String,
    required: true,
  },
});

// Create the model
const Service = new model('Service', serviceSchema);

// Export the model
module.exports = Service;

//next we will create the service routes in the Server/Routes folder
