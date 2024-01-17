import { useEffect, useState, useContext } from 'react';
import { Pane } from 'evergreen-ui';
import UserContext from '../UserContext';

import UserView from '../components/UserView';
import AdminView from '../components/AdminView';

export default function Product() {
  const { user } = useContext(UserContext);
  const [product, setProduct] = useState([]);

  const fetchData = () => {
    fetch(`${process.env.REACT_APP_API_URL}/product/all`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setProduct(data);
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Pane padding={32}>
      {
        (user.isAdmin === true) ?
          <AdminView productData={product} fetchData={fetchData} />
          :
          <UserView productData={product} />
      }
    </Pane>
  );
}
