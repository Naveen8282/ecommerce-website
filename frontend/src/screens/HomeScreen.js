import React, { useEffect, useReducer, useState } from "react";

import axios from "axios";
import logger from "use-reducer-logger";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Product from "../components/Product";
import {Helmet} from "react-helmet-async";

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
      // JGIPJ
  }
};

function HomeScreen() {
  // const [Products, setProducts] = useState([]);
  const [data, setdata] = useState([]);
  const [dummy, setDummy] = useState([]);
  const [currentValue, setcurrentValue] = useState('');



  const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    products: [],
    loading: true,
    error: "",
  });

 
  const changeValue = (value) => {
    setcurrentValue(value)
  }

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get("/api/products");
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
        setdata(result.data);
        // console.log(result.data)
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }

      // setProducts(result.data);
    };
    fetchData();
  }, []);

  // 

  
  useEffect(() => {
    let newData;
    let tempData = [...data];
    let tempDummyData = [...dummy];
    if(currentValue === "lowest"){
      if(dummy.length == 0){
        newData = tempData.sort((a, b) => a.price - b.price);
        setdata(newData);
      }
      if(dummy.length !== 0){
        newData = tempDummyData.sort((a, b) => a.price - b.price);
        setDummy(newData);
      }
    }
    if(currentValue === "highest"){
      if(dummy.length == 0){
        newData = tempData.sort((a, b) => b.price - a.price);
        setdata(newData);
      }
      if(dummy.length !== 0){
        newData = tempDummyData.sort((a, b) => b.price - a.price);
        setDummy(newData);
      }
    }
    if(currentValue === "a - z"){
      if(dummy.length == 0){
        newData = tempData.sort((a, b)=> a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1);
        setdata(newData);
      }
      if(dummy.length !== 0){
        newData = tempDummyData.sort((a, b)=> a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1);
        setDummy(newData);
      }
    }
    if(currentValue === "z - a"){
      if(dummy.length == 0){
        newData = tempData.sort((a, b)=> a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1);
        setdata(newData);
      }
      if(dummy.length !== 0){
        newData = tempDummyData.sort((a, b)=> a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1);
        setDummy(newData);
      }
    }
  }, [currentValue]); 

  return (
    <div>
      <Helmet>
        <title>Cognizant</title>
      </Helmet>
      <Row>
        <Col> <h1>Find your products...</h1></Col>
        <Col>
        {
            dummy.length == 0 && 
            <span>{data.length} results</span>
          }
          {
            dummy.length != 0 && 
            <span>{dummy.length} results</span>
          }
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
          </form></Col>
      </Row>
     
      <br/>
      <div className="products">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <Row>
            {products.map((product) => (
              <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3" >
                <Product product={product}></Product>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
}

export default HomeScreen;
