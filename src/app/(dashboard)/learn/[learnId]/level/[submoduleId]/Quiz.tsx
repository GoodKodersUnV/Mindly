"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Quiz = ({ questions }: { questions: any[] }) => {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(questions[index]);
  const [score, setScore] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const [timer, setTimer] = useState(10000);
  const [totalTime, setTotalTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    if (timer === 0) {
      clearInterval(interval);
      handleNextQuestion();
    }
    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTotalTime((prevTimer) => prevTimer + 1);
    }, 1000);
  }, []);

  const [videoAllowed, setVideoAllowed] = useState(false);
  const handleVideoPermission = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ video: true });
      setVideoAllowed(true);
    } catch (error) {
      router.push("/");
      console.error("User denied access to video");
      setVideoAllowed(false);
    }
  };

  useEffect(() => {
    handleVideoPermission();
  }, []);

  const handleNextQuestion = () => {
    if (index < questions.length - 1) {
      setIndex(index + 1);
      setCurrentQuestion(questions[index + 1]);
      setSelectedOption(null);
      setTimer(10);
    } else {
      setShowSummary(true);
    }
  };

  const handleOptionClick = (i: number) => {
    if (selectedOption === null) {
      setSelectedOption(i);
      if (i === currentQuestion.answer - 1) {
        setScore(score + 1);
      }
    }
  };

  const handleTryAgain = () => {
    setIndex(0);
    setCurrentQuestion(questions[0]);
    setScore(0);
    setShowSummary(false);
    setSelectedOption(null);
    setTimer(10);
    setTotalTime(0);
  };

  return (
    <div className="h-screen flex items-center justify-center ">
      <div className="bg-white rounded-2xl shadow-2xl w-[600px] relative p-8">
        {!showSummary ? (
          <>
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-2 bg-yellow-200 rounded-full px-4 py-2 text-yellow-800 font-bold">
                <span className="animate-pulse">&#9733;</span>
                <p className="text-lg">Score: {score}</p>
              </div>
              <div className="flex items-center gap-2 bg-green-200 rounded-full px-4 py-2 text-green-800 font-bold">
                <span className="animate-bounce">&#8987;</span>
                <p className="text-lg">Time: {timer}s</p>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-center text-indigo-900 mb-8">
              {currentQuestion.question}
            </h1>
            <div className="grid grid-cols-2 gap-6">
              {currentQuestion.options.map((option: string, i: number) => (
                <button
                  key={i}
                  className={`${
                    selectedOption === i
                      ? i === currentQuestion.answer - 1
                        ? "bg-green-500 text-white hover:bg-green-600"
                        : "bg-red-500 text-white hover:bg-red-600"
                      : "bg-indigo-500 text-white hover:bg-indigo-600"
                  } text-lg font-bold py-4 px-6 rounded-lg shadow-md transition-colors duration-300 ease-in-out transform hover:scale-105`}
                  onClick={() => handleOptionClick(i)}
                  disabled={selectedOption !== null}
                >
                  {option}
                </button>
              ))}
            </div>
            <button
              className={`font-bold py-3 px-6 mt-8 rounded-lg bg-fuchsia-600 text-white hover:bg-fuchsia-700 shadow-md transition-colors duration-300 ease-in-out`}
              onClick={handleNextQuestion}
            >
              Next
            </button>
          </>
        ) : (
          <div className="text-center">
            <h1 className="text-4xl font-bold text-indigo-900 mb-6">
              Quiz Summary
            </h1>
            <p className="text-2xl text-indigo-900 mb-8">
              Your score is {score}/{questions.length}
            </p>
            <div className="flex justify-center gap-6">
              <button
                className="bg-red-500 text-white hover:bg-red-600 font-bold py-3 px-6 rounded-lg shadow-md transition-colors duration-300 ease-in-out transform hover:scale-105"
                onClick={handleTryAgain}
              >
                Try Again
              </button>
              <button
                className="bg-green-500 text-white hover:bg-green-600 font-bold py-3 px-6 rounded-lg shadow-md transition-colors duration-300 ease-in-out transform hover:scale-105"
                onClick={() => {}}
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
