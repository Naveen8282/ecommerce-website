import React, { useEffect, useReducer, useState } from "react";
import logger from "use-reducer-logger";
import axios from "axios";

const reducer = (state, action) => {
    switch (action.type) {
      case "FETCH_REQUEST":
        return { ...state, loading: true };
      case "FETCH_SUCCESS":
        return { ...state, products: action.payload, loading: false };
      case "FETCH_FAIL":
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
export default function Filter(dummy) {
    const [currentValue, setcurrentValue] = useState('');
    const {data} = dummy;
    // console.log(data);
    const changeValue = (value) => {
      setcurrentValue(value)
    } 
    
    const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
        products: [],
        loading: true,
        error: "",
      });
 

    useEffect(() => {
        let newData;
        let tempData = [...data];
    
        if(currentValue === "lowest"){ 
            newData = tempData.sort((a, b) => a.price - b.price);
            console.log(newData);
            dispatch({ type: "FETCH_SUCCESS", payload: newData }); 
            
        }
        if(currentValue === "highest"){
            newData = tempData.sort((a, b) => b.price - a.price);
            dispatch({ type: "FETCH_SUCCESS", payload: newData }); 
        }   
        if(currentValue === "a - z"){
            newData = tempData.sort((a, b)=> a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1);
            dispatch({ type: "FETCH_SUCCESS", payload: newData }); 
            
        }
        if(currentValue === "z - a"){  
            newData = tempData.sort((a, b)=> a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1);
            dispatch({ type: "FETCH_SUCCESS", payload: newData }); 
            
        }
      }, [currentValue]); 
    return (
        <>
          <form>
            <select 
                onChange={(event) => changeValue(event.target.value)}
                value={currentValue}
              >
              <option>All Products</option>
              <option value="lowest">price(lowest)</option>
              <option value="highest">price(highest)</option>
              <option value="a - z">a - z</option>
              <option value="z - a">z - a</option>
            </select>
          </form>
        </>
    );
  }

