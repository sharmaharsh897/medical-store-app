const { findAdminByEmail } = require("../data-access/db");
const jwt = require("jsonwebtoken");


const loginAdmin = async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }
  
    try {
      const user = await findAdminByEmail(email);
      console.log("user",user)
  
      if (!user) {
        console.log("User not found for email:", email);
        return res.status(404).json({ message: "User not found." });
      }

      if(user){
        console.log("user found",email)
      }
  
      if (user.password !== password) {
        console.log("Password mismatch for user:", user.email);
        return res.status(401).json({ message: "Invalid credentials." });
      }
  
      const token = jwt.sign(
        { id: user.id, first_name: user.firstname },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
  
      return res.status(200).json({
        message: "Login successful.",
        token,
        first_name: user.firstname,
      });
    } catch (error) {
      console.error("Error during login:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };

module.exports = { loginAdmin };
