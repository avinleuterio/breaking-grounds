import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { Heading, TextInput, Button, Pane } from 'evergreen-ui';

const ProductSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/product/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ productName: searchQuery })
      });
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Error searching for product:', error);
    }
  };

  return (
    <Pane padding={32}>
      <Heading size={600} marginBottom={24}>Product Search</Heading>
      <TextInput
        width={300}
        marginBottom={16}
        placeholder="Enter product name..."
        value={searchQuery}
        onChange={event => setSearchQuery(event.target.value)}
      />
      <Button appearance="primary" marginBottom={24} onClick={handleSearch}>
        Search
      </Button>
      <Heading size={500} marginBottom={16}>Search Results:</Heading>
      {searchResults.length === 0 ? (
        <Pane>No products found.</Pane>
      ) : (
        searchResults.map(product => (
          <ProductCard productProp={product} key={product._id} marginBottom={16} />
        ))
      )}
    </Pane>
  );
};

export default ProductSearch;
