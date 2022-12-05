import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import Container from "react-bootstrap/Container";
import CartScreen from "./screens/CartScreen";
import Outfits from "./products/Outfits";
import Navigationbar from "./components/Navigationbar";
import Electronics from "./products/Electronics";
import Sports from "./products/Sports";

function App() {
   return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        <header>
       
          <Navigationbar/>
        </header>
        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/product/:slug" element={<ProductScreen />} />
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/outfits" element={<Outfits />} />
              <Route path="/sports" element={<Sports />} />
              <Route path="/electronics" element={<Electronics />} />
            </Routes>
          </Container>
        </main>
        <footer>
          <div className="text-center">All rights reserved</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
