import React, { useState, useEffect } from "react";
import { Button } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchIgnoredTags,
  ignoreTag,
  unignoreTag,
} from "../../features/IgnoreTags/IgnoreTags";
import axios from "axios";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1 },
};

const IgnoreTagBox = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const { tags, loading } = useSelector((state) => state.ignoredTags);
  const location = useLocation();
  const [isEditing, setIsEditing] = useState(false);
  const [newTag, setNewTag] = useState("");
  const [suggestedTags, setSuggestedTags] = useState([]);
  const [availableTags, setAvailableTags] = useState([]);
  const [localTags, setLocalTags] = useState([]);

  // Lấy userid từ URL nếu đang ở /users/{userid}
  const isUserProfilePage = location.pathname.startsWith("/users/");
  const userIdInUrl = isUserProfilePage
    ? location.pathname.split("/")[2]
    : null;

  // Fetch available tags từ API
  useEffect(() => {
    axios
      .get("http://localhost:5114/api/Tags")
      .then((response) => {
        const mappedData = response.data.map((tag) => ({
          id: tag.id,
          name: tag.tagname,
        }));
        setAvailableTags(mappedData);
      })
      .catch((error) => {
        console.error("There was an error fetching the tags!", error);
      });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const result = await dispatch(
        fetchIgnoredTags(userIdInUrl || authState.user)
      );
      if (result.error) {
        console.error("Lỗi khi fetch ignored tags:", result.error);
        return;
      }
      setLocalTags(result.payload);
    };

    fetchData();
  }, [userIdInUrl]);

  // Cập nhật danh sách gợi ý tag khi người dùng nhập vào
  useEffect(() => {
    if (newTag.length > 0) {
      setSuggestedTags(
        availableTags.filter((tag) =>
          tag.name.toLowerCase().includes(newTag.toLowerCase())
        )
      );
    } else {
      setSuggestedTags([]);
    }
  }, [newTag, availableTags]);

  // Hàm để thêm tag vào danh sách
  const addTag = (tag) => {
    dispatch(ignoreTag({ userId: authState.user, tagId: tag.id }));
    if (localTags.find((t) => t.id === tag.id)) return;
    setLocalTags([...localTags, { id: tag.id, name: tag.name }]);
  };

  // Hàm để xoá tag khỏi danh sách
  const removeTag = (tagId) => {
    dispatch(unignoreTag({ userId: authState.user, tagId }));
    setLocalTags(localTags.filter((tag) => tag.id !== tagId));
  };

  return (
    <motion.div
      className="h-fit w-full bg-gray-200 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 border border-gray-100 p-4 mt-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.01 }}
    >
      <motion.div
        className="flex justify-between mb-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <motion.h3
          className="text-lg font-semibold"
          whileHover={{ scale: 1.05 }}
        >
          Các thẻ bị bỏ qua
        </motion.h3>
        {isUserProfilePage && userIdInUrl === authState.user ? (
          <Button
            outline
            gradientDuoTone="cyanToBlue"
            className="text-center align-text-bottom hover:scale-105 transition-transform"
            size="xs"
            pill
            onClick={() => setIsEditing(!isEditing)}
          >
            <span className="flex items-center justify-center">
              {isEditing ? "Xong" : "Chỉnh sửa"}
            </span>
          </Button>
        ) : !isUserProfilePage ? (
          <Button
            outline
            gradientDuoTone="cyanToBlue"
            className="text-center align-text-bottom hover:scale-105 transition-transform"
            size="xs"
            pill
            onClick={() => setIsEditing(!isEditing)}
          >
            <span className="flex items-center justify-center">
              {isEditing ? "Xong" : "Chỉnh sửa"}
            </span>
          </Button>
        ) : null}
      </motion.div>

      {isEditing && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-3"
        >
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            className="p-2 rounded-md h-20 w-full border border-gray-300 mb-2"
            placeholder="Nhập tên tag để tìm kiếm..."
          />
          {suggestedTags.length > 0 && (
            <div className="bg-white border rounded-md p-2 mt-2">
              {suggestedTags.map((tag) => (
                <motion.div
                  key={tag.id}
                  variants={item}
                  whileHover={{ scale: 1.05 }}
                  className="flex justify-between items-center px-3 py-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => addTag(tag)}
                >
                  <span>{tag.name}</span>
                  <span className="text-gray-500 text-sm">+ Thêm</span>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      )}

      <motion.div
        className="flex flex-wrap gap-2"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {loading === true ? (
          <motion.p
            className="text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Đang tải...
          </motion.p>
        ) : !localTags || localTags.length === 0 ? (
          <motion.p
            className="text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Không có thẻ nào
          </motion.p>
        ) : (
          localTags.map((tag, index) => (
            <motion.div
              key={index}
              variants={item}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="flex items-center"
            >
              <Link
                to={`/questions/tags/${tag.id}`}
                className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm hover:bg-gray-300 transition-colors duration-200"
              >
                {tag.name}
              </Link>
              {isEditing && (
                <button
                  onClick={() => removeTag(tag.id)}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  <span>&#x2715;</span>
                </button>
              )}
            </motion.div>
          ))
        )}
      </motion.div>
    </motion.div>
  );
};

export default IgnoreTagBox;
