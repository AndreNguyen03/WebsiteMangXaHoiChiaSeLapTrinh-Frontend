import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && searchTerm.trim() !== "") {
      navigate(`/questions/keyword/${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <input
      type="text"
      className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-10 pr-3 py-2 focus:outline-orange-200 focus:border-slate-400 hover:border-slate-300 shadow-sm"
      placeholder="Tìm kiếm..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      onKeyDown={handleKeyDown}
    />
  );
};

export default SearchInput;
