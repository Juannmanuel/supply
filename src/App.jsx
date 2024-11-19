import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import "./App.css";
import NotFound from "./pages/NotFound/NotFound";
import Products from "./pages/Products/Products";
import { useState } from "react";
import { products } from "./data";
import list from "../src/assets/isotipos/lista.png";
import Orders from "./pages/Orders/Orders";
import ShoppingCart from "./pages/ShoppingCart/ShoppingCart";



function App() {
  const [productsCart, setProductsCart] = useState([]); // IDs del carrito
  const [filteredProducts, setFilteredProducts] = useState([]); // Productos seleccionados

  function addToCart(id) {
    if (!productsCart.includes(id)) {
      const newCart = [...productsCart, id];
      setProductsCart(newCart);
      updateFilteredProducts(newCart); // Actualiza los productos seleccionados
    }
  }

  function deleteItem(id) {
    const newCart = productsCart.filter(productId => productId !== id);
    setProductsCart(newCart); // Actualiza el estado del carrito
    updateFilteredProducts(newCart); // Actualiza los productos filtrados
  }

  function updateFilteredProducts(cartIds) {
    const selectedProducts = products.filter(product =>
      cartIds.includes(product.id)
    );
    setFilteredProducts(selectedProducts);
  }

  React.useEffect(() => {
    updateFilteredProducts(productsCart);
  }, [productsCart]);

  return (
    <div className="app">
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home filteredProducts={filteredProducts} />} />
        <Route path="/:seccion" element={<Products addToCart={addToCart} filteredProducts={filteredProducts} />} />
        <Route path="/Presupuesto" element={<ShoppingCart deleteItem={deleteItem} filteredProducts={filteredProducts} />} />
      </Routes>
    </div>
  );
}


export default App;
