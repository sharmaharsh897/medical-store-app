import "./App.css";
import { HashRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import CarouselComponent from "./components/CarouselComponent";
import Footer from "./components/Footer";
import MapComponent from "./components/MapComponent";
import Navbar from "./components/Navbar";
import SearchSection from "./components/SearchSection";
import Testimonials from "./components/Testimonials";
import LoginForm from "./components/UserLogin";
import Services from "./components/Services";
import Chatbot from "./components/Chatbot";

function App() {
  return (
    <Router>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" />

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
                <section id="services">
                  <Services />
                </section>
                <section id="contact">
                  <MapComponent />
                </section>

                {/* Chatbot only on the home page */}
                <Chatbot />
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