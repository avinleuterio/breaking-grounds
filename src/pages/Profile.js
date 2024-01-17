import React, { useContext, useEffect, useState } from 'react';
import { Tablist, Tab, Heading, Text, Strong, Pane, UnorderedList, ListItem, majorScale } from 'evergreen-ui';
import UserContext from '../UserContext';
import UpdateProfile from '../components/UpdateProfile';
import ResetPassword from '../components/ResetPassword';

export default function Profile() {
  useContext(UserContext);

  const [details, setDetails] = useState({});
  const [selectedTab, setSelectedTab] = useState('userinformation');

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/user/details`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    .then((res) => res.json())
    .then((data) => {
      if (typeof data._id !== 'undefined') {
        setDetails(data);
      }
    });
  }, []);

  const handleProfileUpdate = (updatedUser) => {
    setDetails(updatedUser);
  };

  return (
    <Pane display="flex" height="90vh">
      {/* Sidebar Navigation */}
      <Pane flexBasis={240} background="gray200" paddingTop={majorScale(4)}>
        <Tablist marginBottom={majorScale(4)}>
          {['User Information', 'Update Profile', 'Reset Password'].map((tab, index) => (
            <Tab 
              aria-controls={`panel-${tab}`}
              direction="vertical"
              key={tab}
              id={tab.toLowerCase().replace(' ', '')}
              isSelected={selectedTab === tab.toLowerCase().replace(' ', '')}
              onSelect={() => setSelectedTab(tab.toLowerCase().replace(' ', ''))}
              paddingLeft={majorScale(5)}
            >
              {tab}
            </Tab>
          ))}
        </Tablist>
      </Pane>

      {/* Content Area for Selected Tab */}
      <Pane flex={1} background="tint1" padding={majorScale(5)}>
        {selectedTab === 'userinformation' && (
          <Pane display="flex" alignItems="center">
            <Pane flex={1}>
              <h2>Profile</h2>
              <Heading size={600} marginTop={majorScale(3)}>{`${details.firstName} ${details.lastName}`}</Heading>
              <Text size={400} marginTop={majorScale(1)}>{`@${details.username}`}</Text>
              
              <Pane height={1} background="gray500" opacity={0.2} marginTop={majorScale(4)} marginBottom={majorScale(4)} />
              
              <Heading size={600} marginBottom={majorScale(2)}>Contact Information:</Heading>
              <UnorderedList>
                <ListItem>Email: <Strong>{details.email}</Strong></ListItem>
                <ListItem>Mobile No: <Strong>{details.mobileNo}</Strong></ListItem>
                <ListItem>Address: <Strong>{details.address}</Strong></ListItem>
              </UnorderedList>
            </Pane>
          </Pane>
        )}

        {selectedTab === 'updateprofile' && (
          <UpdateProfile details={details} onUpdate={handleProfileUpdate} />
        )}

        {selectedTab === 'resetpassword' && <ResetPassword />}
        {selectedTab === 'orderhistory' && <Pane>Display order history here</Pane>}
      </Pane>
    </Pane>
  );
}
