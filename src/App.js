import './App.css';
import CarouselComponent from './components/CarouselComponent';
import Footer from './components/Footer';

import MapComponent from './components/MapComponent';
import Navbar from './components/Navbar';
import SearchSection from './components/SearchSection'; 
import Testimonials from './components/Testimonials';

function App() {
  return (
    <div className="App">
     <Navbar/>
     <SearchSection/> 
     <CarouselComponent/>
     <Testimonials/>
     <MapComponent/> 
     <Footer/>
    </div>
  );
}

export default App;
