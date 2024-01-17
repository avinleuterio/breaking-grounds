import React, { useState, useEffect } from 'react';
import { Pane, Text } from 'evergreen-ui';
import ProductCard from './ProductCard';

const CategoryProducts = ({ selectedCategory }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProductsByCategory(selectedCategory);
    }, [selectedCategory]);

    const fetchProductsByCategory = async (category) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/product/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const data = await response.json();
            const filteredProducts = data.filter(product => product.category === category);
            setProducts(filteredProducts);
        } catch (error) {
            console.error('Error fetching products by category:', error);
        }
    };

    const activeProducts = products.filter(product => product.isActive === true);

    return (
        <Pane
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            marginY={32}
            marginX="auto"
            maxWidth={1200}
            minHeight="80vh"
        >
            <Pane 
                display="flex" 
                marginY={32} 
            >
                <Text fontSize={24} textAlign="center" alignItems="center">{selectedCategory}</Text>
            </Pane>
            
            {activeProducts.length > 0 ? (
                <Pane display="grid" gridGap="24px" justifyItems="center" gridTemplateColumns="repeat(auto-fill, minmax(250px, 1fr))">
                    {activeProducts.map(product => (
                        <ProductCard productProp={product} key={product._id} style={{ flex: 1, minHeight: '350px' }} />
                    ))}
                </Pane>
            ) : (
                <Pane marginTop={24} textAlign="center">
                    <Text>No active {selectedCategory.toLowerCase()} products available.</Text>
                </Pane>
            )}
        </Pane>
    );
};

export default CategoryProducts;
