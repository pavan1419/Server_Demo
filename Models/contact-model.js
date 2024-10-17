const { Schema, model } = require('mongoose');

// COntact schema
const contactSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

const Contact = new model('Contact', contactSchema);

module.exports = Contact;
