import React, { useContext } from "react";
import iphone16 from "../../assets/iPhone-.jpeg";
import "./ProductCard.css";
import { RiShoppingCartLine } from "react-icons/ri";
import stary from "../../assets/stary.png";
import { NavLink } from "react-router-dom";
import cartContex from "../../contex/cartContex";
import userContex from "../../contex/userContex";
const ProductCard = ({ product }) => {
  const { addToCart } = useContext(cartContex);
  const user = useContext(userContex);
  return (
    <article className="product-card ">
      <div className="product-image">
        <NavLink to={`/product/${product?._id}`}>
          <img
            src={`http://localhost:5000/products/${product?.images[0]}`}
            alt={product?.title}
          />
        </NavLink>
      </div>

      <div className="product-details">
        <h3 className="product-price">${product?.price}</h3>
        <p className="product-title">{product?.title}</p>
        <footer className="flex-align product-info-footer">
          <div className="flex-align">
            <p className="flex-align product-rating">
              <img src={stary} alt="" />
              {product?.reviews.rate}
            </p>
            <p className=" product-review-count">{product?.reviews.counts} </p>
          </div>
          {product?.stock > 0 && user && (
            <button className="add-to-cart">
              <RiShoppingCartLine
                className="productImage"
                onClick={() => {
                  addToCart(product, 1);
                }}
              />
            </button>
          )}
        </footer>
      </div>
    </article>
  );
};

export default ProductCard;
