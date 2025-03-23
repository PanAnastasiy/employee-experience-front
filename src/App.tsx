import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import {AppRoutes} from "./components/AppRoutes/AppRoutes";


function App() {
  return (
      <div className="App">
        <Header/>
        <AppRoutes/>
      </div>
  );
}

export default App;
