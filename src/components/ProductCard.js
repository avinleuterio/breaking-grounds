import { Card, Heading, Pane, Text } from 'evergreen-ui';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function ProductCard({ productProp }) {
    const { _id, name, price, imageUrl } = productProp;

    return (
        <Link to={`/product/${_id}`} style={{ textDecoration: 'none', width: '100%' }}>
            <Card elevation={2} width={270} display="flex" flexDirection="column" justifyContent="space-between">
                <Pane padding={16} height="auto">
                    <img 
                        src={imageUrl}  // Directly using imageUrl from productProp
                        alt={name} 
                        style={{ width: '100%', height: 'auto', marginBottom: '12px' }} 
                        onError={(e) => { e.target.src = imageUrl }}
                    />
                    <Heading size={500} marginBottom={8}>{name}</Heading>
                    <Text marginBottom={12}>Php {price}</Text>
                </Pane>
            </Card>
        </Link>
    )
}

ProductCard.propTypes = {
    productProp: PropTypes.shape({
        imageUrl: PropTypes.string.isRequired,  // Made imageUrl required
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        _id: PropTypes.string.isRequired
    })
}
