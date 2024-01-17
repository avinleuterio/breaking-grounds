import React, { useState, useEffect } from 'react';
import { Pane, TextInputField, Button, toaster, SelectField, TextareaField } from 'evergreen-ui';

export default function AddProduct() {
  const [imageUrl, setImageUrl] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantityInStock, setQuantityInStock] = useState("");
  const [isActive, setIsActive] = useState(false);

  function createProduct(e) {
    e.preventDefault();

    let token = localStorage.getItem('token');

    fetch(`${process.env.REACT_APP_API_URL}/product/add-product`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        imageUrl,
        name,
        description,
        price,
        category,
        quantityInStock
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data) {
        toaster.success('Product Added!');
        setImageUrl("");
        setName("");
        setDescription("");
        setPrice("");
        setCategory("");
        setQuantityInStock("");
      } else {
        toaster.danger('Unsuccessful Product Creation');
      }
    });
  }

  useEffect(() => {
    if (imageUrl && name && description && price && category && quantityInStock) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [imageUrl, name, description, price, category, quantityInStock]);

  return (
    <Pane
      display="flex" 
      flexDirection="column" 
      alignItems="center" 
      justifyContent="center"
      padding={32}
      marginY={32}
      marginX="auto" 
      maxWidth={600}
    >
      <Pane display="flex" flexDirection="column" alignItems="center" padding={16}>
        <h1>Add Product</h1>

        <TextInputField
          label="Product Image"
          placeholder="Input Image URL"
          required
          value={imageUrl}
          onChange={e => setImageUrl(e.target.value)}
          marginBottom={16}
          width={400}
        />
        <TextInputField
          label="Name"
          placeholder="Enter Name"
          required
          value={name}
          onChange={e => setName(e.target.value)}
          marginBottom={16}
          width={400}
        />

        <TextareaField
          label="Description"
          placeholder="Enter Description"
          required
          value={description}
          onChange={e => setDescription(e.target.value)}
          marginBottom={16}
          width={400}
        />

        <TextInputField
          label="Price"
          type="number"
          placeholder="Enter Price"
          required
          value={price}
          onChange={e => setPrice(e.target.value)}
          marginBottom={16}
          width={400}
        />

        <SelectField
          label="Category"
          value={category}
          required
          onChange={e => setCategory(e.target.value)}
          marginBottom={16}
          width={400}
        >
          <option value="Coffee" selected>Coffee</option>
          <option value="Equipment" selected>Equipment</option>
          <option value="Merch" selected>Merch</option>
        </SelectField>

        <TextInputField
          label="Stocks"
          type="number"
          placeholder="Enter Quantity of Stocks"
          required
          value={quantityInStock}
          onChange={e => setQuantityInStock(e.target.value)}
          marginBottom={16}
          width={400}
        />

        {isActive ? (
          <Button appearance="primary" onClick={createProduct} marginRight={2}>
            Submit
          </Button>
        ) : (
          <Button appearance="danger" disabled>
            Submit
          </Button>
        )}
      </Pane>
    </Pane>
  );
}