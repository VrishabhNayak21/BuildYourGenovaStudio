import axios from "axios";
import { createContext, useEffect, useState } from "react";

// Create the context
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url = "https://buildyourgenovastudio-backend.onrender.com";
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);

  // Add to cart
  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }

    if (token) {
      await axios.post(
        url + "/api/cart/add",
        { itemId },
        { headers: { token } }
      );
    }
  };

  // Remove from cart
  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));

    if (token) {
      await axios.post(
        url + "/api/cart/remove",
        { itemId },
        { headers: { token } }
      );
    }
  };

  // Clear cart completely
  const clearCart = async () => {
    setCartItems({});
    if (token) {
      try {
        // Clear cart on server by setting cartData to empty object
        await axios.post(
          url + "/api/cart/clear",
          {},
          { headers: { token } }
        );
      } catch (error) {
        console.error("Error clearing cart on server:", error);
      }
    }
  };

  // Calculate total cart price
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = food_list.find((product) => product._id === item);
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  // Fetch food items from server
  const fetchFoodList = async () => {
    try {
      const response = await axios.get(url + "/api/food/list");
      setFoodList(response.data.data);
    } catch (error) {
      console.error("Error fetching food list:", error);
    }
  };

  // Fetch cart items from server
  const fetchCart = async () => {
    try {
      const response = await axios.post(
        url + "/api/cart/get",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setCartItems(response.data.cartData || {});
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  // Load food list and token on first render
  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
      }
    }
    loadData();
  }, []);

  // Fetch cart once token is set
  useEffect(() => {
    if (token) {
      fetchCart();
    }
  }, [token]);


  //Hello Yo Hohoho
  // Context values
  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    clearCart,
    getTotalCartAmount,
    url,
    token,
    setToken: (newToken) => {
      setToken(newToken);
      localStorage.setItem("token", newToken);
    },
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;

