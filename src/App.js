import './App.css';
import CarouselComponent from './components/CarouselComponent';
import Navbar from './components/Navbar';
import SearchSection from './components/SearchSection'; 

function App() {
  return (
    <div className="App">
     <Navbar/>
     <SearchSection/> 
     <CarouselComponent/>
    </div>
  );
}

export default App;
