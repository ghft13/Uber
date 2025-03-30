const userModel = require("../Models/User_model");
const userService = require("../Services/userservice");

const { validationResult } = require("express-validator");

module.exports.registerUser = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname , email, password } = req.body;

  
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

    const token=user.generateAuthToken()
    res.status(200).json({token,user})
};
