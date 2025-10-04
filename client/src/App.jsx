import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import MainRouting from "./routing/MainRouting";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <MainRouting />
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
