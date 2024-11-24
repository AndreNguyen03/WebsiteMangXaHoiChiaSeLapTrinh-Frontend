import React from "react";
import { useState, useEffect } from "react";
import SearchBar from "../../SearchBar/SearchBar";

const users = [
  {
    name: "Neil Sims",
    email: "neil.sims@flowbite.com",
    position: "Front-end developer",
    country: "United States",
    status: "Active",
    img: "https://placehold.co/40x40",
  },
  {
    name: "Roberta Casas",
    email: "roberta.casas@flowbite.com",
    position: "Designer",
    country: "Spain",
    status: "Active",
    img: "https://placehold.co/40x40",
  },
  {
    name: "Michael Gough",
    email: "michael.gough@flowbite.com",
    position: "React developer",
    country: "United Kingdom",
    status: "Active",
    img: "https://placehold.co/40x40",
  },
  {
    name: "Jese Leos",
    email: "jese.leos@flowbite.com",
    position: "Marketing",
    country: "United States",
    status: "Active",
    img: "https://placehold.co/40x40",
  },
  {
    name: "Bonnie Green",
    email: "bonnie.green@flowbite.com",
    position: "UI/UX Engineer",
    country: "Australia",
    status: "Offline",
    img: "https://placehold.co/40x40",
  },
  {
    name: "Thomas Lean",
    email: "thomas.lean@flowbite.com",
    position: "Vue developer",
    country: "Germany",
    status: "Active",
    img: "https://placehold.co/40x40",
  },
  {
    name: "Helene Engels",
    email: "helene.engels@flowbite.com",
    position: "Product owner",
    country: "Canada",
    status: "Active",
    img: "https://placehold.co/40x40",
  },
  {
    name: "Lana Byrd",
    email: "lana.byrd@flowbite.com",
    position: "Designer",
    country: "United States",
    status: "Active",
    img: "https://placehold.co/40x40",
  },
  {
    name: "Leslie Livingston",
    email: "leslie.livingston@flowbite.com",
    position: "Web developer",
    country: "France",
    status: "Offline",
    img: "https://placehold.co/40x40",
  },
];

const UserManageMainBar = () => {
  const [showActions, setShowActions] = useState(false);
  const [search, setSearch] = useState("");
  return (
    <div className="p-0">
      <div className="pt-6 pl-4">
        <h1 className="text-2xl font-bold mb-4">All users</h1>
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1">
            <SearchBar
              value={search}
              onChange={setSearch}
              placeholder="Filter by tag name"
            />
          </div>
          <div className="flex justify-center">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center">
              <i className="fas fa-plus mr-2"></i> Add user
            </button>
            <button className="bg-gray-700 text-white px-4 py-2 rounded-md flex items-center">
              <i className="fas fa-file-export mr-2"></i> Export
            </button>
            <button
              className="bg-gray-700 text-white px-4 py-2 rounded-md flex items-center"
              onClick={() => setShowActions(!showActions)}
            >
              <i className="fas fa-cog mr-2"></i> Manage Actions
            </button>
          </div>
        </div>
      </div>

      <table className="w-full text-left">
        <thead className="bg-gray-800 text-gray-400">
          <tr>
            <th className="p-2">NAME</th>
            <th className="p-2">POSITION</th>
            <th className="p-2">COUNTRY</th>
            <th className="p-2">STATUS</th>
            <th className="p-2">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index} className="border-b border-gray-700">
              <td className="p-2 flex items-center">
                <img
                  src={user.img}
                  alt={`Profile of ${user.name}`}
                  className="w-10 h-10 rounded-full mr-2"
                />
                <div>
                  <div className="font-bold">{user.name}</div>
                  <div className="text-gray-400">{user.email}</div>
                </div>
              </td>
              <td className="p-2">{user.position}</td>
              <td className="p-2">{user.country}</td>
              <td className="p-2 flex items-center">
                <span
                  className={`h-2 w-2 rounded-full mr-2 ${
                    user.status === "Active" ? "bg-green-500" : "bg-red-500"
                  }`}
                ></span>
                {user.status}
              </td>
              <td className="p-2 flex space-x-2">
                {showActions && (
                  <>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center">
                      <i className="fas fa-edit mr-2"></i> Edit
                    </button>
                    <button className="bg-red-600 text-white px-4 py-2 rounded-md flex items-center">
                      <i className="fas fa-trash mr-2"></i> Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManageMainBar;
