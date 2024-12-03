import React, { useState, useEffect } from "react";
import { Modal, Button, TextInput } from "flowbite-react";
import axios from "axios";

const UpdateTagModal = ({ show, onClose, tagData, onUpdate, onShowToast }) => {
  const [tagname, setTagname] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (tagData) {
      setTagname(tagData.tagname || "");
      setDescription(tagData.description || "");
    }
  }, [tagData]);

  const handleUpdateTag = () => {
    axios
      .put(`http://localhost:5114/api/Tags/${tagData.id}`, {
        tagname,
        description,
      })
      .then((response) => {
        onClose(); // Đóng modal trước khi hiện toast
        onShowToast("success", "Tag updated successfully!");
        onUpdate(); // Làm mới dữ liệu
      })
      .catch((error) => {
        onShowToast("error", "Failed to update tag. Please try again.");
        console.error("Error updating tag:", error);
      });
  };

  return (
    <Modal show={show} onClose={onClose}>
      <Modal.Header>Update Tag</Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tag Name
            </label>
            <TextInput
              type="text"
              value={tagname}
              onChange={(e) => setTagname(e.target.value)}
              placeholder="Enter tag name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <TextInput
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleUpdateTag}>Update Tag</Button>
        <Button color="gray" onClick={onClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateTagModal;
