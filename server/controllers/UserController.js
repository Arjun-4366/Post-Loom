const userModel = require("../models/UserSchema");
  const generateToken = require("../config/token");
  const bcrypt = require("bcrypt");
const { all } = require("../routes/postRoutes");

  const securePassword = async (password) => {
    const hashedPassword = bcrypt.hash(password, 10);
    return hashedPassword;
  };

  const register = async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
    //   console.log("body:", req.body);
    //   console.log("file:", req.file);
  
      // Check if all required fields are provided
      if (!name || !email || !password) {
        return res.status(400).json({ message: "Please fill all the fields" });
      }
  
      // Check if the email already exists in the database
      const existingUser = await userModel.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          message: "An account already exists with this email, please login",
        });
      }
  
      // Hash the password
      const secPassword = await securePassword(password);
  
      // Create a new user instance
      const userData = new userModel({
        name: name,
        email: email,
        password: secPassword,
        image: req.file ? req.file.filename : null,
      });
  
   
      const newUser = await userData.save();
      const token = generateToken(newUser._id);
      newUser.token = token
      const updatedUser = await newUser.save()
      console.log(updatedUser)
 
      res.status(201).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        token: updatedUser.token,
        image: updatedUser.image || null,
      });
    } catch (error) {
      res.status(500).json({ message: "Registration failed", error: error.message });
    }
  };

  const login = async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log(req.body)
      // Check if email and password are provided
      if (!email || !password) {
        return res.status(400).json({ message: "Please provide email and password" });
      }
  
      // Check if the user exists
      const existingUser = await userModel.findOne({ email: email });
      if (!existingUser) {
        return res.status(404).json({ message: "User not found, please register first" });
      }
  
      // Verify the password
      const isPasswordValid = await bcrypt.compare(password, existingUser.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid password" });
      }
  
      // Generate a token
      const token = generateToken(existingUser._id);
  
      // Send success response
      res.status(200).json({
        id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
        contact: existingUser.contact,
        image: existingUser.image,
        token: token,
      });
    } catch (error) {
      res.status(500).json({ message: "Login failed", error: error.message });
    }
  };

  const getAllUsers = async(req,res)=>{
    try{
        
        const allUsers = await userModel.find()
        res.status(201).json({allUsers})
    }
    catch(error){
        console.log(error.message)
    }
  }

  module.exports = {register,login,getAllUsers}