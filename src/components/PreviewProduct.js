import { Pane, Heading, Paragraph, Button } from 'evergreen-ui';
import { Link } from 'react-router-dom';

export default function PreviewProduct({ data, breakPoint }) {
    const { _id, name, description, price } = data;

    return (
        <Pane flex={1} padding={16} maxWidth={breakPoint}>
            <Pane elevation={1} padding={16} marginBottom={16}>
                <Heading size={500} marginBottom={8} textAlign="center">
                    <Link to={`/product/${_id}`} textDecoration="none" color="inherit">{name}</Link>
                </Heading>
                <Paragraph marginBottom={16}>{description}</Paragraph>
            </Pane>
            <Pane borderTop="default" padding={16} display="flex" flexDirection="column" alignItems="center">
                <Heading size={400} marginBottom={8}>₱{price}</Heading>
                <Link to={`/product/${_id}`} textDecoration="none" width="100%">
                    <Button appearance="primary" width="100%">Details</Button>
                </Link>
            </Pane>
        </Pane>
    );
}
