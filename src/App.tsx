import { useState } from 'react'

// 퀴즈 데이터
const quizData = [
  {
    question: "대한민국의 수도는?",
    options: ["부산", "서울", "대구", "인천"],
    correct: 1
  },
  {
    question: "지구에서 가장 큰 대양은?",
    options: ["대서양", "인도양", "태평양", "북극해"],
    correct: 2
  },
  {
    question: "1년은 몇 개월인가?",
    options: ["10개월", "11개월", "12개월", "13개월"],
    correct: 2
  },
  {
    question: "무지개는 몇 가지 색깔인가?",
    options: ["5가지", "6가지", "7가지", "8가지"],
    correct: 2
  },
  {
    question: "태양계에서 가장 큰 행성은?",
    options: ["화성", "토성", "목성", "천왕성"],
    correct: 2
  }
]

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)

  const handleAnswerClick = (index: number) => {
    if (isAnswered) return

    setSelectedAnswer(index)
    setIsAnswered(true)

    if (index === quizData[currentQuestion].correct) {
      setScore(score + 1)
    }

    setTimeout(() => {
      if (currentQuestion + 1 < quizData.length) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(null)
        setIsAnswered(false)
      } else {
        setShowResult(true)
      }
    }, 1000)
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setScore(0)
    setShowResult(false)
    setSelectedAnswer(null)
    setIsAnswered(false)
  }

  const getButtonStyle = (index: number) => {
    if (!isAnswered) {
      return "bg-white border-2 border-gray-200 hover:border-blue-400 hover:bg-blue-50"
    }

    if (index === quizData[currentQuestion].correct) {
      return "bg-green-500 border-green-600 text-white"
    }

    if (index === selectedAnswer && index !== quizData[currentQuestion].correct) {
      return "bg-red-500 border-red-600 text-white"
    }

    return "bg-gray-100 border-gray-200"
  }

  if (showResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="mb-6">
            <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mx-auto flex items-center justify-center mb-4">
              <span className="text-4xl">🎉</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">게임 완료!</h2>
            <p className="text-gray-600">수고하셨습니다</p>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-6">
            <p className="text-gray-600 mb-2">최종 점수</p>
            <p className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {score} / {quizData.length}
            </p>
            <p className="text-gray-600 mt-2">
              정답률: {Math.round((score / quizData.length) * 100)}%
            </p>
          </div>

          <button
            onClick={resetQuiz}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-4 px-6 rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all transform hover:scale-105 shadow-lg"
          >
            다시 시작하기
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-6 max-w-md w-full">
        {/* 헤더 */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-semibold text-gray-500">
              문제 {currentQuestion + 1} / {quizData.length}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-gray-500">점수:</span>
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                {score}
              </span>
            </div>
          </div>

          {/* 진행 바 */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${((currentQuestion + 1) / quizData.length) * 100}%` }}
            />
          </div>
        </div>

        {/* 질문 */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-gray-800 text-center leading-relaxed">
              {quizData[currentQuestion].question}
            </h2>
          </div>
        </div>

        {/* 답안 */}
        <div className="space-y-3">
          {quizData[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerClick(index)}
              disabled={isAnswered}
              className={`w-full p-4 rounded-xl font-semibold text-left transition-all transform hover:scale-102 ${getButtonStyle(index)} ${
                isAnswered ? 'cursor-not-allowed' : 'cursor-pointer active:scale-98'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-sm">
                  {String.fromCharCode(65 + index)}
                </span>
                <span>{option}</span>
              </div>
            </button>
          ))}
        </div>

        {/* 힌트 */}
        {isAnswered && (
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-500">
              {selectedAnswer === quizData[currentQuestion].correct
                ? "🎉 정답입니다!"
                : "❌ 틀렸습니다!"}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
