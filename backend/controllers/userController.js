const { findUserByEmail } = require("../data-access/db");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

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

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();

    const email = payload.email;
    const user = await findUserByEmail(email);

    if (!user) {
      // Logic to create a new user
      return res.status(200).json({ message: "New Google user registered" });
    }

    const jwtToken = jwt.sign(
      { id: user.id, first_name: user.first_name },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      message: "Google login successful",
      jwtToken,
      first_name: user.first_name,
    });
  } catch (error) {
    console.error("Error verifying Google token:", error);
    return res.status(400).json({ message: "Invalid Google token" });
  }
};

module.exports = { loginUser, googleLogin };
