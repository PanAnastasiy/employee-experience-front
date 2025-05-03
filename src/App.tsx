import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import {AppRoutes} from "./components/AppRoutes/AppRoutes";
import Footer from "./components/Footer/Footer";


function App() {
  return (
      <div className="App">
        <Header/>
        <AppRoutes/>
          <Footer />
      </div>
  );
}

export default App;
