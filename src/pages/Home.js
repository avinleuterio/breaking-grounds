import { Pane } from 'evergreen-ui';
import Banner from '../components/Banner';
import FeaturedProduct from '../components/FeaturedProduct';

export default function Home() {

    return (
        <Pane marginBottom={60}>
            <Banner />

            <FeaturedProduct  />
        </Pane>
    )
}
