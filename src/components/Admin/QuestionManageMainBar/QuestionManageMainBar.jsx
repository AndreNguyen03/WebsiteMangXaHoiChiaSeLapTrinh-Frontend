import React, { useState, useEffect } from "react";
import { Table, Button, Pagination, Dropdown } from "flowbite-react";
import axios from "axios";

import ToastNotification from "../../ToastNotification/ToastNotification";
import UpdatePostModal from "./UpdatePostModal";
import DeletePostModal from "./DeletePostModal";
import SearchBar from "../../SearchBar/SearchBar";

const QuestionManageMainBar = () => {
  const [showActions, setShowActions] = useState(false);
  const [search, setSearch] = useState("");
  const [posts, setPosts] = useState([]);

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const [toastType, setToastType] = useState(""); // "success" hoặc "error"
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const columns = [
    { headerName: "Mã câu hỏi", key: "id" },
    { headerName: "Tiêu đề", key: "title" },
    { headerName: "Vấn đề chi tiết", key: "detailProblem" },
    { headerName: "Đã thử và mong đợi", key: "tryAndExpecting" },
    { headerName: "Mã người đăng", key: "userId" },
    { headerName: "Lượt xem", key: "views" },
    { headerName: "Tạo vào lúc", key: "createdAt", isDate: true },
    { headerName: "Cập nhật vào lúc", key: "updatedAt", isDate: true },
    ...(showActions
      ? [{ headerName: "Thao tác", key: "actions", isAction: true }]
      : []),
  ];

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "2-digit" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    axios
      .get("http://localhost:5114/api/Posts")
      .then((response) => {
        const mappedData = response.data.map((post) => ({
          id: post.id,
          title: post.title,
          detailProblem: post.detailProblem,
          tryAndExpecting: post.tryAndExpecting,
          createdAt: post.createdAt,
          updatedAt: post.updatedAt,
          views: post.views,
          userId: post.userId,
        }));

        setPosts(mappedData);
      })
      .catch((error) => {
        console.error("There was an error fetching the posts!", error);
      });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (items) => {
    setItemsPerPage(items);
    setCurrentPage(1);
  };

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleEditClick = (post) => {
    setSelectedPost(post);
    setShowUpdateModal(true);
  };

  const handleDeleteClick = (post) => {
    setSelectedPost(post);
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
      <h1 className="text-2xl font-bold mb-4">Tất cả câu hỏi</h1>
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <div className="flex-1">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Tìm kiếm câu hỏi..."
          />
        </div>
        <div className="flex gap-2 justify-center">
          <Button
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
            Quản lý thao tác
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table hoverable striped>
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
            {paginatedPosts.map((post) => (
              <Table.Row
                key={post.id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {post.id}
                </Table.Cell>
                <Table.Cell>{post.title}</Table.Cell>
                <Table.Cell>{post.detailProblem}</Table.Cell>
                <Table.Cell className="line-clamp-1">
                  {post.tryAndExpecting}
                </Table.Cell>
                <Table.Cell>{post.userId}</Table.Cell>
                <Table.Cell>{post.views}</Table.Cell>
                <Table.Cell>{formatDate(post.createdAt)}</Table.Cell>
                <Table.Cell>{formatDate(post.updatedAt)}</Table.Cell>
                {showActions && (
                  <Table.Cell className="flex gap-2">
                    <Button
                      outline
                      gradientDuoTone="tealToLime"
                      onClick={() => handleEditClick(post)}
                    >
                      Sửa
                    </Button>
                    <Button
                      onClick={() => handleDeleteClick(post)}
                      outline
                      gradientDuoTone="pinkToOrange"
                    >
                      Xóa
                    </Button>
                  </Table.Cell>
                )}
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <Dropdown
          label={`Hiển thị ${itemsPerPage} mục`}
          onSelect={(e) => handleItemsPerPageChange(Number(e.target.value))}
        >
          {[5, 10, 20, 50].map((size) => (
            <Dropdown.Item
              key={size}
              onClick={() => handleItemsPerPageChange(size)}
            >
              {size} mục/trang
            </Dropdown.Item>
          ))}
        </Dropdown>
        <Pagination
          currentPage={currentPage}
          onPageChange={handlePageChange}
          totalPages={Math.ceil(filteredPosts.length / itemsPerPage)}
        />
      </div>
      <UpdatePostModal
        show={showUpdateModal}
        onClose={() => setShowUpdateModal(false)}
        postData={selectedPost}
        onUpdate={fetchPosts}
        onShowToast={handleShowToast}
      />
      <DeletePostModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        postID={selectedPost?.id}
        onDelete={fetchPosts}
        onShowToast={handleShowToast}
      ></DeletePostModal>
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

export default QuestionManageMainBar;
