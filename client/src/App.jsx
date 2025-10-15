// App.jsx
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import MainRouting from './routing/MainRouting';
import './App.css';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div className="App">
            <MainRouting />
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
