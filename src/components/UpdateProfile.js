import React, { useState } from 'react';
import { TextInputField, Button, toaster } from 'evergreen-ui';

const UpdateProfile = ({ details, onUpdate }) => {
  const [username, setUsername] = useState(details.username || '');
  const [firstName, setFirstName] = useState(details.firstName || '');
  const [lastName, setLastName] = useState(details.lastName || '');
  const [mobileNo, setMobileNo] = useState(details.mobileNo || '');
  const [address, setAddress] = useState(details.address || '');

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const response = await fetch(`${process.env.REACT_APP_API_URL}/user/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ username, firstName, lastName, mobileNo, address }),
    });

    if (response.ok) {
      const updatedUser = await response.json();
      toaster.success('Profile updated successfully');
      onUpdate(updatedUser);
    } else {
      const errorData = await response.json();
      toaster.danger(errorData.message);
    }
  };

  return (
    <div style={{ maxWidth: '400px', textAlign: 'left' }}>
      <h2>Update Profile</h2>
      <form onSubmit={handleUpdateProfile}>
        <TextInputField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextInputField
          label="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextInputField
          label="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <TextInputField
          label="Mobile Number"
          value={mobileNo}
          onChange={(e) => setMobileNo(e.target.value)}
        />
        <TextInputField
          label="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <Button type="submit" appearance="primary">
          Update Profile
        </Button>
      </form>
    </div>
  );
};

export default UpdateProfile;