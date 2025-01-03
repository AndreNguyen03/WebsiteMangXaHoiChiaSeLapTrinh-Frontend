import React, { useState, useEffect } from "react";
import { Modal, Button, Table } from "flowbite-react";
import { CheckCircle, XCircle } from "lucide-react";
import axios from "axios"; // Import axios

const ReportDetailModal = ({
  show,
  onClose,
  onShowToast,
  postId,
  onReportDelete,
}) => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch reports on modal open
  useEffect(() => {
    if (show) {
      setLoading(true);
      axios
        .get(
          `http://localhost:5114/api/Report/getReportsOfPost?postId=${postId}`
        )
        .then((response) => {
          setReports(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching reports:", error);
          setLoading(false);
        });
    } else {
      // Clear data when modal is closed
      setReports([]);
      setLoading(true);
    }
  }, [show, postId]);

  // Check if all reports are processed
  const allReportsProcessed = reports.every((report) => report.isDeleted);

  // Handle ignoring the report
  const handleIgnoreReport = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5114/api/Report/ignoreReport?postId=${postId}`
      );
      if (response.status === 200) {
        onShowToast("success", "Đã xử lý báo cáo thành công");
        onClose();
      } else {
        throw new Error("Failed to ignore report");
      }
    } catch (error) {
      console.error("Error ignoring report:", error);
      onShowToast("Xử lý báo cáo thất bại", "error");
    }
  };

  // Handle confirming reports
  const handleConfirmReport = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5114/api/Report/confirmReport?postId=${postId}`
      );
      if (response.status === 200) {
        onShowToast(
          "success",
          "Xác nhận báo cáo thành công và bài viết đã bị xóa"
        );
        onReportDelete(postId);
        onClose();
      } else {
        throw new Error("Failed to confirm report");
      }
    } catch (error) {
      console.error("Error confirming report:", error);
      onShowToast("Xác nhận báo cáo thất bại", "error");
    }
  };

  // Render status with colors and icons
  const renderStatus = (isDeleted) => {
    return isDeleted ? (
      <span className="flex items-center text-green-500">
        <CheckCircle className="w-5 h-5 mr-1" /> Đã xử lý
      </span>
    ) : (
      <span className="flex items-center text-red-500">
        <XCircle className="w-5 h-5 mr-1" /> Chưa xử lý
      </span>
    );
  };

  return (
    <Modal dismissible show={show} onClose={onClose}>
      <Modal.Header>Chi tiết báo cáo</Modal.Header>
      <Modal.Body>
        {loading ? (
          <div className="text-center">Đang tải dữ liệu...</div>
        ) : reports.length === 0 ? (
          <div className="text-center text-gray-500">Không có báo cáo nào.</div>
        ) : (
          <Table>
            <Table.Head>
              <Table.HeadCell className="whitespace-nowrap">
                Mã người dùng
              </Table.HeadCell>
              <Table.HeadCell className="whitespace-nowrap">
                Lý do báo cáo
              </Table.HeadCell>
              <Table.HeadCell className="whitespace-nowrap">
                Thời gian báo cáo
              </Table.HeadCell>
              <Table.HeadCell className="whitespace-nowrap">
                Tình trạng
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {reports.map((report) => (
                <Table.Row key={report.id}>
                  <Table.Cell>{report.userId}</Table.Cell>
                  <Table.Cell>{report.reason}</Table.Cell>
                  <Table.Cell>
                    {new Date(report.reportedAt).toLocaleString("vi-VN")}
                  </Table.Cell>
                  <Table.Cell className="min-w-36">
                    {renderStatus(report.isDeleted)}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        )}
      </Modal.Body>
      {!loading && reports.length > 0 && !allReportsProcessed && (
        <Modal.Footer className="grid grid-cols-2 gap-2">
          <Button color="failure" onClick={handleConfirmReport}>
            Chấp nhận báo cáo
          </Button>
          <Button color="gray" onClick={handleIgnoreReport}>
            Bỏ qua
          </Button>
        </Modal.Footer>
      )}
    </Modal>
  );
};

export default ReportDetailModal;
