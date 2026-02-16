export const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
        console.log(error.message)
      return res.status(400).json({ message: error.message });
    }
    next();
  };
};
