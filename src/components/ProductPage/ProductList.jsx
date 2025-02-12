import React, { useEffect, useState } from "react";
import "./ProductList.css";
import ProductCard from "./ProductCard";
import UseData from "../hooks/UseData";
import Productskeleton from "./Productskeleton";
import { useSearchParams } from "react-router-dom";

const ProductList = () => {
  const [page, setPage] = useState(1); // Manage page state
  const [search] = useSearchParams(); // Avoid conflicts with setSearch
  const category = search.get("category");
  const searchQuery = search.get("search");
  const [sortedProduct, setSortedProduct] = useState([]);
  const [sortBy, setsortBy] = useState(""); // State for sorting criteria

  const { data, error, isLoading } = UseData(
    "/products",
    {
      params: {
        search: searchQuery,
        category,
        perPage: 10,
        page, // Dynamically load page based on state
      },
    },
    [searchQuery, category, page] // Re-fetch when category or page changes
  );

  // Reset page to 1 when category or search changes
  useEffect(() => {
    setPage(1);
  }, [searchQuery, category]);

  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8];

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      if (
        scrollTop + clientHeight >= scrollHeight - 1 &&
        !isLoading &&
        data &&
        page < data.totalPages
      ) {
        setPage((prevPage) => prevPage + 1); // Load more pages when near the bottom
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll); // Clean up
  }, [isLoading, data]);

  // Sort products based on selected option
  useEffect(() => {
    if (data && data.products) {
      const products = [...data.products]; // Clone array to avoid mutating original data
      if (sortBy === "price desc") {
        setSortedProduct(products.sort((a, b) => b.price - a.price));
      } else if (sortBy === "price asc") {
        setSortedProduct(products.sort((a, b) => a.price - b.price));
      } else if (sortBy === "rate desc") {
        setSortedProduct(
          products.sort((a, b) => b.reviews.rate - a.reviews.rate)
        );
      } else if (sortBy === "rate asc") {
        setSortedProduct(
          products.sort((a, b) => a.reviews.rate - b.reviews.rate)
        );
      } else {
        setSortedProduct(products); // Default sorting (Relevance)
      }
    }
  }, [sortBy, data]);

  return (
    <section className="product-list-section">
      <header className="product-list-header flex-align">
        <h2>Products</h2>
        <select
          className="product-sorting"
          name="sort"
          onChange={(e) => setsortBy(e.target.value)} // Update sort criteria
        >
          <option value="">Relevance</option>
          <option value="price desc">Price High To Low</option>
          <option value="price asc">Price Low To High</option>
          <option value="rate desc">Rate High To Low</option>
          <option value="rate asc">Rate Low To High</option>
        </select>
      </header>
      <div className="product-list">
        {/* Render error message as a string */}
        {error && <em>{error.message}</em>}

        {/* Display sorted products */}
        {sortedProduct.length > 0 &&
          sortedProduct.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}

        {isLoading && skeletons.map((n) => <Productskeleton key={n} />)}
      </div>
    </section>
  );
};

export default ProductList;
