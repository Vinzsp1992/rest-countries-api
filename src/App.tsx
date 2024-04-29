// import { CountryInfo } from "./CountryInfo/CountryInfo";
import { useState, useEffect } from "react";
import Countries from "./components/Countries"
import Navbar from "./components/Navbar"
import {BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CountryInfo } from "./CountryInfo/CountryInfo";

// import {Routes, Route} from 'react-router-dom';
const  App = () => {
  
  const [themeSwitch, setThemeSwitch] = useState<boolean>(true);
  
  const toggleTheme = () =>{
    setThemeSwitch(prev => !prev);
  }

  useEffect(()=>{
    toggleTheme();
  }, [])
  
  function onSearch(_countryName: string): Promise<void> {
    throw new Error("Function not implemented.");
  }

  function onSelect(_countryRegion: string): Promise<void> {
    throw new Error("Function not implemented.");
  }

  return (
    <div className={`${themeSwitch ? 'bg-sky-950 h-[200vh]' : 'bg-slate-100'}`}>
      <Navbar themeSwitch={themeSwitch} toggleTheme={toggleTheme}/>
      <div className="flex items-center justify-between mx-5">
      
      </div>
      <Router>
      <Routes>
        <Route path='/rest-countries-api/' element={  <Countries themeSwitch={themeSwitch} onSearch={onSearch} onSelect={onSelect}/>} />
        <Route path='rest-countries-api/country/:countryName' element={<CountryInfo themeSwitch={themeSwitch} />} />
      </Routes>
    
      </Router>

    </div>
  )
}

export default App
