import React from "react";
import { Modal, Button } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import axios from "axios";

const DeletePostModal = ({ show, onClose, postID, onDelete, onShowToast }) => {
  const handleDeletePost = () => {
    axios
      .delete(`http://localhost:5114/api/Posts/${postID}`)
      .then(() => {
        onClose();
        onShowToast("success", "Câu hỏi đã được xoá thành công!");
        onDelete();
      })
      .catch((error) => {
        onClose();
        onShowToast("error", "Câu hỏi xoá thất bại. Vui lòng thử lại.");
      });
  };

  return (
    <Modal show={show} size="sm" onClose={onClose} popup>
      <Modal.Header />
      <Modal.Body>
        <div className="text-center">
          <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Bạn có chắc muốn xoá câu hỏi này không?
          </h3>
          <div className="flex justify-center gap-4">
            <Button gradientMonochrome="failure" onClick={handleDeletePost}>
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

export default DeletePostModal;
