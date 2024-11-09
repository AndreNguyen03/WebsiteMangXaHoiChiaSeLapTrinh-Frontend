import React from "react";
import "./AskQuestion.css";

const AskQuestion = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 gap-6 flex flex-col">
      <h1 className="font-bold text-2xl">Ask a public question</h1>
      <div className="askquestion-input-container">
        <label className="askquestion-input-tittle" htmlFor="title">
          Title
        </label>
        <span className="askquestion-input-explain-tittle">
          Be specific and imagine you’re asking a question to another person.
        </span>
        <input
          className="focus:outline-orange-200 focus:outline-none focus:border-slate-400 mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
          id="title"
          type="text"
          placeholder="eg. Is there a R function for finding the index of an element in a vector?"
        />
      </div>
      <div className="askquestion-input-container">
        <label className="askquestion-input-tittle" htmlFor="details">
          What are the details of your problem?
        </label>
        <span className="askquestion-input-explain-tittle">
          Introduce the problem and expand on what you put in the title. Minimum
          20 characters.
        </span>
        <textarea
          className="focus:outline-orange-200 focus:outline-none focus:border-slate-400 mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
          id="details"
          placeholder=""
        ></textarea>
      </div>
      <div className="askquestion-input-container">
        <label className="askquestion-input-tittle" htmlFor="expectations">
          What did you try and what were you expecting?
        </label>
        <span className="askquestion-input-explain-tittle">
          Describe what you tried, what you expected to happen, and what
          actually resulted. Minimum 20 characters.
        </span>
        <textarea
          className="focus:outline-orange-200 focus:outline-none focus:border-slate-400 mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
          id="expectations"
          placeholder=""
        ></textarea>
      </div>
      <div className="askquestion-input-container">
        <label className="askquestion-input-tittle" htmlFor="tags">
          Tags
        </label>
        <span className="askquestion-input-explain-tittle">
          Add up to 5 tags to describe what your question is about. Separate
          tags with spaces.
        </span>
        <input
          className="focus:outline-orange-200 focus:outline-none focus:border-slate-400 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="tags"
          type="text"
          placeholder="e.g React JavaScript TailWindCSS"
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
        >
          Post Your Question
        </button>
      </div>
    </div>
  );
};

export default AskQuestion;
