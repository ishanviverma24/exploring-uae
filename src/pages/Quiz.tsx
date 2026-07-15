import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { quizData } from '../data/quizData'
import { ChevronRight, Clock, AlertCircle } from 'lucide-react'

const Quiz = () => {
  const { category } = useParams<{ category: string }>()
  const navigate = useNavigate()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [timeLeft, setTimeLeft] = useState(30)
  const [answered, setAnswered] = useState(false)

  const questions = quizData[category as keyof typeof quizData] || []
  const question = questions[currentQuestion]

  useEffect(() => {
    if (timeLeft === 0 && !answered) {
      handleAnswer(-1)
    }
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(timer)
  }, [timeLeft, answered])

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index)
    setAnswered(true)
    setShowFeedback(true)
    if (index === question.correctAnswer) {
      setScore(score + 1)
    }
  }

  const handleNext = () => {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowFeedback(false)
      setTimeLeft(30)
      setAnswered(false)
    } else {
      navigate('/results', { state: { score, total: questions.length, category } })
    }
  }

  if (!question) {
    return <div className="flex items-center justify-center min-h-screen text-white">Quiz not found</div>
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 p-4 flex items-center justify-center">
      <div className="w-full max-w-2xl">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-white text-sm font-bold">Question {currentQuestion + 1}/{questions.length}</span>
            <div className="flex items-center gap-2 text-white bg-white/20 px-4 py-2 rounded-full">
              <Clock size={16} />
              <span className={timeLeft < 10 ? 'text-red-400 font-bold' : ''}>{timeLeft}s</span>
            </div>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
            <div className="bg-green-500 h-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
          </div>
        </div>

        <div className="glass-effect rounded-lg p-8 mb-8 fade-in">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">{question.question}</h2>

          <div className="space-y-4">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => !answered && handleAnswer(index)}
                disabled={answered}
                className={`w-full p-4 rounded-lg text-left font-semibold transition-all duration-300 flex items-center justify-between ${
                  selectedAnswer === index
                    ? index === question.correctAnswer
                      ? 'bg-green-500 text-white'
                      : 'bg-red-500 text-white'
                    : answered && index === question.correctAnswer
                    ? 'bg-green-500 text-white'
                    : 'bg-white/20 text-white hover:bg-white/30'
                } ${answered ? 'cursor-default' : 'cursor-pointer'}`}
              >
                <span>{option}</span>
                {answered && index === question.correctAnswer && <span>✓</span>}
              </button>
            ))}
          </div>
        </div>

        {showFeedback && (
          <div className={`rounded-lg p-4 mb-8 flex gap-3 fade-in ${
            selectedAnswer === question.correctAnswer
              ? 'bg-green-500/20 border border-green-500 text-green-200'
              : 'bg-red-500/20 border border-red-500 text-red-200'
          }`}
          >
            <AlertCircle size={20} />
            <p>{selectedAnswer === question.correctAnswer ? '✓ Correct!' : `✗ Incorrect. The correct answer is: ${question.options[question.correctAnswer]}`}</p>
          </div>
        )}

        {showFeedback && question.explanation && (
          <div className="bg-blue-500/20 border border-blue-500 rounded-lg p-4 mb-8 text-blue-200 fade-in">
            <p className="font-semibold mb-2">📚 Did you know?</p>
            <p>{question.explanation}</p>
          </div>
        )}

        {showFeedback && (
          <button
            onClick={handleNext}
            className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold py-4 rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2 fade-in"
          >
            {currentQuestion + 1 === questions.length ? 'See Results' : 'Next Question'}
            <ChevronRight size={20} />
          </button>
        )}
      </div>
    </div>
  )
}

export default Quiz
