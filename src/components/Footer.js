import React from 'react';
import { Pane, Text, Link, IconButton } from 'evergreen-ui';
import { useNavigate } from 'react-router-dom';
import logo from '../images/breaking-grounds-logo-white.svg';

const Footer = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <Pane 
      background="#333" 
      color="white" 
      padding={24}
    >
      <Pane>
        <Pane>
          <img src={logo} alt="Breaking Grounds" height={30} marginBottom={16} />
        </Pane>

        <Pane display="flex" justifyContent="space-between" alignItems="start">
          {/* Column 1 */}
          <Pane flexDirection="column" alignItems="flex-start" flexBasis={500}>
            <Pane marginY={16} >
              <Text color="white">
                Discover premium coffee beans and top-notch equipment to elevate your coffee experience. Dive into our curated collection today!
              </Text>
            </Pane>
          </Pane>

          {/* Column 2 */}
          <Pane flexBasis={200}>
            <Text size={600} marginBottom={16} color="white">Menu</Text>
            <Pane is="ul" listStyleType="none" padding={0}>
              <li><Link onClick={() => handleNavigate("/product")} color="white">All Products</Link></li>
              <li><Link onClick={() => handleNavigate("/coffee")} color="white">Coffee</Link></li>
              <li><Link onClick={() => handleNavigate("/equipment")} color="white">Equipments</Link></li>
              <li><Link onClick={() => handleNavigate("/merch")} color="white">Merch</Link></li>
            </Pane>
          </Pane>

          {/* Column 3 */}
          <Pane flexBasis={200}>
            <Pane><Text color="white" size={600} marginBottom={16}>Contact us:</Text></Pane>
            <Pane><Text color="white">example@example.com</Text></Pane>
            <Pane><Text color="white">+1 123 456 7890</Text></Pane>
          </Pane>

          {/* Column 4 */}
          <Pane flexBasis={200} display="flex" flexDirection="row" alignItems="center">
            <Text size={600} marginBottom={16} color="white">Follow us:</Text>
            <IconButton appearance="minimal" icon="social-media" iconColor="white" onClick={() => handleNavigate("https://www.facebook.com/")} />
            <IconButton appearance="minimal" icon="social-media" iconColor="white" onClick={() => handleNavigate("https://www.instagram.com/")} />
            <IconButton appearance="minimal" icon="social-media" iconColor="white" onClick={() => handleNavigate("https://www.twitter.com/")} />
          </Pane>
        </Pane>
      </Pane>
    </Pane>
  );
}

export default Footer;
