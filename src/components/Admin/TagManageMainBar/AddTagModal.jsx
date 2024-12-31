import React, { useState } from "react";
import { Modal, Button, TextInput, Toast } from "flowbite-react";
import axios from "axios";

const AddTagModal = ({ show, onClose, onAdd, onShowToast }) => {
  const [tagname, setTagname] = useState("");
  const [description, setDescription] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const handleAddTag = () => {
    axios
      .post("http://localhost:5114/api/Tags", {
        tagname,
        description,
      })
      .then((response) => {
        onClose(); // Đóng modal trước khi hiện toast
        onShowToast("success", "Thêm thẻ thành công.");
        onAdd(); // Làm mới dữ liệu
      })
      .catch((error) => {
        onShowToast("error", "Thêm thẻ thất bại.");
        console.error("Error adding tag:", error);
      });
  };

  return (
    <>
      {showToast && (
        <div className="fixed top-4 right-4">
          <Toast>
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500">
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1.707-8.293a1 1 0 011.414 0L10 9.586l1.293-1.293a1 1 0 011.414 1.414L11.414 11l1.293 1.293a1 1 0 01-1.414 1.414L10 12.414l-1.293 1.293a1 1 0 01-1.414-1.414L8.586 11 7.293 9.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3 text-sm font-normal">{toastMessage}</div>
            <Toast.Toggle onClick={() => setShowToast(false)} />
          </Toast>
        </div>
      )}

      <Modal show={show} onClose={onClose}>
        <Modal.Header>Thêm thẻ mới</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Tên thẻ
              </label>
              <TextInput
                type="text"
                value={tagname}
                onChange={(e) => setTagname(e.target.value)}
                placeholder="Nhập tên thẻ"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Mô tả
              </label>
              <TextInput
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Nhập mô tả"
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleAddTag}>Thêm</Button>
          <Button color="gray" onClick={onClose}>
            Huỷ
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddTagModal;
