import React from "react";
import { useState, useEffect } from "react";
import SearchBar from "../../SearchBar/SearchBar";
import AddTagModal from "./AddTagModal";
import UpdateTagModal from "./UpdateTagModal";
import DeleteTagModal from "./DeleteTagModal";
import ToastNotification from "../../ToastNotification/ToastNotification";
import { Table, Button, Toast } from "flowbite-react";
import axios from "axios";

const TagManageMainBar = () => {
  const [showActions, setShowActions] = useState(false);
  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTag, setSelectedTag] = useState(null);
  const [toastType, setToastType] = useState(""); // "success" hoặc "error"
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [tags, setTags] = useState([]);

  const columns = [
    { headerName: "Tag ID", key: "id" },
    { headerName: "Tag Name", key: "tagname" },
    { headerName: "description", key: "description" },
    ...(showActions
      ? [{ headerName: "Edit", key: "actions", isAction: true }]
      : []),
  ];

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "2-digit" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const fetchTags = () => {
    axios
      .get("http://localhost:5114/api/Tags")
      .then((response) => {
        const mappedData = response.data.map((tag) => ({
          id: tag.id,
          tagname: tag.tagname,
          description: tag.description,
        }));
        setTags(mappedData);
      })
      .catch((error) => {
        console.error("Error fetching tags:", error);
      });
  };

  useEffect(() => {
    fetchTags();
  }, []);

  const handleEditClick = (tag) => {
    setSelectedTag(tag);
    setShowUpdateModal(true);
  };

  const handleDeleteClick = (tag) => {
    setSelectedTag(tag);
    setShowDeleteModal(true);
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
      <h1 className="text-2xl font-bold mb-4">All tags</h1>
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <div className="flex-1">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search answers..."
          />
        </div>
        <div className="flex gap-2 justify-center">
          <Button
            className=""
            gradientDuoTone="cyanToBlue"
            onClick={() => setShowAddModal(true)}
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
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Add tags
          </Button>
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
            {tags.map((tag) => (
              <Table.Row
                key={tag.id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {tag.id}
                </Table.Cell>
                <Table.Cell>{tag.tagname}</Table.Cell>
                <Table.Cell>{tag.description}</Table.Cell>
                {showActions && (
                  <Table.Cell className="flex gap-2">
                    <Button
                      outline
                      gradientDuoTone="tealToLime"
                      onClick={() => handleEditClick(tag)}
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDeleteClick(tag)}
                      outline
                      gradientDuoTone="pinkToOrange"
                    >
                      Delete
                    </Button>
                  </Table.Cell>
                )}
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
      <AddTagModal
        onShowToast={handleShowToast}
        show={showAddModal}
        onAdd={fetchTags}
        onClose={() => setShowAddModal(false)}
      />
      <UpdateTagModal
        show={showUpdateModal}
        onClose={() => setShowUpdateModal(false)}
        tagData={selectedTag}
        onUpdate={fetchTags}
        onShowToast={handleShowToast}
      />
      <DeleteTagModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        tagID={selectedTag?.id}
        onDelete={fetchTags}
        onShowToast={handleShowToast}
      ></DeleteTagModal>

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

export default TagManageMainBar;
