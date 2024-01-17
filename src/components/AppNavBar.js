import React, { useState, useContext } from 'react';
import { Pane, IconButton, Button, SearchInput, Dialog, Popover, Menu, Position, Avatar } from 'evergreen-ui';
import { PersonIcon, ShoppingCartIcon, LogOutIcon } from 'evergreen-ui';
import { Link as RouterLink, useNavigate } from 'react-router-dom';  
import UserContext from '../UserContext';
import logo from '../images/breaking-grounds-logo.svg';
import Login from '../pages/Login';

export default function AppNavBar() {
  const { user } = useContext(UserContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = () => {
    console.log("Search query:", searchQuery);
    navigate(`/search/${searchQuery}`);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const renderDropdownMenu = () => (
    <Popover
      position={Position.BOTTOM_RIGHT}
      content={
        <Menu>
          <Menu.Group>
            <Menu.Item icon={PersonIcon} onSelect={() => navigate('/profile')}>
              My Profile
            </Menu.Item>
          </Menu.Group>
          <Menu.Divider />
          <Menu.Group>
            <Menu.Item icon={LogOutIcon} intent="danger" onSelect={() => navigate('/Logout')}>
              Logout
            </Menu.Item>
          </Menu.Group>
        </Menu>
      }
    >
      <Avatar
        src="path_to_your_mock_image.jpg"
        name={`${user.firstName} ${user.lastName}`}
        size={40}
        marginRight={16}
      />
    </Popover>
  );

  return (
    <Pane background="tint1" padding={16} borderBottom>
      <Pane display="flex" alignItems="center" justifyContent="space-between">
        {/* Left side of the Navbar */}
        <Pane display="flex" alignItems="center">
          <img src={logo} alt="Breaking Grounds" style={{ height: 32, marginRight: 34 }} />
          <Button appearance="minimal" marginRight={16} is={RouterLink} to="/">Home</Button>

          {/* Display these buttons only for non-admin users */}
          {!user.isAdmin && (
            <>
              <Button appearance="minimal" marginRight={16} is={RouterLink} to="/product">All Products</Button>
              <Button appearance="minimal" marginRight={16} is={RouterLink} to="/coffee">Coffee</Button>
              <Button appearance="minimal" marginRight={16} is={RouterLink} to="/equipment">Equipments</Button>
              <Button appearance="minimal" marginRight={16} is={RouterLink} to="/merch">Merch</Button>
            </>
          )}

          {/* Render Product List and Order List buttons for admin users */}
          {user.isAdmin && (
            <Pane display="flex" alignItems="center">
              <Button appearance="minimal" marginRight={16} is={RouterLink} to="/product">Product List</Button>
              <Button appearance="minimal" marginRight={16} is={RouterLink} to="/orders">Order List</Button>
            </Pane>
          )}
        </Pane>

        {/* Right side of the Navbar */}
        <Pane display="flex" alignItems="center">
          <SearchInput 
            placeholder="Search..." 
            marginRight={16} 
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSearch()}
          />
          
          {/* Navigation for ShoppingCartIcon */}
          {user.id ? (
            <RouterLink to="/cart">
              <IconButton icon={ShoppingCartIcon} intent="none" marginRight={16} />
            </RouterLink>
          ) : (
            <IconButton
              icon={ShoppingCartIcon}
              intent="none"
              marginRight={16}
              onClick={() => navigate('/product')}
            />
          )}
          {!user.id && (
            <IconButton 
              icon={PersonIcon} 
              intent="none" 
              marginRight={16} 
              onClick={() => setIsModalOpen(true)}
            />
          )}
          {user.id !== null && renderDropdownMenu()}
        </Pane>

        {/* Render the Login component as a modal */}
        {isModalOpen && (
          <Dialog
            isShown={isModalOpen}
            onCloseComplete={handleModalClose}
            hasFooter={false}
            minHeight="auto"
          >
            <Login onClose={handleModalClose} />
          </Dialog>
        )}
      </Pane>
    </Pane>
  );
}