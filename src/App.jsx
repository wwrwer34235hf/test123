import { useRef } from 'react';
import './App.css';
import Header from './components/Header';
import About from './components/About';
import Gallery from './components/Gallery';
import Footer from './components/Footer';
import Directions from './components/Directions';


function App() {
    const aboutRef = useRef(null);

    return (
        <>
            <Header aboutTextRef={aboutRef} />
            <About ref={aboutRef} />
            <Gallery />
            <Directions />
            <Footer />
        </>
    );
}

export default App;