import React, { useState } from "react";
import { Modal, Button, Textarea } from "flowbite-react";
import axios from "axios";

const ReportModal = ({ postId, userId, show, onClose, onReportSuccess }) => {
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReport = async () => {
    if (!reason.trim()) {
      alert("Vui lòng nhập lý do báo cáo.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5114/api/Report/reportViolation",
        {
          userId,
          postId,
          reason,
        }
      );

      alert("Báo cáo vi phạm thành công!");
      if (onReportSuccess) onReportSuccess(); // Trigger fetch in ReportButton
      onClose(); // Close the modal after successful submission
    } catch (error) {
      console.error("Error reporting the violation:", error);
      alert("Báo cáo vi phạm thất bại. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal dismissible show={show} onClose={onClose}>
      <Modal.Header>Báo cáo vi phạm</Modal.Header>
      <Modal.Body>
        <div>
          <label
            htmlFor="reason"
            className="block text-sm font-medium text-gray-700"
          >
            Lý do báo cáo
          </label>
          <Textarea
            id="reason"
            placeholder="Nhập lí do báo cáo..."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows={4}
            className="mt-2"
          />
        </div>
      </Modal.Body>
      <Modal.Footer className="grid grid-cols-2 gap-2">
        <Button
          isProcessing={loading}
          onClick={handleReport}
          disabled={loading}
          gradientMonochrome="failure"
        >
          {loading ? "Đang báo cáo..." : "Báo cáo"}
        </Button>
        <Button onClick={onClose} color="gray">
          Huỷ
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ReportModal;
