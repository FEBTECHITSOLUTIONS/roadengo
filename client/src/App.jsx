// App.jsx
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import MainRouting from './routing/MainRouting';
import './App.css';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import FloatingButtons from './components/FloatingButtons';

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

      <FloatingButtons />
      
    </Router>
  );
}

export default App;
