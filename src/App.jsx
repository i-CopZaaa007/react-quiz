import React, { useState } from "react";
import questions from "./question";

function App() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");

  const handleAnswer = (choiceIndex) => {
    setAnswers([...answers, choiceIndex]);

    if (choiceIndex === 0) {
      setScore(score + 1);
    }

    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      setCurrent(-1);
    }
  };

  const getBallColor = () => {
    if (score < 1) return "bg-[#5F5F5F]";
    if (score < 2) return "bg-[#FFB6C1]";
    if (score < 3) return "bg-[#FFDAB9]";
    if (score < 4) return "bg-[#FFFACD]";
    if (score < 5) return "bg-[#A2C08A]";
    if (score < 6) return "bg-[#C1E1C1]";
    return "bg-[#F8F8F8]";
  };
  const getBallBorderColor = () => {
    if (score < 1) return "border-[#A0A0A0]";
    if (score < 2) return "border-[#CC99A9]";
    if (score < 3) return "border-[#E0C0A9]";
    if (score < 4) return "border-[#E6DDBC]";
    if (score < 5) return "border-[#7E9F6E]";
    if (score < 6) return "border-[#9CD09C]";
    return "border-[#DCDCDC]";
  };

  if (current === 6) {
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);
    const heightM = heightNum / 100;
    const bmi = weightNum / heightM ** 2;
    const bmiRounded = bmi.toFixed(2);

    const getBMI = () => {
      if (bmiRounded <= 18.5) return "ต่ำกว่าเกณฑ์";
      if (bmiRounded <= 22.9) return "ปกติสมส่วน";
      if (bmiRounded <= 24.9) return "น้ำหนักเกิน";
      if (bmiRounded <= 29.9) return "อ้วนระดับ 1";
      return "อ้วนระดับ 2";
    };

    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#E0F2F7] to-[#C8E6F0] text-center p-4">
        <div className="relative flex items-center justify-center mb-6">
        <div 
          className={`w-36 h-36 rounded-full border-4 shadow-lg mb-6 ${getBallColor()} border-solid ${getBallBorderColor()} animate-bouncePingpong z-20`}
        >
          {/* Face */}
        </div>
        <div className="absolute top-[85%] w-20 h-6 bg-black rounded-full blur-md opacity-20 animate-shadowSquash z-10" />
        </div>
        <h1 className="text-3xl font-bold mb-4">Finish!</h1>
        <p className="text-xl mb-4">
          Score :{" "}
          <span className="font-semibold">
            {score} / {questions.length}
          </span>
        </p>
        <p>
          BMI : <span>{getBMI()}</span>
        </p>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4"
          onClick={() => {
            setCurrent(0);
            setAnswers([]);
            setScore(0);
          }}
        >
          Answer again!
        </button>
      </div>
    );
  }

  const q = questions[current];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#E0F2F7] to-[#C8E6F0] p-4">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">
          ข้อ {current + 1} / {questions.length} :
        </h2>
        <p className="text-lg mb-6">{q.question}</p>
        <div className="space-y-4">
          {current === 5 ? (
            <>
              <input
                type="number"
                placeholder="ส่วนสูง (cm)"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="w-full border border-gray-300 rounded px-4 py-2"
              />
              <input
                type="number"
                placeholder="น้ำหนัก (kg)"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full border border-gray-300 rounded px-4 py-2"
              />
              <button
                onClick={() => {
                  if (!weight || !height) {
                    alert("ใส่น้ำหนักและส่วนสูงก่อน");
                    return;
                  }

                  const weightNum = parseFloat(weight);
                  const heightNum = parseFloat(height);
                  const heightM = heightNum / 100;
                  const bmi = weightNum / heightM ** 2;
                  const bmiRounded = bmi.toFixed(2);

                  if (bmiRounded <= 22.9) {
                    setScore(score + 1);
                  }

                  setAnswers([...answers, { weight, height }]);
                  setCurrent(current + 1);
                }}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
              >
                ยืนยัน
              </button>
            </>
          ) : (
            q.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg text-lg"
              >
                {opt}
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
