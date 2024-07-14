import React, { useState } from 'react';

const SecuritySection = ({ user }) => {
  const [passwordChanged, setPasswordChanged] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSaveChanges = async () => {
    if (!user || !user.id) {
      setError('User information not available');
      return;
    }
  
    if (newPassword !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }
  
    try {
      const response = await fetch('http://localhost:5000/api/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          newPassword: newPassword,
        }),
      });
  
      if (response.ok) {
        setPasswordChanged(true);
        setError('');
      } else {
        setError('Failed to change password');
      }
    } catch (error) {
      console.error('Error changing password:', error.message);
      setError('Network error, please try again');
    }
  };  

  return (
    <div className="max-w-4xl mx-auto mt-[-25px] ml-6 p-8 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-6">Security</h2>

      {/* Change Password Section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Change Password</h3>
        <div className="space-y-6">
          <div className="mb-6">
            <input
              type="password"
              placeholder="New Password"
              className="input-field"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              placeholder="Confirm New Password"
              className="input-field"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
      </div>

      {/* Save Changes Button */}
      <button
        className="btn-primary bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-md"
        onClick={handleSaveChanges}
      >
        Save Changes
      </button>

      {/* Confirmation Message */}
      {passwordChanged && (
        <p className="mt-4 text-green-500">
          Your password has been successfully changed.
        </p>
      )}
    </div>
  );
};

export default SecuritySection;