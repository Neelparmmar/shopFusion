import React, { useContext, useState } from "react";
import "./SingleProduct.css";
import Quantity from "./Quantity";
import { useParams } from "react-router-dom";
import UseData from "../../hooks/UseData";
import cartContex from "../../../contex/cartContex";
import userContex from "../../../contex/userContex";

const SingleProduct = () => {
  const [selectedImage, setselectedImage] = useState(0);
  const { id } = useParams(1);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useContext(cartContex);
  const user = useContext(userContex);
  const { data: product, isLoading, error } = UseData(`/products/${id}`);
  return (
    <section className="single-product flex-align">
      {product && (
        <>
          {" "}
          <div className="flex-align">
            <div className="single-product-thumbnail">
              {error && <em>{error}</em>}
              {product.images.map((image, index) => (
                <img
                  src={`http://localhost:5000/products/${image}`}
                  alt={image.title}
                  className={selectedImage === index ? "selected-image" : ""}
                  onClick={() => setselectedImage(index)}
                  key={index}
                />
              ))}
            </div>
            <img
              src={`http://localhost:5000/products/${product.images[selectedImage]}`}
              alt="product.title"
              className="single-product-display"
            />
          </div>
          <div className=" single-product-details">
            <h1 className="single-product-title">{product.title}</h1>
            <p className="single-product-description">{product.description}</p>
            <p className="single-product-price">${product.price.toFixed(2)}</p>
            {user && (
              <>
                {" "}
                <h2 className="quantity-title">Quantity :</h2>
                <div className="flex-align quantity-inputt ">
                  <Quantity
                    quantity={quantity}
                    stock={product.stock}
                    setQuantity={setQuantity}
                  />
                </div>
                <button
                  className="search-button add-cart"
                  onClick={() => addToCart(product, quantity)}
                >
                  Add To Cart
                </button>
              </>
            )}
          </div>
        </>
      )}
    </section>
  );
};

export default SingleProduct;
