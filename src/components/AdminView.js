import React, { useState } from 'react';
import { Pane, Button, Dialog, Text, Table, Image } from 'evergreen-ui';
import { useNavigate } from 'react-router-dom';
import { EditIcon, PlusIcon } from 'evergreen-ui';
import EditProduct from './EditProduct';
import ArchiveProduct from './ArchiveProduct';
// import Swal from 'sweetalert2';

export default function AdminView({ productData, fetchData }) {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const navigate = useNavigate();

    const handleEditClick = (productId) => {
        setSelectedProductId(productId);
        setIsEditModalOpen(true);
    };

    return (
        <Pane padding={20}>
            <Pane display="flex" justifyContent="space-between" alignItems="center" marginBottom={20}>
                <Text fontSize={24}>Admin Dashboard</Text>
                <Button 
                    appearance="primary"
                    iconBefore={PlusIcon} 
                    marginY={10} 
                    onClick={() => navigate('/addProduct')}
                >
                    Add Product
                </Button>
            </Pane>
            
            <Table>
                <Table.Head display="flex" alignItems="center">
                    <Table.TextHeaderCell flexBasis={20}>Image</Table.TextHeaderCell>
                    <Table.TextHeaderCell flexBasis={40}>ID</Table.TextHeaderCell>
                    <Table.TextHeaderCell flexBasis={100}>Name</Table.TextHeaderCell>
                    <Table.TextHeaderCell flexBasis={250}>Description</Table.TextHeaderCell>
                    <Table.TextHeaderCell flexBasis={20}>Price</Table.TextHeaderCell>
                    <Table.TextHeaderCell flexBasis={30}>Category</Table.TextHeaderCell>
                    <Table.TextHeaderCell flexBasis={20}>Stocks</Table.TextHeaderCell>
                    <Table.TextHeaderCell flexBasis={60}>Availability</Table.TextHeaderCell>
                    <Table.TextHeaderCell flexBasis={60} >Actions</Table.TextHeaderCell>
                </Table.Head>

                <Table.Body>
                {productData.map(product => (
                    <Table.Row key={product._id} paddingY={12} height={80}>
                        <Table.TextCell flexBasis={20}>
                            <Image src={product.imageUrl} alt={product.name} width={50} height={50} />
                        </Table.TextCell>
                        <Table.TextCell flexBasis={40}>{product._id}</Table.TextCell>
                        <Table.TextCell flexBasis={100}>{product.name}</Table.TextCell>
                        <Table.TextCell flexBasis={250}>{product.description}</Table.TextCell>
                        <Table.TextCell flexBasis={20}>{product.price}</Table.TextCell>
                        <Table.TextCell flexBasis={30}>{product.category}</Table.TextCell>
                        <Table.TextCell flexBasis={20}>{product.quantityInStock}</Table.TextCell>
                        <Table.TextCell flexBasis={60}><ArchiveProduct product={product} fetchData={fetchData} /></Table.TextCell>
                        <Table.TextCell flexBasis={60}>
                            <Button marginY={8} iconBefore={EditIcon} onClick={() => handleEditClick(product._id)}>
                                Edit
                            </Button>
                        </Table.TextCell>
                    </Table.Row>
                ))}
            </Table.Body>
            </Table>

            <Dialog
                isShown={isEditModalOpen}
                title="Edit Product"
                onCloseComplete={() => setIsEditModalOpen(false)}
                confirmLabel="Submit"
                hasFooter={false}
            >
                <EditProduct
                    productId={selectedProductId}
                    fetchData={fetchData}
                    onClose={() => setIsEditModalOpen(false)}
                />
            </Dialog>
        </Pane>
    );
}
