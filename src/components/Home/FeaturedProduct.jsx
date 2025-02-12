import React, { useEffect, useState } from "react";
import "./FeaturedProduct.css";
import ProductCard from "../ProductPage/ProductCard";
import apiClient from "../utils/apiClient.js";

const FeaturedProduct = () => {
  const [FeaturedProduct, setFeaturedProduct] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    apiClient
      .get("/products")
      .then((res) => {
        setFeaturedProduct(res.data.products);
      })
      .catch((err) => setError(err.message));
  }, []);
  return (
    <section className="featured-product">
      <h2>Featured Product</h2>
      <div className="featured-product-list flex-align">
        {FeaturedProduct.map((fproduct) => (
          <ProductCard key={fproduct._id} product={fproduct} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProduct;
