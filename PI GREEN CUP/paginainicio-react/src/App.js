import React, {useState, useEffect} from 'react';
import './App.css';
import Cover from "./components/cover/Cover";
import Navbar from './components/navbar/Navbar';
import About  from './components/about/About';
import Slider from './components/slider/Slider';
import Info from './components/info/Info';
function App() {
  const[scrollHeigt, setScrollHeight]= useState(0);

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollHeight(position);
  };

  useEffect(() =>{
    window.addEventListener("scroll", handleScroll);
  },[scrollHeigt]);


  return (
    <div className="App">
      <Navbar isScrolling={scrollHeigt}/>
      <Cover/>
      <About/>
      <Slider/>
      <Info/>
    </div>
  );
};

export default App;
