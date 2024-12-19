import React, { useState, useEffect } from "react";
import { Modal, Button, Toast } from "flowbite-react";
import PasswordChangeForm from "./PasswordChangeForm";
import ProfileForm from "./ProfileForm";
import axios from "axios";

const UpdateUserInfoModal = ({ user, openModal, setOpenModal }) => {
  const [formData, setFormData] = useState({
    username: user.username || "",
    gravatar: user.gravatar || "",
    email: user.email || "",
  });

  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    setFormData({
      username: user.username || "",
      gravatar: user.gravatar || "",
      email: user.email || "",
    });
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:5114/api/Users/${user.id}`,
        {
          username: formData.username,
          email: formData.email,
          gravatar: formData.gravatar,
        }
      );

      setOpenModal(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      console.log("Mật khẩu mới không khớp!");
      return;
    }

    try {
      // Gọi API validateUser
      const validateResponse = await axios.post(
        "http://localhost:5114/api/Auth/validateUser",
        {
          email: user.email,
          password: passwordData.currentPassword,
        }
      );

      if (validateResponse.data.status === "success") {
        // Nếu validate thành công, gọi API changePassword
        const changeResponse = await axios.post(
          "http://localhost:5114/api/Auth/changePassword",
          {
            email: user.email,
            newPassword: passwordData.newPassword,
          }
        );

        console.log(changeResponse.data.message);
        setShowPasswordChange(false);
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        console.log("Mật khẩu hiện tại không chính xác!");
      }
    } catch (error) {
      console.error("Lỗi khi thay đổi mật khẩu:", error);
    }
  };

  return (
    <Modal
      size="2xl"
      dismissible
      show={openModal}
      onClose={() => setOpenModal(false)}
    >
      <Modal.Header>Chỉnh sửa thông tin</Modal.Header>
      <Modal.Body>
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
            className="w-full"
            onClick={() => setShowPasswordChange(!showPasswordChange)}
          >
            Đổi mật khẩu
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
