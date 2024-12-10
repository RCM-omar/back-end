import Joi from 'joi';
//! what if the data send it as params !!??
const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      //! let it go to the global handler
      
      return res.status(400).json({
        message: 'Validation error',
        details: error.details.map((detail) => detail.message),
      });
    }
    next();
  };
};

export default validate;
