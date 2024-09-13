import './App.css';
import CarouselComponent from './components/CarouselComponent';
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
    </div>
  );
}

export default App;
