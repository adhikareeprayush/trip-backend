import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";

const registerUser = async (req, res) => {
  try {
    const { firstName, email, password } = req.body;

    // Searching if any other user with same email exists
    const userExists = User.findOne({
      email: email,
    });

    if (userExists) {
      res.send.status(400).json({
        message: "User already exists!",
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      email,
      hashedPassword,
    });

    await User.save(newUser);
  } catch (error) {
    console.log("Failed to register");
  }
};
