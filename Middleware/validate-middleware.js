const validate = (schema) => async (req, res, next) => {
  try {
    const parseBody = await schema.parseAsync(req.body);
    req.body = parseBody;
    next();
  } catch (err) {
    const status = 422;
    const messege = 'fill the required fields';
    const extraDetails = err.errors ? err.errors[0].message : 'Unknown error';
    // return res.status(400).json({ msg: error.errors[0].message });

    const error = {
      status,
      message: messege,
      extraDetails,
    };
    next(error);
    console.log(error);
  }
};

module.exports = validate;
