// SearchResult.js
import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { Heading, Pane } from 'evergreen-ui';
import { useParams } from 'react-router-dom';

const SearchResult = () => {
  const { searchQuery } = useParams();
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
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

    fetchSearchResults();
  }, [searchQuery]);

  return (
    <Pane padding={32}>
      <Heading size={600} marginBottom={24}>Search Results for "{searchQuery}"</Heading>
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

export default SearchResult;
