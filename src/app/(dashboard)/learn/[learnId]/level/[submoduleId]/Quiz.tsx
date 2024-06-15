"use client";

import { useState, useEffect, Suspense } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import toast from "react-hot-toast";
import { GrClose } from "react-icons/gr";
import ConfettiExplosion from 'react-confetti-explosion';

const LiveCam = dynamic(() => import("./LiveCam"), { ssr: false });

const Quiz = ({
  questions,
  currentUser,
  params,
}: {
  questions: any[];
  currentUser: any;
  params?: { submoduleId: string };
}) => {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(questions[index]);
  const [score, setScore] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [lockCount, setLockCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(30);
  const [totalTime, setTotalTime] = useState(0);
  const [hearts, setHearts] = useState(currentUser?.hearts);
  const [diamonds, setDiamonds] = useState(currentUser?.diamonds);
  const [showConfetti, setShowConfetti] = useState(false);

  const playWrongAudio = () => {
    const audio = new Audio("/wronganswer.mp3");
    audio.play().catch((error) => {
      console.error("Error playing audio:", error);
    });
  };
  const playCorrectAudio = () => {
    const audio = new Audio("/rightanswer.mp3");
    audio.play().catch((error) => {
      console.error("Error playing audio:", error);
    });
  };

  useEffect(() => {
    if (lockCount === 0) {
      return;
    }
    handleOptionClick(lockCount - 1);
    setTimeout(() => {
      handleNextQuestion();
    }, 2000);

    return () => {
      setLockCount(0);
    };
  }, [lockCount]);

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
    if (hearts === 0) {
      setShowSummary(true);
      return;
    }

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
        playCorrectAudio()
        setScore(score + 1);
        setDiamonds(diamonds + 5);
      } else {
        playWrongAudio()
        setHearts(hearts - 1);
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

  const handleSubmit = async () => {
    try {
      const response = await axios.post("/api/quiz/updateHeartsDiamonds", {
        hearts,
        diamonds,
      });
      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false);
      }, 5000);
      const response2 = await axios.post("/api/quiz/updateScore", {
        submoduleId: params?.submoduleId,
        score: score * 10,
      });
      toast.success("Quiz submitted successfully");
      toast((t) => (
        <span className="flex items-center">
          ❤️ : <b>{hearts}</b> &nbsp; 💎 : <b>{diamonds}</b>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <button
            onClick={() => toast.dismiss(t.id)}
            style={{ marginLeft: "10px" }}
            className="flex items-center justify-center border-l-2 border-gray-500 ps-2 w-6 h-8"
          >
            <GrClose className="font-bold" />
          </button>
        </span>
      ));
    } catch (e: any) {
      toast.error("Error submitting quiz");
      console.log(e);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center gap-20">
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
              {hearts !== 0 ? (
                <button
                  className="bg-red-500 text-white hover:bg-red-600 font-bold py-3 px-6 rounded-lg shadow-md transition-colors duration-300 ease-in-out transform hover:scale-105"
                  onClick={handleTryAgain}
                  disabled={hearts === 0}
                >
                  Try Again
                </button>
              ) : (
                <button
                  className="bg-red-500 text-white hover:bg-red-600 font-bold py-3 px-6 rounded-lg shadow-md transition-colors duration-300 ease-in-out transform hover:scale-105"
                  onClick={() => router.push("/shop")}
                >
                  Buy Hearts
                </button>
              )}
              <button
                className="bg-green-500 text-white hover:bg-green-600 font-bold py-3 px-6 rounded-lg shadow-md transition-colors duration-300 ease-in-out transform hover:scale-105"
                onClick={handleSubmit}
              >
                Submit
              </button>
              {showConfetti && (
                  <ConfettiExplosion
                    particleCount={250}
                    duration={3000}
                    width={1500}
                    force={0.8}
                  />
                )}
            </div>
          </div>
        )}
      </div>
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <LiveCam
            lockCount={lockCount}
            setLockCount={setLockCount}
            loading={loading}
            setLoading={setLoading}
          />
        </Suspense>
      </div>
    </div>
  );
};

export default Quiz;
