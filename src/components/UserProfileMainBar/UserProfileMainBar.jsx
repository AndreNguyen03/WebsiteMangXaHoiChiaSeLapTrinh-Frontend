import React from "react";
import { Avatar } from "flowbite-react";
import TagBox from "./TagBox";
import { Button } from "flowbite-react";
import PostBox from "./PostBox";

const UserProfileMainBar = () => {
  const user = {
    name: "John Doe",
    username: "@johndoe",
    avatarUrl: "https://i.pravatar.cc/300",
    joinDate: "January 15, 2022",
    questionsCount: 42,
    answersCount: 128,
    watchedTags: ["react", "javascript", "tailwindcss", "node.js", "next.js"],
  };

  const posts = [
    {
      id: 2673,
      type: "B",
      title: "How do I remove a submodule?",
      date: "Apr 23, 2013",
    },
    {
      id: 2527,
      type: "B",
      title: "How to get just one file from another branch",
      date: "Mar 2, 2010",
    },
    {
      id: 1971,
      type: "B",
      title: "How to remove old and unused Docker images",
      date: "Sep 22, 2015",
    },
    {
      id: 1848,
      type: "A",
      title: "Skip Git commit hooks",
      date: "Aug 29, 2011",
    },
    {
      id: 1777,
      type: "A",
      title: "GitHub relative link in Markdown file",
      date: "Oct 5, 2011",
    },
    {
      id: 1755,
      type: "A",
      title: "How to list branches that contain a given commit?",
      date: "Sep 14, 2009",
    },
    {
      id: 1719,
      type: "A",
      title: "Where is the global git config data stored?",
      date: "Jan 22, 2010",
    },
    {
      id: 1461,
      type: "A",
      title: "How to merge a specific commit in Git",
      date: "May 19, 2009",
    },
    {
      id: 1373,
      type: "A",
      title: "Eclipse/Java code completion not working",
      date: "May 26, 2009",
    },
    {
      id: 1365,
      type: "A",
      title: "Need to reset git branch to origin version",
      date: "Feb 15, 2012",
    },
    // New items added below
    {
      id: 3001,
      type: "A",
      title: "Understanding JavaScript Closures",
      date: "Oct 10, 2023",
    },
    {
      id: 3002,
      type: "B",
      title: "Introduction to React Hooks",
      date: "Oct 11, 2023",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div
        className="h-full w-full bg-blue-200 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 border border-gray-100
 p-4 flex flex-col md:flex-row justify-between "
      >
        <div className="flex flex-col md:flex-row items-center md:items-start">
          <Avatar size="xl" bordered img={user.avatarUrl} alt={user.name} />
          <div className="md:ml-8 mt-4 md:mt-0 text-center md:text-left">
            <h1 className="text-3xl font-bold">{user.name}</h1>
            <p className="text-gray-600 mt-1">{user.username}</p>
            <div className="flex gap-1 items-center justify-center md:justify-start mt-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                />
              </svg>

              <span className="text-sm text-gray-600">
                Joined {user.joinDate}
              </span>
            </div>
            <div className="flex items-center justify-center md:justify-start mt-2 space-x-6">
              <div className="flex gap-1 items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                  />
                </svg>

                <span className="text-sm text-gray-600">
                  {user.questionsCount} Questions
                </span>
              </div>
              <div className="flex gap-1 items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                  />
                </svg>

                <span className="text-sm text-gray-600">
                  {user.answersCount} Answers
                </span>
              </div>
            </div>
          </div>
        </div>
        <Button
          pill
          gradientMonochrome="cyan"
          className="mt-4 md:mt-0 p-2 text-white align-top h-10 items-center w-full md:w-auto"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
            />
          </svg>
          Edit Profile
        </Button>
      </div>
      <TagBox tags={user.watchedTags} />
      <PostBox posts={posts} />
    </div>
  );
};

export default UserProfileMainBar;
