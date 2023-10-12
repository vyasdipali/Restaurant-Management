// import logo from './logo.svg';
// import './App.css';
// import RestaurantMenu from './component/RestaurantMenu';

// function App() {
//   return (
    
//     <div>
//     <RestaurantMenu/>
//     </div>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Add BrowserRouter, Route, Routes

import RestaurantMenu from './component/RestaurantMenu';
import SelectedMenu from './component/SelectedMenu';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RestaurantMenu />} />
        <Route path="/selectedMenu" element={<SelectedMenu  />} />
      </Routes>
    </Router>
  );
}

export default App;


