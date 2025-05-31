import React, { useContext, useState, useEffect } from "react";  
import AppContext from "../Context/Context";  
import API from "../axios";  
import CheckoutPopup from "./CheckoutPopup";  
import { Button } from 'react-bootstrap';  

const Cart = () => {  
  const { cart, removeFromCart, clearCart } = useContext(AppContext);  
  const [totalPrice, setTotalPrice] = useState(0);  
  const [showModal, setShowModal] = useState(false);  

  useEffect(() => {  
    const total = cart.reduce(  
      (acc, item) => acc + item.price * item.quantity,  
      0  
    );  
    setTotalPrice(total);  
  }, [cart]);  

  const handleIncreaseQuantity = (itemId) => {  
    // This function can be implemented if quantity update is supported in context  
    // For now, just a placeholder or can be removed if not used  
  };  

  const handleDecreaseQuantity = (itemId) => {  
    // This function can be implemented if quantity update is supported in context  
    // For now, just a placeholder or can be removed if not used  
  };  

  const handleRemoveFromCart = (itemId) => {  
    removeFromCart(itemId);  
  };  

  const handleCheckout = async () => {  
    // Checkout logic can remain as is or be updated as needed  
    setShowModal(false);  
    clearCart();  
  };  

  return (  
    <div className="cart-container">  
      <div className="shopping-cart">  
        <div className="title">Shopping Bag</div>  
        {cart.length === 0 ? (  
          <div className="empty" style={{ textAlign: "left", padding: "2rem" }}>  
            <h4>Your cart is empty</h4>  
          </div>  
        ) : (  
          <>  
            {cart.map((item) => (  
              <li key={item.id} className="cart-item">  
                <div  
                  className="item"  
                  style={{ display: "flex", alignContent: "center" }}  
                  key={item.id}  
                >  
                  <div>  
                    <img  
                      src={item.imageUrl || "placeholder-image-url"}  
                      alt={item.name}  
                      className="cart-item-image"  
                    />  
                  </div>  
                  <div className="description">  
                    <span>{item.brand}</span>  
                    <span>{item.name}</span>  
                  </div>  

                  <div className="quantity">  
                    <button  
                      className="plus-btn"  
                      type="button"  
                      name="button"  
                      onClick={() => handleIncreaseQuantity(item.id)}  
                      disabled  
                    >  
                      <i className="bi bi-plus-square-fill"></i>  
                    </button>  
                    <input  
                      type="button"  
                      name="name"  
                      value={item.quantity}  
                      readOnly  
                    />  
                    <button  
                      className="minus-btn"  
                      type="button"  
                      name="button"  
                      onClick={() => handleDecreaseQuantity(item.id)}  
                      disabled  
                    >  
                      <i className="bi bi-dash-square-fill"></i>  
                    </button>  
                  </div>  

                  <div className="total-price" style={{ textAlign: "center" }}>  
                    Rs {item.price * item.quantity}  
                  </div>  
                  <button  
                    className="remove-btn"  
                    onClick={() => handleRemoveFromCart(item.id)}  
                  >  
                    <i className="bi bi-trash3-fill"></i>  
                  </button>  
                </div>  
              </li>  
            ))}  
            <div className="total">Total: Rs {totalPrice}</div>  
            <Button  
              className="btn btn-primary"  
              style={{ width: "100%" }}  
              onClick={() => setShowModal(true)}  
            >  
              Checkout  
            </Button>  
          </>  
        )}  
      </div>  
      <CheckoutPopup  
        show={showModal}  
        handleClose={() => setShowModal(false)}  
        cartItems={cart}  
        totalPrice={totalPrice}  
        handleCheckout={handleCheckout}  
      />  
    </div>  
  );  
};  

export default Cart;  