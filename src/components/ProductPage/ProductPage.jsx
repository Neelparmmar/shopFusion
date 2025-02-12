import React from "react";
import "./ProductPage.css";
import ProductCard from "./ProductCard";
import Sidebar from "./Sidebar";
import ProductList from "./ProductList";
const ProductPage = () => {
  return (
    <section className="product-page">
      <Sidebar />
      <ProductList />
    </section>
  );
};

export default ProductPage;
