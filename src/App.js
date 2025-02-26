import React, { useContext } from "react";
import { HashRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { CartProvider } from "./context/cartContext"; // ✅ Import CartProvider
import { UserContext } from "./context/userContext";
import CarouselComponent from "./components/CarouselComponent";
import SearchSection from "./components/SearchSection";
import Testimonials from "./components/Testimonials";
import Services from "./components/Services";
import MapComponent from "./components/MapComponent";
import Chatbot from "./components/Chatbot";
import LoginForm from "./components/UserLogin";
import RegisterForm from "./components/UserRegister";
import ChangePassword from "./components/ChangePassword";
import OwnerLoginForm from "./components/OwnerLogin";
import UserProfile from "./components/UserProfile";

function ProtectedRoute({ children }) {
  const { user } = useContext(UserContext);
  return user ? children : <Navigate to="/user-login" replace />;
}

function App() {
  return (
    <CartProvider> {/* ✅ Wrapping the entire application */}
      <Router>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
        />

        <div className="App">
          <Navbar /> {/* ✅ Now Navbar has access to CartContext */}
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route
              path="/home"
              element={
                <>
                  <SearchSection />
                  <CarouselComponent />
                  <Testimonials />
                  <Services />
                  <MapComponent />
                  <Chatbot />
                </>
              }
            />
            <Route path="/user-login" element={<LoginForm />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/owner-login" element={<OwnerLoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route
              path="/change-password"
              element={
                <ProtectedRoute>
                  <ChangePassword />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
