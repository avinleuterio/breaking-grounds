import React, { useState, useEffect } from 'react';
import { Button, TextInputField, toaster } from 'evergreen-ui'; // Import toaster from evergreen-ui

export default function EditProduct({ productId, fetchData, onClose }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [quantityInStock, setQuantityInStock] = useState('');

    useEffect(() => {
        // Fetch product details based on productId and populate the state
        fetch(`${process.env.REACT_APP_API_URL}/product/${productId}`)
            .then(res => res.json())
            .then(data => {
                setName(data.name);
                setDescription(data.description);
                setPrice(data.price.toString()); // Convert to string for TextInputField
                setCategory(data.category);
                setQuantityInStock(data.quantityInStock.toString()); // Convert to string for TextInputField
            })
            .catch(error => console.error("Error fetching product details:", error));
    }, [productId]);

    const editProduct = (e) => {
        e.preventDefault();
        fetch(`${process.env.REACT_APP_API_URL}/product/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                name: name,
                description: description,
                price: price,
                category: category,
                quantityInStock: quantityInStock
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if (data === true) {
                toaster.success('Product Successfully Updated'); // Use toaster for success
                onClose();  // Close the modal/dialog
                fetchData();
            } else {
                toaster.danger('Failed to Update Product'); // Use toaster for failure
            }
        });
    };

    return (
        <form onSubmit={editProduct}>
            <TextInputField
                label="Name"
                value={name}
                onChange={e => setName(e.target.value)}
                required
            />
            <TextInputField
                label="Description"
                value={description}
                onChange={e => setDescription(e.target.value)}
                required
            />
            <TextInputField
                label="Price"
                type="number"
                value={price}
                onChange={e => setPrice(e.target.value)}
                required
            />
            <TextInputField
                label="Category"
                value={category}
                onChange={e => setCategory(e.target.value)}
                required
            />
            <TextInputField
                label="Quantity in Stock"
                type="number"
                value={quantityInStock}
                onChange={e => setQuantityInStock(e.target.value)}
                required
            />
            <Button type="submit" marginBottom={24}>Submit</Button>
        </form>
    );
}
