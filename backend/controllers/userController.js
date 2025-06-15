const { findUserByEmail, createUser, findUserById} = require("../data-access/db");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const getProfile = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized: No user ID found." });
    }

    const user = await findUserById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({
      id: user.id,
      name: `${user.first_name} ${user.last_name}`,
      email: user.email,
      phone: user.phone_number || "N/A",
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
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
    // Verify Google ID Token
    const ticket = await client.verifyIdToken({
      idToken: token, // Use the ID token from frontend
      audience: process.env.GOOGLE_CLIENT_ID, // Google OAuth Client ID
    });

    const payload = ticket.getPayload();
    console.log("Google Token Payload:", payload);

    let user = await findUserByEmail(payload.email);

    if (!user) {
      const newUser = {
        first_name: payload.given_name,
        last_name: payload.family_name,
        email: payload.email,
        profile_picture: payload.picture,
        password: null,
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
