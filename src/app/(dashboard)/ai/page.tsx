"use client";

import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Page = () => {
  const [topic, setTopic] = useState<string>("");
  const [nQuestions, setNQuestions] = useState<number>(1);
  const [difficulty, setDifficulty] = useState<string>("easy");
  const [response, setResponse] = useState([]);
  const [text, setText] = useState<string>("Generate");
  const [loading, setLoading] = useState<boolean>(false);

  const handleGenerate = async () => {
    try {
      setLoading(true);
      setText("Generating...");
      
      const response = await axios.post("/api/gemini-api", {
        topic,
        nQuestions,
        difficulty,
      });

      console.log(response.data);
      const res = await response.data;
      const validate = res.payload.replace(/^```jsonn?/, "").replace(/```$/, "");
      const msg = JSON.parse(validate);
      setResponse(msg);
      setLoading(false);
      setText("Generate");
      toast.success("Questions generated successfully");
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
      setText("Generate");
      toast.error("Error generating questions");
    }
  };

  return (
    <div className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg shadow-lg p-8 w-full  mx-auto">
      <div className="mb-4">
        <label className="block text-white font-bold mb-2" htmlFor="topic">
          Topic
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition-all duration-300 ease-in-out"
          id="topic"
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter topic"
        />
      </div>
      <div className="mb-4">
        <label className="block text-white font-bold mb-2" htmlFor="nQuestions">
          Number of questions
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition-all duration-300 ease-in-out"
          id="nQuestions"
          type="number"
          value={nQuestions}
          onChange={(e) => setNQuestions(parseInt(e.target.value))}
          placeholder="Enter number of questions"
        />
      </div>
      <div className="mb-6">
        <label className="block text-white font-bold mb-2" htmlFor="difficulty">
          Difficulty
        </label>
        <select
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition-all duration-300 ease-in-out"
          id="difficulty"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
      <button
        className="bg-white hover:bg-gray-200 text-purple-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-all duration-300 ease-in-out"
        type="button"
        disabled={loading}  
        onClick={handleGenerate}
      >
        {text}
      </button>
      <div>
        <h3 className="text-white font-bold text-xl mt-4">Response</h3>
        <pre className="text-white">{JSON.stringify(response, null, 2)}</pre>
      </div>
    </div>
  );
};

export default Page;
