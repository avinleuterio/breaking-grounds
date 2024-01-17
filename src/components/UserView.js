import { Pane, Text } from 'evergreen-ui';
import ProductCard from './ProductCard';

export default function UserView({ productData }) {

    const activeProducts = productData.filter(product => product.isActive === true);

    return (
        <Pane
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            marginY={32}
            marginX="auto"
            maxWidth={1200}
            minHeight="80vh"
        >
            <Pane 
                display="flex" 
                marginY={32} 
            >
                <Text fontSize={24} textAlign="center" alignItems="center">All Products</Text>
            </Pane>
            <Pane 
                display="grid" 
                gridGap="24px" 
                justifyItems="center" 
                gridTemplateColumns="repeat(auto-fill, minmax(250px, 1fr))"
            >
                {activeProducts.map(product => (
                    <ProductCard productProp={product} key={product._id} style={{ flex: 1, minHeight: '350px' }} />
                ))}
            </Pane>
            {activeProducts.length === 0 && (
                <Pane marginTop={24} textAlign="center">
                    <Text>No active products available.</Text>
                </Pane>
            )}
        </Pane>
    );
}
