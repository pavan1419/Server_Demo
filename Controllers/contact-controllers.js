const Contact = require('../Models/contact-model');


// Service controller
const contactForm = async (req, res) => {
  try {
    // Get the request body
    const response = req.body;
    await Contact.create(response);

    // Send the response
    return res.status(200).json({ message: 'msg send Scuccess' });
  } catch (error) {
    // Send the error
    return res.status(500).json({ message: 'msg not delivered ' });
  }
};

module.exports = contactForm;
