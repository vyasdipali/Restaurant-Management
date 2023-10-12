import React, { useState, useEffect } from "react";
import "./SelectedMenu.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import RestaurantMenu from "./RestaurantMenu";
import { Link } from 'react-router-dom';


const SelectedMenu = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  const incrementQuantity = (index) => {
    let updatedFoodItems = [...foodItems];
    updatedFoodItems[index].quantity += 1;
    updatedFoodItems[index].totalRs =
      parseFloat(updatedFoodItems[index].RS) * updatedFoodItems[index].quantity;

    localStorage.setItem("foodItems", JSON.stringify(updatedFoodItems));

    setFoodItems(updatedFoodItems);
    updateTotalAmount(updatedFoodItems);
  };

  const decrementQuantity = (index) => {
    let updatedFoodItems = [...foodItems];
    if (updatedFoodItems[index].quantity > 0) {
      updatedFoodItems[index].quantity -= 1;
      updatedFoodItems[index].totalRs =
        parseFloat(updatedFoodItems[index].RS) *
        updatedFoodItems[index].quantity;

      localStorage.setItem("foodItems", JSON.stringify(updatedFoodItems));

      setFoodItems(updatedFoodItems);
      updateTotalAmount(updatedFoodItems);
    }
  };

  const deleteFoodItem = (index) => {
    if (window.confirm("Are you sure you want to delete this food item?")) {
      let foodData = [...foodItems];
      foodData.splice(index, 1);
      setFoodItems(foodData);
      localStorage.setItem("foodItems", JSON.stringify(foodData));
      updateTotalAmount(foodData);
    }
  };

  useEffect(() => {
    const storedFoodItems = JSON.parse(localStorage.getItem("foodItems"));
    if (storedFoodItems) {
      setFoodItems(storedFoodItems);
      updateTotalAmount(storedFoodItems);
    }

    const storedTotalRs = JSON.parse(localStorage.getItem("totalRs"));
    if (storedTotalRs) {
      setTotalAmount(storedTotalRs);
    }
  }, []);

  const updateTotalAmount = (updatedFoodItems) => {
    let total = updatedFoodItems.reduce((acc, item) => {
      return acc + parseFloat(item.totalRs);
    }, 0);

    setTotalAmount(total);
    localStorage.setItem("totalRs", total);
  };

  const editFoodItem = (index) => {
    setIsEditing(true);
    setEditingIndex(index);
    let foodData = [...foodItems];
    foodData = JSON.parse(localStorage.getItem("foodItems")) || [];
    let matchedItem = foodData.find((item) => item.id === index);
    if (matchedItem) {
      localStorage.setItem("matchedFoodItem", JSON.stringify(matchedItem));
      console.log("matchedFoodItem>>>", matchedItem);
    } else {
      console.error("Matching food item not found.");
    }
  };

  const saveChanges = () => {
    setIsEditing(false);
    setEditingIndex(null);
  };

  const placeOrder = () => {
    setIsOrderPlaced(true);
    alert("Your order was placed!");
    localStorage.removeItem("foodItems");
    localStorage.removeItem("totalRs");
  };
  return (
    <div>
      <div className="order-details">
        <div className="order-class">YOUR ORDER DETAILS</div>
      </div>

      {foodItems.map((item, index) => (
        <div key={index}>
          <div className="order-view">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div className="selected-item-name">{item.name}</div>
              <div className="selected-item-RS">{`RS :${item.RS}`}</div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div className="selected-item-quantity">
                {`quantity : `}
                {isEditing && editingIndex === index ? (
                  <>
                    <button
                      className="btn-class"
                      onClick={() => decrementQuantity(index)}
                    >
                      -
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button
                      className="btn-class"
                      onClick={() => incrementQuantity(index)}
                    >
                      +
                    </button>
                  </>
                ) : (
                  item.quantity
                )}
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div className="BiSolidEdit">
                {isEditing && editingIndex === index ? (
                  <button className="btn-class-dv" onClick={saveChanges}>
                    Save
                  </button>
                ) : (
                  <button
                    className="btn-class-dv"
                    onClick={() => editFoodItem(index)}
                  >
                    Edit
                  </button>
                )}
                <button
                  className="btn-class-dv"
                  onClick={() => deleteFoodItem(index)}
                >
                  Delete
                </button>
              </div>
              <div className="selected-item-RS">{`total amount : ${item.totalRs}$`}</div>
            </div>
          </div>
        </div>
      ))}

      <div>
        <div style={{ padding: "35px" }}>
          <div className="line"></div>
        </div>
        <div className="total-amount">Total Price : {totalAmount}</div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "17px",
          }}
        >
          <button className="place-btn" onClick={placeOrder}>
          <Link to="/" className="continue-btn"> Place your order</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectedMenu;
