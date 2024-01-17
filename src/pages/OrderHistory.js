// pages/CartView.js
import React from 'react';
import OrderHistory from '../components/OrderHistory';
import FeaturedProduct from '../components/FeaturedProduct';


const OrderHistoryPage = () => {
    return (
        <div>
            <OrderHistory />
            <FeaturedProduct />
        </div>
    );
};

export default OrderHistoryPage;
