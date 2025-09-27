const API_BASE =
  process.env.NODE_ENV === "production"
    ? "https://medical-store-app.onrender.com/api"  // Render backend URL
    : "http://localhost:5000/api";                  // Local backend

export default API_BASE;