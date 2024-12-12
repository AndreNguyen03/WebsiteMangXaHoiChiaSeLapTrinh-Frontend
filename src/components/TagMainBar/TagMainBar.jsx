import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

import SearchBar from "../SearchBar/SearchBar";
import SortingGroupBar from "../SortingGroupBar/SortingGroupBar";
import Tag from "./Tag";

const sortingOptions = ["Phổ biến", "Tên"];

const TagMainBar = () => {
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState("Phổ biến");
  const [tags, setTags] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5114/api/Tags")
      .then((response) => {
        console.log(response.data);
        setTags(response.data);
      })
      .catch((error) => {
        console.error("Đã xảy ra lỗi khi tải thẻ!", error);
      });
  }, []);

  const filteredTags = tags
    .filter((tag) => tag.tagname.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sorting === "Phổ biến") return b.posttags.length - a.posttags.length;
      if (sorting === "Tên") return a.tagname.localeCompare(b.tagname);
      return Math.random() - 0.5;
    });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-white"
    >
      <div className="container">
        <div className="max-w-4xl pt-2">
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-xl font-bold mb-2"
          >
            Thẻ
          </motion.h1>
          <motion.p
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 mb-8"
          >
            Thẻ là từ khóa hoặc nhãn phân loại câu hỏi của bạn với những câu hỏi
            tương tự. Sử dụng các thẻ đúng giúp người khác dễ dàng tìm và trả
            lời câu hỏi của bạn.
          </motion.p>
          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 mb-8"
          >
            <div className="flex-1">
              <SearchBar
                value={search}
                onChange={setSearch}
                placeholder="Lọc theo tên thẻ"
              />
            </div>
            <div className="flex justify-center">
              <SortingGroupBar
                sortingOptions={sortingOptions}
                active={sorting}
                onChange={setSorting}
              />
            </div>
          </motion.div>
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {filteredTags.map((tag) => (
              <Tag key={tag.id} tag={tag} />
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default TagMainBar;
