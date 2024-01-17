import { useState, useEffect } from 'react';
import { Pane, Heading } from 'evergreen-ui';
import ProductCard from './ProductCard'; // Import the ProductCard component

export default function FeaturedProduct() {
    const [previews, setPreviews] = useState([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/product/`)
            .then(res => res.json())
            .then(data => {

                const featured = [];
                const numbers = [];

                const generateRandomNumbers = () => {
                    let randomNum = Math.floor(Math.random() * data.length);

                    if (numbers.indexOf(randomNum) === -1) {
                        numbers.push(randomNum);
                    } else {
                        generateRandomNumbers();
                    }
                }

                for (let i = 0; i < 8; i++) {
                    generateRandomNumbers();
                    featured.push(
                        <ProductCard productProp={data[numbers[i]]} key={data[numbers[i]]._id} />
                    )
                }

                setPreviews(featured);
            });
    }, []);

    return (
            <Pane
                flexDirection="column" 
                alignItems="center" 
                justifyContent="center"
                marginY={32}
                marginX="auto" 
                maxWidth={1200}
            >
                <Pane>
                    <Heading size={600} marginBottom={24} textAlign="center">Featured Products</Heading>
                    <Pane display="flex" justifyContent="center" flexWrap="wrap" gap="{30}">
                        {previews.map((preview, index) => (
                            <div style={{ flex: '0 0 280px', marginBottom: '24px' }} key={index}>
                                {preview}
                            </div>
                        ))}
                    </Pane>
                </Pane>
            </Pane>
        );
    }

