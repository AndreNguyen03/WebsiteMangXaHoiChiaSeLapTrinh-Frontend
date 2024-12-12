import React, { useState, useEffect } from "react";
import { TextInput, Button } from "flowbite-react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "flowbite-react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addTempTag, removeTempTag } from "../../features/TempTags/TempTags";
import { motion } from "framer-motion";

const TagInput = ({ selectedTags, setSelectedTags, error, renderError }) => {
  const [searchTag, setSearchTag] = useState("");
  const [availableTags, setAvailableTags] = useState([]);
  const [newTagName, setNewTagName] = useState("");
  const [newTagDescription, setNewTagDescription] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuggestOpen, setIsSuggestOpen] = useState(false);
  const dispatch = useDispatch();
  const tempTags = useSelector((state) => state.tempTags);

  // Fetch available tags from the API
  useEffect(() => {
    const fetchAvailableTags = async () => {
      try {
        const response = await axios.get("http://localhost:5114/api/Tags");
        const mappedData = response.data.map((tag) => ({
          id: tag.id,
          tagname: tag.tagname,
          description: tag.description,
        }));
        setAvailableTags(mappedData);
      } catch (error) {
        console.error("There was an error fetching the tags!", error);
      }
    };
    fetchAvailableTags();
  }, []);

  const handleSearchTag = (e) => {
    setSearchTag(e.target.value);
    setIsSuggestOpen(true);
  };

  const handleSelectTag = (tag) => {
    if (selectedTags.length < 5 && !selectedTags.includes(tag)) {
      setSelectedTags((prevTags) => [...prevTags, tag]);
    }
    setIsSuggestOpen(false);
  };

  const handleRemoveTag = (tagId) => {
    setSelectedTags((prevTags) => prevTags.filter((tag) => tag.id !== tagId));
    dispatch(removeTempTag(tagId));
  };

  const handleAddNewTag = async () => {
    const newTag = {
      tagname: newTagName,
      description: newTagDescription,
    };
    dispatch(addTempTag(newTag));
    setSelectedTags((prevTags) => [...prevTags, newTag]);
    setIsModalOpen(false);
    setNewTagName("");
    setNewTagDescription("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.6 }}
      className="bg-white rounded-lg shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300"
    >
      <label
        className="block text-gray-800 text-lg font-semibold mb-2"
        htmlFor="tags"
      >
        Thẻ
      </label>
      <p className="text-gray-600 text-sm mb-3">
        Thêm tối đa 5 thẻ để mô tả câu hỏi của bạn. Phân tách các thẻ bằng dấu
        cách.
      </p>
      <div>
        <TextInput
          id="tags"
          type="text"
          value={searchTag}
          onChange={handleSearchTag}
          placeholder="Tìm kiếm thẻ..."
          onFocus={() => selectedTags.length < 5 && setIsSuggestOpen(true)}
          onBlur={() => setTimeout(() => setIsSuggestOpen(false), 200)}
        />
        {selectedTags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {selectedTags.map((tag) => (
              <span
                key={tag.id}
                className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm hover:bg-gray-300 transition-colors duration-200"
              >
                {tag.tagname}
                <button
                  onClick={() => handleRemoveTag(tag.id)}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  &#x2715;
                </button>
              </span>
            ))}
            {selectedTags.length >= 5 && (
              <span className="text-gray-500 text-sm">Đã chọn đủ 5 thẻ</span>
            )}
          </div>
        )}
        {isSuggestOpen && (
          <div className="absolute bg-white shadow-md p-4 w-1/3 mt-2">
            {availableTags
              .filter((tag) =>
                tag.tagname.toLowerCase().includes(searchTag.toLowerCase())
              )
              .slice(0, 10)
              .map((tag) => (
                <div
                  key={tag.id}
                  className="flex justify-between items-center px-3 py-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleSelectTag(tag)}
                >
                  <span>{tag.tagname}</span>
                  <span className="text-gray-500 text-sm">+ Thêm</span>
                </div>
              ))}
            <Button
              onClick={() => setIsModalOpen(true)}
              className="px-2 py-1 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 mt-2"
              type="button"
            >
              Thêm thẻ mới
            </Button>
          </div>
        )}
        <Modal
          show={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          size="md"
        >
          <ModalHeader onClose={() => setIsModalOpen(false)}>
            <h3 className="text-lg font-medium">Thêm thẻ mới</h3>
          </ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <TextInput
                id="new-tag-name"
                type="text"
                value={newTagName}
                onChange={(e) => setNewTagName(e.target.value)}
                placeholder="Tên thẻ..."
                helperText="Tên thẻ phải duy nhất"
              />
              <TextInput
                id="new-tag-description"
                type="text"
                value={newTagDescription}
                onChange={(e) => setNewTagDescription(e.target.value)}
                placeholder="Miêu tả thẻ..."
                helperText="Miêu tả thẻ sẽ giúp người dùng hiểu rõ hơn về thẻ"
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              className="bg-red-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
              onClick={() => setIsModalOpen(false)}
            >
              Hủy
            </Button>
            <Button
              className="bg-blue-500 text-white  font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
              onClick={handleAddNewTag}
            >
              Thêm thẻ mới
            </Button>
          </ModalFooter>
        </Modal>
      </div>
      {/* <TagInput selectedTags={selectedTags} setSelectedTags={setSelectedTags} /> */}
      {error && renderError(error)}
    </motion.div>
  );
};

export default TagInput;
