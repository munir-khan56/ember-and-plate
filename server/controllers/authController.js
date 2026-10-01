import User from "../models/User.js"
import generateToken from "../utils/generateToken.js"

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req, res) => {
  try {
    const { name, email, password, confirmPassword, role } = req.body

    // 1. Validation: check required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Please provide all required fields (name, email, password)",
      })
    }

    // 2. Validation: confirm password
    if (confirmPassword !== undefined && password !== confirmPassword) {
      return res.status(400).json({
        message: "Passwords do not match",
      })
    }

    // 3. Validation: password length
    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      })
    }

    const normalizedEmail = email.toLowerCase().trim()

    // 4. Check for existing user
    const existingUser = await User.findOne({ email: normalizedEmail })
    if (existingUser) {
      return res.status(400).json({
        message: "An account with this email already exists",
      })
    }

    // 5. Create user (password is automatically hashed via User schema pre-save hook)
    const assignedRole = role === "admin" ? "admin" : "customer"

    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password,
      role: assignedRole,
    })

    // 6. Return user data without password
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    })
  } catch (error) {
    res.status(500).json({
      message: "Server error during registration",
      error: error.message,
    })
  }
}

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    // 1. Validation: check email and password provided
    if (!email || !password) {
      return res.status(400).json({
        message: "Please provide email and password",
      })
    }

    const normalizedEmail = email.toLowerCase().trim()

    // 2. Find user by email
    const user = await User.findOne({ email: normalizedEmail })

    // 3. Verify credentials
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({
        message: "Invalid email or password",
      })
    }

    // 4. Return user info and JWT (no password)
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    })
  } catch (error) {
    res.status(500).json({
      message: "Server error during login",
      error: error.message,
    })
  }
}

// @desc    Get current authenticated user profile
// @route   GET /api/auth/me
// @access  Private
export const getCurrentUser = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Not authorized",
      })
    }

    res.status(200).json({
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
      createdAt: req.user.createdAt,
      updatedAt: req.user.updatedAt,
    })
  } catch (error) {
    res.status(500).json({
      message: "Server error retrieving user profile",
      error: error.message,
    })
  }
}
