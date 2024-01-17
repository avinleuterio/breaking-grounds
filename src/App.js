import React, { useState, useEffect } from 'react';
import { Pane } from 'evergreen-ui'; 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './UserContext';
import AppNavBar from './components/AppNavBar';
import Footer from './components/Footer';
import './App.css';

// Pages
import Home from './pages/Home';
import Product from './pages/Product';
import Register from './pages/Register';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Profile from './pages/Profile';
import AddProduct from './pages/AddProduct';
import ProductView from './pages/ProductView';
import SearchResult from './pages/SearchResult';
import CoffeePage from './pages/CoffeePage';
import EquipmentPage from './pages/EquipmentPage';
import MerchPage from './pages/MerchPage';
import CartView from './pages/CartView';
import Checkout from './pages/Checkout';
import OrderHistory from './pages/OrderHistory';
import AdminOrderView from './pages/AdminOrderView';
import ThankYou from './pages/ThankYou';

import NotFound from './pages/Error';

function App() {
  const [user, setUser] = useState({
    id: null,
    isAdmin: null
  })

  const unsetUser = () => {
    // Clear specific items if necessary, e.g., localStorage.removeItem('specificKey');
    localStorage.clear();
  }

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/user/details`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(res => res.json())
    .then(data => {
      if (data._id) {
        setUser({
          id: data._id,
          isAdmin: data.isAdmin
        });
      } else {
        setUser({
          id: null,
          isAdmin: null
        });
      }
    })
    .catch(error => {
      console.error("Error fetching user details:", error);
    });
  }, []);

  return (
    <UserProvider value={{ user, setUser, unsetUser }}>
      <Router>
        <AppNavBar />
        <Pane>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product" element={<Product />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/addProduct" element={<AddProduct />} />
            <Route path="/product/:productId" element={<ProductView />} />
            <Route path="/search/:searchQuery" element={<SearchResult />} />
            <Route path="/coffee" element={<CoffeePage />} />
            <Route path="/equipment" element={<EquipmentPage />} />
            <Route path="/merch" element={<MerchPage />} />
            <Route path="/cart" element={<CartView />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-history" element={<OrderHistory />} />
            <Route path="/orders" element={<AdminOrderView />} />
            <Route path="/thank-you" element={<ThankYou />} />
            

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Pane>
        <Footer />
      </Router>
    </UserProvider>
  );
}

export default App;
