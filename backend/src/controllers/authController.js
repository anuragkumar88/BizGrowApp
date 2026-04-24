const authService = require('../services/authService');
const { signupSchema, loginSchema } = require('../validators/authValidator');

const signup = async (req, res, next) => {
  try {
    const { error, value } = signupSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { email, password, storeName } = value;
    const result = await authService.signup(email, password, storeName);
    
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { email, password } = value;
    const result = await authService.login(email, password);
    
    res.status(200).json(result);
  } catch (error) {
    // If it's auth specific error
    if (error.message.includes('Invalid')) {
        return res.status(401).json({ message: error.message });
    }
    next(error);
  }
};

module.exports = {
  signup,
  login,
};
