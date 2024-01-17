import React, { useState } from 'react';
import { TextInputField, Button, toaster } from 'evergreen-ui';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toaster.danger('Passwords do not match');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.REACT_APP_API_URL}/user/update-password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ newPassword: password }),
      });

      if (response.ok) {
        toaster.success('Password reset successfully');
        setPassword('');
        setConfirmPassword('');
      } else {
        const errorData = await response.json();
        toaster.danger(errorData.message);
      }
    } catch (error) {
      toaster.danger('An error occurred. Please try again.');
    }
  };

  return (
    <div style={{ maxWidth: '400px' }}>
      <h2>Reset Password</h2>
      <form onSubmit={handleResetPassword}>
        <TextInputField
          label="New Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextInputField
          label="Confirm New Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button type="submit" appearance="primary">
          Reset Password
        </Button>
      </form>
    </div>
  );
};

export default ResetPassword;
