import "./App.css";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import CarouselComponent from "./components/CarouselComponent";
import Footer from "./components/Footer";
import MapComponent from "./components/MapComponent";
import Navbar from "./components/Navbar";
import SearchSection from "./components/SearchSection";
import Testimonials from "./components/Testimonials";
import LoginForm from "./components/UserLogin"; // Import your login form component

function App() {
  return (
    <Router basename="/medical-store-app">
      <div className="App">
        {/* Navbar remains visible on all routes */}
        <Navbar />

        {/* Route Definitions */}
        <Routes>
          {/* Redirect from the root to /home */}
          <Route path="/" element={<Navigate to="/home" />} />

          {/* Home Route */}
          <Route
            path="/home"
            element={
              <>
                <section id="home">
                  <SearchSection />
                  <CarouselComponent />
                </section>
                <section id="about">
                  <Testimonials />
                </section>
                <section id="contact">
                  <MapComponent />
                </section>
              </>
            }
          />

          {/* Login Route */}
          <Route path="/user-login" element={<LoginForm />} />
        </Routes>

        {/* Footer remains visible on all routes */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
