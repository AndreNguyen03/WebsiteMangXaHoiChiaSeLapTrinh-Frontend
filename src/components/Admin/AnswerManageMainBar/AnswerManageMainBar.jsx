import React from "react";
import { useState, useEffect } from "react";
import SearchBar from "../../SearchBar/SearchBar";
import { Table, Button } from "flowbite-react";
import UpdateAnswerModal from "./UpdateAnswerModal";
import axios from "axios";
import ToastNotification from "../../ToastNotification/ToastNotification";

const AnswerManageMainBar = () => {
  const [showActions, setShowActions] = useState(false);
  const [search, setSearch] = useState("");
  const [answers, setAnswers] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [toastType, setToastType] = useState(""); // "success" hoặc "error"
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const columns = [
    { headerName: "Answer ID", key: "id" },
    { headerName: "Body", key: "body" },
    { headerName: "User answers ID", key: "userId" },
    { headerName: "Post ID", key: "postId" },
    { headerName: "Created At", key: "createdAt", isDate: true },
    { headerName: "Updated At", key: "updatedAt", isDate: true },
    ...(showActions
      ? [{ headerName: "Edit", key: "actions", isAction: true }]
      : []),
  ];

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "2-digit" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const fetchAnswers = () => {
    axios
      .get("http://localhost:5114/api/Answers") // Gọi API
      .then((response) => {
        console.log(response.data);

        // Chuyển đổi dữ liệu API theo định dạng custom
        const mappedData = response.data.map((answer) => ({
          id: answer.id, // Đổi id thành customId
          body: answer.body, // Đổi title thành customTitle
          createdAt: answer.createdAt, // Đổi createdAt thành customDate
          updatedAt: answer.updatedAt, // Đổi createdAt thành customDate
          userId: answer.userId, // Đổi user thành customUser
          postId: answer.postId, // Đổi user thành customUser
        }));

        setAnswers(mappedData); // Lưu vào state custom
      })
      .catch((error) => {
        console.error("There was an error fetching the posts!", error);
      });
  };

  useEffect(() => {
    fetchAnswers();
  }, []);

  const handleEditClick = (answer) => {
    setSelectedAnswer(answer);
    setShowUpdateModal(true);
  };

  const handleShowToast = (type, message) => {
    setToastType(type);
    setToastMessage(message);
    setShowToast(true);

    // Tự động ẩn toast sau 3 giây
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">All answers</h1>
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <div className="flex-1">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search answers..."
          />
        </div>
        <div className="flex gap-2 justify-center">
          {/* <Button className="" gradientDuoTone="cyanToBlue">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Add answers
          </Button> */}
          <Button outline className="" gradientDuoTone="cyanToBlue">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m6.75 12-3-3m0 0-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
              />
            </svg>
            Export
          </Button>

          <Button
            className=""
            gradientDuoTone="greenToBlue"
            onClick={() => setShowActions(!showActions)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z"
              />
            </svg>
            Manage Actions
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table hoverable striped className="">
          <Table.Head>
            {columns.map((column, index) => (
              <Table.HeadCell
                key={index}
                className="bg-blue-200 text-gray-600 text-xs"
              >
                {column.headerName}
              </Table.HeadCell>
            ))}
          </Table.Head>
          <Table.Body className="divide-y">
            {answers.map((answer) => (
              <Table.Row
                key={answer.id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {answer.id}
                </Table.Cell>
                <Table.Cell>{answer.body}</Table.Cell>
                <Table.Cell>{answer.userId}</Table.Cell>
                <Table.Cell>{answer.postId}</Table.Cell>
                <Table.Cell>{formatDate(answer.createdAt)}</Table.Cell>
                <Table.Cell>{formatDate(answer.updatedAt)}</Table.Cell>
                {showActions && (
                  <Table.Cell className="flex gap-2">
                    <Button
                      outline
                      gradientDuoTone="tealToLime"
                      onClick={() => handleEditClick(answer)}
                    >
                      Edit
                    </Button>
                    <Button outline gradientDuoTone="pinkToOrange">
                      Delete
                    </Button>
                  </Table.Cell>
                )}
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>

      <UpdateAnswerModal
        show={showUpdateModal}
        onClose={() => setShowUpdateModal(false)}
        answerData={selectedAnswer}
        onUpdate={fetchAnswers}
        onShowToast={handleShowToast}
      />
      {showToast && (
        <div className="fixed bottom-4 right-4">
          <ToastNotification
            type={toastType}
            message={toastMessage}
            onClose={() => setShowToast(false)}
          />
        </div>
      )}
    </div>
  );
};

export default AnswerManageMainBar;
