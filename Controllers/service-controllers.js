const Service = require('../Models/service-model');

const service = async (req, res) => {
  try {
    const services = await Service.find();
    return res.status(200).json({ services });
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching services' });
    console.log(error);
  }
};

exports.service = service;
