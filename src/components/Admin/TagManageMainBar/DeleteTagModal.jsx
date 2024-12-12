import React from "react";
import { Modal, Button } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import axios from "axios";

const DeleteTagModal = ({ show, onClose, tagID, onDelete, onShowToast }) => {
  const handleDeleteTag = () => {
    axios
      .delete(`http://localhost:5114/api/Tags/${tagID}`)
      .then((response) => {
        onClose(); // Đóng modal trước khi hiện toast
        onShowToast("success", "Tag deleted successfully!");
        onDelete(); // Làm mới dữ liệu
      })
      .catch((error) => {
        onClose(); // Đóng modal trước khi hiện toast
        onShowToast("error", "Failed to delete tag. Please try again.");
        console.error("Error updating tag:", error);
      });
  };

  return (
    <Modal show={show} size="sm" onClose={onClose} popup>
      <Modal.Header />
      <Modal.Body>
        <div className="text-center">
          <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Bạn có chắc muốn xoá tag này
          </h3>
          <div className="flex justify-center gap-4">
            <Button color="failure" onClick={handleDeleteTag}>
              {"Chắc chắn"}
            </Button>
            <Button color="gray" onClick={onClose}>
              Huỷ
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteTagModal;
