import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CarouselComponent from './components/CarouselComponent';
import Footer from './components/Footer';
import MapComponent from './components/MapComponent';
import Navbar from './components/Navbar';
import SearchSection from './components/SearchSection'; 
import Testimonials from './components/Testimonials';
import LoginForm from './components/UserLogin'; // Import your login form component

function App() {
  return (
    <Router>
      <div className="App">
        {/* Navbar remains visible on all routes */}
        <Navbar />
        
        {/* Route Definitions */}
        <Routes>
          {/* Default Home Route */}
          <Route 
            path="/" 
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
