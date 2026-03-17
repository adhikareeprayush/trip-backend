import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Searching if any other user with same email exists
    const userExists = await User.findOne({
      email: email,
    });

    if (userExists) {
      return res.status(400).json({
        message: "User with this email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: "user",
    });

    await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error registering user",
    });
    console.log(error);
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({
      email: email,
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const accessToken = jwt.sign(
      {
        userId: user._id,
        name: user.name,
      },
      "This-is-my-jwt-secret",
      { expiresIn: "1h" },
    );

    const refreshToken = jwt.sign(
      {
        userId: user._id,
        name: user.name,
      },
      "This-is-my-jwt-refresh-secret",
      { expiresIn: "7d" },
    );

    res.status(200).json({
      message: "Login successful",
      accessToken,
      refreshToken,
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

export const refreshToken = (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({
      message: "Refresh token is required",
    });
  }

  try {
    const decoded = jwt.verify(refreshToken, "This-is-my-jwt-refresh-secret");

    const newAccessToken = jwt.sign(
      {
        userId: decoded.userId,
        name: decoded.name,
      },
      "This-is-my-jwt-secret",
      { expiresIn: "1h" },
    );

    const newRefreshToken = jwt.sign(
      {
        userId: decoded.userId,
        name: decoded.name,
      },
      "This-is-my-jwt-refresh-secret",
      { expiresIn: "7d" },
    );

    res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  } catch (error) {
    res.status(401).json({
      message: "Invalid refresh token",
    });
  }
};
