import React, { useState, useEffect } from 'react';
import { Pane, Table, Text } from 'evergreen-ui';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/order/all`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  return (
    <Pane
      display="column"
      justifyContent="space-between"
      marginY={60}
      maxWidth={1200}
      minHeight="40vh"
      marginX="auto"
    >
      <Pane marginY={20}>
        <Text fontSize={24}>Checked-out Orders</Text>
      </Pane>
      <Table>
        <Table.Head>
          <Table.TextHeaderCell>ID</Table.TextHeaderCell>
          <Table.TextHeaderCell>User</Table.TextHeaderCell>
          <Table.TextHeaderCell>Products</Table.TextHeaderCell>
          <Table.TextHeaderCell>Status</Table.TextHeaderCell>
          <Table.TextHeaderCell>Created At</Table.TextHeaderCell>
        </Table.Head>
        <Table.Body>
          {orders.map(order => (
            <Table.Row key={order._id}>
              <Table.TextCell>{order._id}</Table.TextCell>
              <Table.TextCell>{order.user}</Table.TextCell>
              <Table.TextCell>
                <ul>
                  {order.products.map(product => (
                    <li key={product._id}>{product._id}</li>
                  ))}
                </ul>
              </Table.TextCell>
              <Table.TextCell>{order.status}</Table.TextCell>
              <Table.TextCell>{new Date(order.createdAt).toLocaleString()}</Table.TextCell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Pane>
  );
};

export default AdminOrders;
