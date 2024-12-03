import React, { useState, useEffect } from "react";
import { Modal, Button, TextInput, Toast } from "flowbite-react";
import axios from "axios";

const UpdateAnswerModal = ({ selectedAnswer, openModal, setOpenModal }) => {
  const [answerBody, setAnswerBody] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (openModal && selectedAnswer) {
      setAnswerBody(selectedAnswer.body);
    }
  }, [openModal, selectedAnswer]);

  const handleUpdate = () => {
    if (!selectedAnswer) return; // Bảo vệ thêm ở đây
    axios
      .put(`http://localhost:5114/api/Answers/${selectedAnswer.id}`, {
        body: answerBody,
        updatedAt: new Date().toISOString(),
      })
      .then(() => {
        setToastMessage("Answer updated successfully!");
        setShowToast(true);
        setOpenModal(false);
      })
      .catch(() => {
        setToastMessage("Error updating answer. Please try again.");
        setShowToast(true);
      });
  };

  if (!selectedAnswer) {
    return null; // Tránh render modal nếu không có dữ liệu
  }

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

      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Update Answer</Modal.Header>
        <Modal.Body>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Answer ID
            </label>
            <TextInput value={selectedAnswer.id} readOnly />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              User ID
            </label>
            <TextInput value={selectedAnswer.userId} readOnly />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Post ID
            </label>
            <TextInput value={selectedAnswer.postId} readOnly />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Answer Body
            </label>
            <TextInput
              type="text"
              value={answerBody}
              onChange={(e) => setAnswerBody(e.target.value)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleUpdate}>Save</Button>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default UpdateAnswerModal;
