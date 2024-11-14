import React from "react";
import { useState } from "react";
import { Modal, Button, Toast } from "flowbite-react";
import PasswordChangeForm from "./PasswordChangeForm";
import ProfileForm from "./ProfileForm";

const UpdateUserInfoModal = ({ openModal, setOpenModal }) => {
  const [formData, setFormData] = useState({
    username: "",
    displayName: "",
    email: "",
  });

  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    Toast.success("Profile updated successfully!");
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      Toast.error("Passwords do not match!");
      return;
    }
    Toast.success("Password changed successfully!");
    setShowPasswordChange(false);
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  return (
    <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
      <Modal.Header>Terms of Service</Modal.Header>
      <Modal.Body>
        <ProfileForm
          formData={formData}
          handleInputChange={handleInputChange}
          handleProfileUpdate={handleProfileUpdate}
        />

        <div className="pt-4 border-t">
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => setShowPasswordChange(!showPasswordChange)}
          >
            Change Password
          </Button>

          {showPasswordChange && (
            <PasswordChangeForm
              passwordData={passwordData}
              handlePasswordInputChange={handlePasswordInputChange}
              handlePasswordChange={handlePasswordChange}
            />
          )}
        </div>
      </Modal.Body>
      <Modal.Footer className="flex flex-row justify-end">
        <Button onClick={() => setOpenModal(false)}>I accept</Button>
        <Button color="gray" onClick={() => setOpenModal(false)}>
          Decline
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateUserInfoModal;
