import React from "react";
import { useState, useEffect } from "react";
import { Modal, Button, TextInput } from "flowbite-react";
import axios from "axios";

const UpdateUserModal = ({
  show,
  onClose,
  userData,
  onUpdate,
  onShowToast,
}) => {
  const [username, setUsername] = useState("");
  const [gravatar, setGravatar] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (userData) {
      setUsername(userData.username || "");
      setGravatar(userData.gravatar || "");
      setEmail(userData.email || "");
    }
  }, [userData]);

  const handleUpdateTag = () => {
    axios
      .put(`http://localhost:5114/api/Users/${userData.id}`, {
        username,
        gravatar,
        updatedAt: new Date().toISOString(),
        email,
      })
      .then((response) => {
        onClose(); // Đóng modal trước khi hiện toast
        onShowToast("success", "User updated successfully!");
        onUpdate(); // Làm mới dữ liệu
      })
      .catch((error) => {
        onShowToast("error", "Failed to update user. Please try again.");
        console.error("Error updating user:", error);
      });
  };

  return (
    <Modal show={show} onClose={onClose}>
      <Modal.Header>Update User</Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              User Name
            </label>
            <TextInput
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter user name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              User Name
            </label>
            <TextInput
              type="text"
              value={gravatar}
              onChange={(e) => setGravatar(e.target.value)}
              placeholder="Enter avatar link"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <TextInput
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleUpdateTag}>Update User</Button>
        <Button color="gray" onClick={onClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateUserModal;
