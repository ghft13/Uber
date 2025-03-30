const { Message } = require("twilio/lib/twiml/MessagingResponse");
const userModel = require("../Models/User_model");
const userService = require("../Services/userservice");

const { validationResult } = require("express-validator");

module.exports.registerUser = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname, email, password } = req.body;

  const hashedpassword = await userModel.hashPassword(password);

  // Ensure fullname is an object
  const firstname = fullname?.firstname || "";
  const lastname = fullname?.lastname || "";

  const user = await userService.createUser({
    firstname,
    lastname,
    email,
    password: hashedpassword,
  });

  const token = user.generateAuthToken();
  res.status(200).json({ token, user });
};

module.exports.LoginUser = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  const user = await userModel.findOne({ email }).select("+password");

  if (!user) {
    return res.status(401).json({ Message: "Invalid email or password" });
  }
  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    res.status(401).json({ message: "Invalid email or password" });
  }
  const token = user.generateAuthToken();

  res.cookie("token",token);
  res.status(200).json({ token, user });
};


module.exports.getUserProfile=async(req,res,next)=>{
    res.status(200).json({user:req.user})
}