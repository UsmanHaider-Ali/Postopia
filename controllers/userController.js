const user = require("../models/userModel");

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Please enter your name",
      });
    }

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Please enter your email",
      });
    }

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Please enter your password",
      });
    }

    const newUser = new user({
      name,
      email,
      password,
    });

    const oldUser = await user.findOne({ email });

    if (oldUser) {
      return res.status(409).json({
        success: false,
        message: "There is already a user with this email",
      });
    }

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Please enter your email",
      });
    }

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Please enter your password",
      });
    }

    const currentUser = await user.findOne({ email });

    if (!currentUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isPasswordMatch = await currentUser.matchPassword(password);

    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Enter a valid password",
      });
    }

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user: currentUser,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
