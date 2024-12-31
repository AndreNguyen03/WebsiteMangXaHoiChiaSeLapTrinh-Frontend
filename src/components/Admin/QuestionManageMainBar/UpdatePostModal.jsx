import React, { useState, useEffect } from "react";
import { Modal, Button, TextInput } from "flowbite-react";
import axios from "axios";

const UpdatePostModal = ({
  show,
  onClose,
  postData,
  onUpdate,
  onShowToast,
}) => {
  const [title, setTitle] = useState("");
  const [tryAndExpecting, setTryAndExpecting] = useState("");
  const [detailProblem, setDetailProblem] = useState("");

  useEffect(() => {
    if (show && postData) {
      setTitle(postData.title || "");
      setTryAndExpecting(postData.tryAndExpecting || "");
      setDetailProblem(postData.detailProblem || "");
    }
  }, [show, postData]);

  const handleUpdate = () => {
    if (!postData) return;
    axios
      .put(`http://localhost:5114/api/Posts/${postData.id}`, {
        id: postData.id,
        title,
        tryandexpecting: tryAndExpecting,
        detailproblem: detailProblem,
      })
      .then(() => {
        onClose();
        onShowToast("success", "Câu hỏi đã được cập nhật thành công!");
        onUpdate();
      })
      .catch((error) => {
        onShowToast("error", "Cập nhật câu hỏi thất bại. Vui lòng thử lại.");
      });
  };

  if (!postData) {
    return null;
  }

  return (
    <Modal show={show} onClose={onClose}>
      <Modal.Header>Cập nhật câu hỏi</Modal.Header>
      <Modal.Body>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            ID Câu hỏi
          </label>
          <TextInput value={postData.id} readOnly />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Tiêu đề
          </label>
          <TextInput
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Thử và kỳ vọng
          </label>
          <TextInput
            type="text"
            value={tryAndExpecting}
            onChange={(e) => setTryAndExpecting(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Chi tiết vấn đề
          </label>
          <TextInput
            type="text"
            value={detailProblem}
            onChange={(e) => setDetailProblem(e.target.value)}
          />
        </div>
      </Modal.Body>
      <Modal.Footer className="grid grid-cols-2">
        <Button
          gradientMonochrome="lime"
          className="text-white"
          onClick={handleUpdate}
        >
          Lưu
        </Button>
        <Button
          gradientMonochrome="failure"
          outline
          color="gray"
          onClick={onClose}
        >
          Huỷ
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdatePostModal;
