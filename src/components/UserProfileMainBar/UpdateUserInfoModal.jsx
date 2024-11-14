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
    <Modal
      size="2xl"
      dismissible
      className=""
      show={openModal}
      onClose={() => setOpenModal(false)}
    >
      <Modal.Header>Edit Profile</Modal.Header>
      <Modal.Body className="">
        <ProfileForm
          formData={formData}
          handleInputChange={handleInputChange}
          handleProfileUpdate={handleProfileUpdate}
        />

        <div className="pt-4 mt-4 border-t">
          <Button
            outline
            size="md"
            gradientDuoTone="cyanToBlue"
            className="w-full "
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
    </Modal>
  );
};

export default UpdateUserInfoModal;
