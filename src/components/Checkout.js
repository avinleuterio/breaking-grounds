// Checkout.js
import React, { useState, useEffect } from 'react';
import { Pane, TextInputField, Button, toaster, Table, Image } from 'evergreen-ui';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [cartData, setCartData] = useState([]);
  // const [totalCartPrice, setTotalCartPrice] = useState(0);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/order/checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ firstName, lastName, mobile, email, address })
      });

      const data = await response.json();
      if (response.ok) {
        toaster.success(data.message);
        navigate('/thank-you');
      } else {
        toaster.danger(data.error);
      }
    } catch (error) {
      console.error('Failed to checkout:', error);
      toaster.danger('Failed to checkout. Please try again.');
    }
  };

  useEffect(() => {
    fetchCartData();
  }, []);

  // useEffect(() => {
  //   const total = cartData.reduce((acc, item) => {
  //     return acc + item.products.reduce((accProduct, product) => {
  //       return accProduct + (product.price * product.quantity);
  //     }, 0);
  //   }, 0);
  //   setTotalCartPrice(total);
  // }, [cartData]);

  const fetchCartData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/order/cart`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setCartData(data);
      } else {
        toaster.danger('Failed to fetch cart data. Please try again.');
      }
    } catch (error) {
      console.error('Failed to fetch cart data:', error);
      toaster.danger('Failed to fetch cart data. Please try again.');
    }
  };

  return (
    <Pane display="flex" justifyContent="space-between" maxWidth={1200} marginX="auto">
      <Pane width="45%">
        <TextInputField label="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} marginBottom={20} />
        <TextInputField label="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} marginBottom={20} />
        <TextInputField label="Mobile Number" value={mobile} onChange={(e) => setMobile(e.target.value)} marginBottom={20} />
        <TextInputField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} marginBottom={20} />
        <TextInputField label="Address" value={address} onChange={(e) => setAddress(e.target.value)} marginBottom={20} />
        <Button appearance="primary" onClick={handleSubmit}>
          Place Order
        </Button>
      </Pane>
      <Pane width="45%" borderLeft="1px solid #ccc" paddingLeft={20}>
        <Pane width="70%" marginRight={50}>
          
          <Table marginTop={20}>
            <Table.Head>
              <Table.TextCell fontSize={24}>My Cart</Table.TextCell>
            </Table.Head>
            <Table.Body>
              {cartData.map((item) => (
                item.products.map((product) => (
                  <Table.Row key={product._id} paddingY={12} height='auto'>
                    <Table.Cell height='auto'>
                      <Image 
                        src={product.imageUrl} 
                        alt={product.name} 
                        style={{ maxWidth: '50%', height: 'auto' }}
                      />
                    </Table.Cell>
                    <Table.TextCell height='auto'>{product.name}</Table.TextCell>
                    <Table.TextCell height='auto'>&#8369; {product.price}</Table.TextCell>
                    <Table.TextCell height='auto'>{product.quantity}</Table.TextCell>
                    <Table.TextCell height='auto'>&#8369; {product.totalPrice}</Table.TextCell>
                  </Table.Row>
                ))
              ))}
            </Table.Body>
          </Table>
        </Pane>
      </Pane>
    </Pane>
  );
}