import React, { useState } from "react";
import "./RestaurantMenu.scss";
import { Link } from 'react-router-dom';


import SelectedMenu from "./SelectedMenu.jsx";

const RestaurantMenu = () => {

  const [foodItems, setFoodItems] = useState([
    {
      name: " FRENCH FRIES",
      Description:
        "A timeless favorite, our French fries, also known as chips, finger chips, or pommes frites, ...",
      image: "/img/chips.jpeg",
      quantity: 0,
      RS: '190 $',
      totalRs: '0 $'
    },
   
    {
      name: 'Pizza',
      Description:
        "pizza, dish of Italian origin consisting of a flattened disk of bread dough topped with some    ...",
      image: "/img/pizza.jpeg",
      quantity: 0,
      RS: '300  $',
      totalRs: '0 $'
    },

    {
      name: 'Spicy Noodles',
      Description:
        " Spicy Noodles is a delectable dish of Asian origin that features tender noodles stir... ",
      image: "    /img/Spicy Noodles.jpeg",
      quantity: 0,
      RS: '180 $',
      totalRs: '0 $'
    },
    
    {
      name: 'Pav Bhaji',
      Description:
        "Pav Bhaji is a popular Indian street food dish that originated in the state of Maharashtra...",
      image: "   /img/Pav Bhaji Recipe.jpeg",
      quantity: 0,
      RS: '120 $',
      totalRs: '0 $'
    },
    {
      name: 'Barbecue black plate',
      Description:
        "Barbecue Black Plate is a delectable dish featuring succulent pieces of meat, typically pork ...",
      image: " ./img/Barbecue sausages on black plate.jpeg",
      quantity: 0,
      RS: '350 $',
      totalRs: '0 $'
    },

    {
      name: 'Pasta',
      Description:
        "Pasta is a beloved Italian dish that boasts a wide variety of shapes, sizes, and flavors. It...",
      image: " ./img/pasta.jpeg",
      quantity: 0,
      RS: '260 $',
      totalRs: '0 $'
    },
    {
      name: 'Milkshake ',
      Description:
        "A milkshake is a creamy, chilled beverage made by blending milk, ice cream, and various flavorings ...",
      image: "  /img/coolDrink.jpeg",
      quantity: 0,
      RS: '90 $',
      totalRs: '0 $'
    },


    {
      name: ' Vanilla Mango ',
      Description:
        "Vanilla Mango Shrubs are a delightful and refreshing beverage made from a combination of ",
      image: " /img/Non-Alcoholic Vanilla Mango Shrubs.jpeg",
      quantity: 0,
      RS: '130 $',
      totalRs: '0 $'
    },

  ]);
 

  const increment = (index) => {
    const updatedFoodItems = [...foodItems];
    updatedFoodItems[index].quantity += 1;
    updatedFoodItems[index].totalRs = `${parseFloat(updatedFoodItems[index].RS) * updatedFoodItems[index].quantity} $`; 
    setFoodItems(updatedFoodItems);
  };
  
  const decrement = (index) => {
    const updatedFoodItems = [...foodItems];
    if (updatedFoodItems[index].quantity > 0) {
      updatedFoodItems[index].quantity -= 1;
      updatedFoodItems[index].totalRs = `${parseFloat(updatedFoodItems[index].RS) * updatedFoodItems[index].quantity} $`
    }
    setFoodItems(updatedFoodItems);
  };
  
  let name;

  let localStorageData = window.localStorage.getItem("foodItems");
  if (localStorageData === null) {
    name = [];
  } else {
    name = JSON.parse(localStorageData);
  }
  const addToLocalStorage = (item) => {
    if (typeof Storage !== "undefined") {
      const existingItems = JSON.parse(localStorage.getItem("foodItems")) || [];
      existingItems.push({
        id: Math.floor(Math.random() + name.length),    
        name: item.name,
        quantity: item.quantity,
        RS: item.RS,
        totalRs: item.totalRs
      });
      localStorage.setItem("foodItems", JSON.stringify(existingItems));
    } else {
      console.error("Local storage is not supported in this browser.");
    }
  };

  const handleAddButtonClick = (item) => {
    if (item.quantity > 0) {
      addToLocalStorage(item);
      item.quantity = 0;
      item.totalRs = '0 $';
    }

  };


  return (
    <div>
      <div className="food-img-dv">
        <div className="food-text">YOUR FOOD LIST </div>
      </div>

      <div className="menu-list">
        {foodItems.map((item, index) => (
          <div className="food-text" key={index}>
            <div className="food-fix">
              <img src={item.image} alt={item.name} className="food-img" />
            </div>
            <div>
              <div className="item-details">
                <div className="top-name-div">
                  <div> {item.name}</div>
                  <div> {item.RS}</div>
                </div>
                <div className="line-food"></div>
                <div className="description-item"> {item.Description}</div>
                <div className="button-div">
                  <button onClick={() => decrement(index)} className="btn-class">-</button>
                  <span className="quantity">{item.quantity}</span>
                  <button onClick={() => increment(index)} className="btn-class">+</button>
                </div>
                <div className="total-btn">
                <div className="item-rs"> total price : {item.totalRs}</div>
                <div style={{paddingTop:"20px"}}>
                <button className="btn-ADD" onClick={() => handleAddButtonClick(item)} >
                ADD
              </button>
                </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="continue-dv">
        <Link to="/SelectedMenu" className="continue-btn"> VIEW ORDER</Link>
      </div>

    </div>
  );
};

export default RestaurantMenu;