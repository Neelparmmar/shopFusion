import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Routing from "./components/Routing/Routing";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { jwtDecode } from "jwt-decode";
import Quantity from "./components/ProductPage/SingleProduct/Quantity";
import setAuthToken from "./components/utils/setAuthToken";
import { getjwt } from "./services/userServices";
import {
  addToCartAPI,
  decreaseProductAPI,
  getCartAPI,
  increaseProductAPI,
  removeFromCartAPI,
} from "./services/cartServices";
import "react-toastify/dist/ReactToastify.css";
import userContex from "./contex/userContex";
import cartContex from "./contex/cartContex";
setAuthToken(getjwt());
const App = () => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    try {
      const jwt = localStorage.getItem("token");
      const jwtuser = jwtDecode(jwt);
      if (Date.now() >= jwtuser.exp * 1000) {
        localStorage.removeItem("token");
        location.reload();
      } else {
        setUser(jwtuser);
      }
    } catch (error) {}
  }, []);
  const addToCart = (product, quantity) => {
    const updatedCart = [...cart];
    const productIndex = updatedCart.findIndex(
      (item) => item.product._id === product._id
    );
    if (productIndex === -1) {
      updatedCart.push({ product: product, quantity: quantity });
    } else {
      updatedCart[productIndex].quantity += quantity;
    }
    setCart(updatedCart);
    addToCartAPI(product._id, quantity)
      .then((res) => {
        toast.success("product added successfully");
      })
      .catch((err) => {
        console.log(err.response);
        setCart(cart);
      });
  };
  const removeFromCart = (id) => {
    const oldCart = [...cart];
    const newCart = oldCart.filter((item) => item.product._id !== id);
    setCart(newCart);

    removeFromCartAPI(id).catch((err) => {
      toast.error("something went wrong");
      setCart(oldCart);
    });
  };
  const updateCart = (id, type) => {
    const oldCart = [...cart];
    const updatedCart = [...cart];
    const productIndex = updatedCart.findIndex(
      (item) => item.product._id === id
    );
    if (type === "increase") {
      updatedCart[productIndex].quantity += 1;
      setCart(updatedCart);
      increaseProductAPI(id).catch((err) => {
        toast.error("something went wrong in increasing quantity ");
        setCart(oldCart);
      });
    }
    if (type === "decrease") {
      updatedCart[productIndex].quantity -= 1;
      setCart(updatedCart);
      decreaseProductAPI(id).catch((err) => {
        toast.error("something went wrong in decreasing quantity ");
        setCart(oldCart);
      });
    }
  };
  const getCart = () => {
    getCartAPI()
      .then((res) => {
        setCart(res.data);
      })
      .catch((err) => {
        toast.error("something went wrong!");
      });
  };
  useEffect(() => {
    if (user) {
      getCart();
    }
  }, [user]);
  return (
    <userContex.Provider value={user}>
      <cartContex.Provider
        value={{ cart, addToCart, removeFromCart, updateCart, setCart }}
      >
        <div className="app">
          <Navbar />
          <main>
            <ToastContainer position="bottom-right" />
            <Routing />
          </main>
        </div>
      </cartContex.Provider>
    </userContex.Provider>
  );
};

export default App;
