import React, { useState, useEffect } from 'react';
import { Pane, Table, Image, Text, Badge } from 'evergreen-ui';

export default function OrderHistoryView() {
    const [orderHistory, setOrderHistory] = useState([]);

    const fetchOrderHistory = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/order/checked-out-items`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            });
            const data = await response.json();
            setOrderHistory(data);
        } catch (error) {
            console.error('Failed to fetch order history:', error);
        }
    };

    useEffect(() => {
        fetchOrderHistory();
    }, []);

    if (orderHistory.length === 0) {
        return (
            <Pane marginY={60} minHeight="80vh">
                <Pane
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    height="40vh"
                >
                    <Text fontSize={24} marginBottom={20}>You have no order history.</Text>
                </Pane>
            </Pane>
        );
    }

    return (
        <Pane
            display="flex"
            flexDirection="column"
            alignItems="center"
            marginY={20}
        >
            <Text fontSize={24} marginY={20}>Order History</Text>
            {orderHistory.map((order) => (
                <Pane
                    key={order._id}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    width="70%"
                    marginBottom={40}
                >
                    
                    <Table minWidth={1000} elevation={2}>
                        <Table.Head>
	                        <Table.TextHeaderCell>
			                    <Badge color={order.status === 'Processing' ? 'blue' : order.status === 'Completed' ? 'green' : 'red'}>
			                        {order.status}
			                    </Badge>{order._id}
	                        </Table.TextHeaderCell>
	                        <Table.TextHeaderCell>Order Date: {new Date(order.createdAt).toLocaleDateString()}</Table.TextHeaderCell>
                        </Table.Head>
                        <Table.Body>
                            {order.products.map((product) => (
                                <Table.Row key={product.productId} paddingY={12} height='auto'>
                                    <Table.Cell height='auto'>
                                        <Image src={product.imageUrl} alt={product.name} width={150} height={150} />
                                    </Table.Cell>
                                    <Table.TextCell height='auto'>{product.name}</Table.TextCell>
                                    <Table.TextCell height='auto'>{product.quantity}</Table.TextCell>
                                    <Table.TextCell height='auto'>&#8369; {product.totalPrice.toFixed(2)}</Table.TextCell>
                                </Table.Row>
                            ))}
                            <Table.Row>
                                <Table.TextCell height='auto' fontSize={18} color="primary">Total Price: &#8369; {order.products.reduce((acc, product) => acc + product.totalPrice, 0).toFixed(2)}</Table.TextCell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </Pane>
            ))}
        </Pane>
    );
}
