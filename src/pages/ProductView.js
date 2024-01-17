import React, { useState, useEffect, useContext } from 'react';
import { Pane, Heading, Paragraph, Button, IconButton, Text, toaster } from 'evergreen-ui';
import { PlusIcon, MinusIcon } from 'evergreen-ui';
import { useParams, useNavigate, Link } from 'react-router-dom';
import UserContext from '../UserContext';
import RelatedProducts from '../components/RelatedProducts';

export default function ProductView() {
  const { productId } = useParams();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [cartQuantity, setCartQuantity] = useState(1);

  const addToCart = () => {
    fetch(`${process.env.REACT_APP_API_URL}/order/add-to-cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        productId: productId,
        quantity: cartQuantity,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        
        if (data.success) {
          toaster.success('You have successfully added the product to cart!');
          navigate("/product");
        } else {
          toaster.danger('Something went wrong. Please try again.');
        }
      });
  };

  const increaseQuantity = () => setCartQuantity(prev => prev + 1);
  const decreaseQuantity = () => setCartQuantity(prev => Math.max(prev - 1, 1));

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/product/${productId}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch(error => {
        console.error('Error fetching product details:', error);
        toaster.danger('Failed to fetch product details. Please try again later.');
      });
  }, [productId]);

  if (!product) return null;

  const { imageUrl, name, description, price, category, quantityInStock } = product;
  const isAdmin = user && user.isAdmin;

  return (
    <>
      <Pane 
        display="flex" 
        flexDirection="column" 
        alignItems="center" 
        justifyContent="center"
        padding={32}
        marginY={32}
        marginX="auto" 
        maxWidth={1200}
        elevation={2}
      >
        <Pane display="flex" width="100%" alignItems="center">
          <div style={{ flex: '0 0 40%' }}>
            <img src={imageUrl} alt="Product" style={{ maxWidth: '100%', height: 'auto' }} />
          </div>

          <div style={{ flex: '0 0 60%', marginLeft: 32, marginRight: 32, paddingRight: 32 }}>
            <Heading size={900} marginBottom={24} textAlign="left">{name}</Heading>
            <Paragraph marginBottom={16}><strong>Description:</strong> {description}</Paragraph>
            <Paragraph marginBottom={16}><strong>Price:</strong> Php {price}</Paragraph>
            <Paragraph marginBottom={16}><strong>Category:</strong> {category}</Paragraph>
            <Paragraph marginBottom={24}><strong>Stocks:</strong> {quantityInStock}</Paragraph>

            <Pane display="flex" width="60%" justifyContent="flex-start" alignItems="center" gap={10}>
              {!isAdmin ? (
                user.id !== null ? (
                  <>
                    <Button variant="primary" appearance="primary" onClick={() => addToCart(productId)}>Add to Cart</Button>
                    <Pane style={{display: 'flex', alignItems: 'center' }}>
                      <IconButton icon={MinusIcon} onClick={decreaseQuantity} />
                      <Text marginLeft={12} marginRight={12}>
                        {cartQuantity}
                      </Text>
                      <IconButton icon={PlusIcon} onClick={increaseQuantity} />
                    </Pane>
                  </>
                ) : (
                  <Link to="/login" textDecoration="none" width="100%">
                    <Button appearance="danger" width="100%">Log in to Add to Cart</Button>
                  </Link>
                )
              ) : null}
            </Pane>
          </div>
        </Pane>
      </Pane>

      <Pane>
        <RelatedProducts />
      </Pane>
    </>
  );
}