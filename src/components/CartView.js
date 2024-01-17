import React, { useState, useEffect } from 'react';
import { Pane, Table, Image, Text, Button, IconButton } from 'evergreen-ui';
import { PlusIcon, MinusIcon } from 'evergreen-ui';
import { Link } from 'react-router-dom';
import FeaturedProduct from '../components/FeaturedProduct';


export default function CartView() {
    const [cartData, setCartData] = useState([]);
    const [totalCartPrice, setTotalCartPrice] = useState(0);

    const fetchCartData = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/order/cart`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            });
            const data = await response.json();
            setCartData(data);
        } catch (error) {
            console.error('Failed to fetch cart data:', error);
        }
    };

    const removeProductFromOrder = async (productId) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/order/remove-order`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ productId })
            });

            if (response.ok) {
                await fetchCartData();
            } else {
                console.error('Failed to remove product from cart:', response.statusText);
            }
        } catch (error) {
            console.error('Failed to remove product from cart:', error);
        }
    };

     const updateProductQuantity = async (productId, newQuantity) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/order/update-order`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ productId, newQuantity })
            });

            if (response.ok) {
                await fetchCartData();
            } else {
                console.error('Failed to update product quantity:', response.statusText);
            }
        } catch (error) {
            console.error('Failed to update product quantity:', error);
        }
    };

    const decreaseQuantity = (productId) => {
        // Logic to decrease quantity and update on backend
        const productToUpdate = cartData.find(item => item.products.some(product => product.productId === productId));
        if (productToUpdate) {
            const targetProduct = productToUpdate.products.find(product => product.productId === productId);
            if (targetProduct.quantity > 1) {
                updateProductQuantity(productId, targetProduct.quantity - 1);
            }
        }
    };

    const increaseQuantity = (productId) => {
        // Logic to increase quantity and update on backend
        const productToUpdate = cartData.find(item => item.products.some(product => product.productId === productId));
        if (productToUpdate) {
            const targetProduct = productToUpdate.products.find(product => product.productId === productId);
            updateProductQuantity(productId, targetProduct.quantity + 1);
        }
    };

    useEffect(() => {
        fetchCartData();
    }, []);

    useEffect(() => {
        const total = cartData.reduce((acc, item) => {
            return acc + item.products.reduce((accProduct, product) => {
                return accProduct + (product.price * product.quantity);
            }, 0);
        }, 0);
        setTotalCartPrice(total);
    }, [cartData]);

    if (cartData.length === 0) {
        return (
            <Pane marginY={60} minHeight="80vh">
                <Pane
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    height="40vh"
                >
                    <Text fontSize={24} marginBottom={20}>Your cart is empty.</Text>
                    <Button appearance="primary" onClick={() => window.location.href = '/product'}>Shop Now</Button>
                </Pane>
                <Pane>
                    <FeaturedProduct />
                </Pane>
            </Pane>
        );
    }

    return (
        <Pane>
            <Pane
                display="flex"
                justifyContent="space-between"
                marginY={60}
                maxWidth={1200}
                minHeight="40vh"
                marginX="auto"
            >
                <Pane width="70%" marginRight={50}>
                    <Text fontSize={24}>My Cart</Text>
                    <Table marginTop={20}>
                        <Table.Head>
                            <Table.TextHeaderCell>Product Image</Table.TextHeaderCell>
                            <Table.TextHeaderCell>Product Name</Table.TextHeaderCell>
                            <Table.TextHeaderCell>Price</Table.TextHeaderCell>
                            <Table.TextHeaderCell>Quantity</Table.TextHeaderCell>
                            <Table.TextHeaderCell>Subtotal Price</Table.TextHeaderCell>
                            <Table.TextHeaderCell>Actions</Table.TextHeaderCell>
                        </Table.Head>
                        <Table.Body>
                            {cartData.map((item) => (
                                item.products.map((product) => (
                                    <Table.Row key={product.productId} paddingY={12} height='auto'>
                                        <Table.Cell height='auto'>
                                            <Image
                                                src={product.imageUrl}
                                                alt={product.name}
                                                style={{ maxWidth: '50%', height: 'auto' }}
                                            />
                                        </Table.Cell>
                                        <Table.TextCell height='auto'>{product.name}</Table.TextCell>
                                        <Table.TextCell height='auto'>&#8369; {product.price}</Table.TextCell>
                                        <Table.TextCell height='auto'>
		                                    <Pane style={{ display: 'flex', alignItems: 'center' }}>
		                                        <IconButton icon={MinusIcon} onClick={() => decreaseQuantity(product.productId)} />
		                                        <Text marginLeft={12} marginRight={12}>
		                                            {product.quantity}
		                                        </Text>
		                                        <IconButton icon={PlusIcon} onClick={() => increaseQuantity(product.productId)} />
		                                    </Pane>
		                                </Table.TextCell>

                                        <Table.TextCell height='auto'>&#8369; {product.totalPrice}</Table.TextCell>
                                        <Table.Cell>
                                            <Button appearance="primary" onClick={() => removeProductFromOrder(product.productId)}>Remove</Button>
                                        </Table.Cell>
                                    </Table.Row>
                                ))
                            ))}
                        </Table.Body>
                    </Table>
                </Pane>
                <Pane width="30%">
                    <Text fontSize={24}>Cart Summary</Text>
                    <Table marginTop={20}>
                        <Table.Head>
                            <Table.TextHeaderCell>Total Cart Price: </Table.TextHeaderCell>
                            <Table.TextHeaderCell>&#8369; {totalCartPrice.toFixed(2)}</Table.TextHeaderCell>
                        </Table.Head>
                        <Table.Body>
                            <Table.Row>
                                <Table.TextCell height='auto' justifyContent="center">Taxes and shipping calculated at checkout.</Table.TextCell>
                            </Table.Row>
                            <Table.Row>
                                <Table.TextCell>
                                    <Link to="/checkout" textDecoration="none" width="100%">
                                        <Button appearance="primary" width="100%">Proceed to Checkout</Button>
                                    </Link>
                                </Table.TextCell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </Pane>
            </Pane>
            <Pane>
                <FeaturedProduct />
            </Pane>
        </Pane>
    );
}
