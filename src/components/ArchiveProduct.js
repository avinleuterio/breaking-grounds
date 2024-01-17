import React from 'react';
import { Button, toaster } from 'evergreen-ui';  // Import toaster from evergreen-ui

export default function ArchiveProduct({ product, fetchData }) {
    const handleAction = (type) => {
        fetch(`${process.env.REACT_APP_API_URL}/product/${product._id}/${type}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                toaster.success(data.message);
                fetchData();
            } else {
                toaster.danger(data.message);
            }
        });
    };

    return (
        <>
            {product.isActive ? (
                <Button appearance="primary" intent="success" marginY={8} onClick={() => handleAction('archive')}>Active</Button>
            ) : (
                <Button appearance="primary" intent="danger" marginY={8} onClick={() => handleAction('activate')}>Archived</Button>
            )}
        </>
    );
}