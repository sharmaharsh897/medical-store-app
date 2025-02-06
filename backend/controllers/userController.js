const { findUserByEmail, createUser, db } = require("../data-access/db");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const getProfile = (req, res) => {
  try {
    const userProfile = {
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "123-456-7890",
    };
    res.status(200).json(userProfile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch user profile" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  try {
    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const token = jwt.sign(
      { id: user.id, first_name: user.first_name },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      message: "Login successful.",
      token,
      first_name: user.first_name,
    });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
const googleLogin = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ message: "Google token is required." });
  }

  try {
    // Verify the Google ID token (not the access token)
    const ticket = await client.verifyIdToken({
      idToken: token, // Use the ID token for verification
      audience: process.env.GOOGLE_CLIENT_ID, // Your Google OAuth Client ID
    });

    const payload = ticket.getPayload();
    console.log("Google Token Payload:", payload); // Debugging log

    const email = payload.email;

    // Check if the user already exists in the database
    let user = await findUserByEmail(email);

    if (!user) {
      // Create new user if not found
      const newUser = {
        first_name: payload.given_name,
        last_name: payload.family_name,
        email: payload.email,
        profile_picture: payload.picture,
        password: null, // No password for Google login
      };

      user = await createUser(newUser);
    }

    // Generate JWT token
    const jwtToken = jwt.sign(
      { id: user.id, first_name: user.first_name },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      message: "Google login successful.",
      jwtToken,
      first_name: user.first_name,
    });
  } catch (error) {
    console.error("Error verifying Google token:", error);
    return res.status(400).json({ message: "Invalid Google token." });
  }
};


module.exports = { loginUser, getProfile, googleLogin };
