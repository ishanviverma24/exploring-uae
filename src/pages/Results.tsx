import { useLocation, Link } from 'react-router-dom'
import { Share2, Trophy, Target } from 'lucide-react'
import { useState } from 'react'

const Results = () => {
  const location = useLocation()
  const state = location.state as { score: number; total: number; category: string } || { score: 0, total: 10, category: 'general' }
  const [copied, setCopied] = useState(false)

  const percentage = (state.score / state.total) * 100
  const getLevel = (percent: number) => {
    if (percent === 100) return { name: 'UAE Expert', emoji: '👑', color: 'text-yellow-400' }
    if (percent >= 80) return { name: 'UAE Master', emoji: '⭐', color: 'text-blue-400' }
    if (percent >= 60) return { name: 'UAE Enthusiast', emoji: '🌟', color: 'text-purple-400' }
    if (percent >= 40) return { name: 'UAE Explorer', emoji: '🔍', color: 'text-green-400' }
    return { name: 'Keep Exploring', emoji: '📚', color: 'text-orange-400' }
  }

  const level = getLevel(percentage)

  const shareText = `I scored ${state.score}/${state.total} (${Math.round(percentage)}%) on the Exploring UAE Quiz! ${level.emoji} Can you beat my score?`

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(shareText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 p-4 flex items-center justify-center">
      <div className="w-full max-w-2xl text-center fade-in">
        <div className="mb-12">
          <div className="relative w-48 h-48 mx-auto mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
              <div className="bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 rounded-full w-44 h-44 flex flex-col items-center justify-center">
                <span className="text-6xl font-bold text-white">{state.score}</span>
                <span className="text-2xl text-gray-300">/ {state.total}</span>
              </div>
            </div>
          </div>
          <h1 className={`text-4xl font-bold mb-2 ${level.color}`}>{level.emoji} {level.name}</h1>
          <p className="text-3xl font-bold text-white mb-4">{Math.round(percentage)}%</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-12">
          <div className="glass-effect rounded-lg p-6">
            <Trophy className="mx-auto mb-2 text-yellow-400" size={32} />
            <div className="text-2xl font-bold text-white">{state.score}</div>
            <p className="text-gray-300 text-sm">Correct Answers</p>
          </div>
          <div className="glass-effect rounded-lg p-6">
            <Target className="mx-auto mb-2 text-red-400" size={32} />
            <div className="text-2xl font-bold text-white">{state.total - state.score}</div>
            <p className="text-gray-300 text-sm">Incorrect Answers</p>
          </div>
        </div>

        <div className="bg-white/10 border border-white/20 rounded-lg p-6 mb-12">
          {percentage === 100 && <p className="text-white text-lg">🎉 Perfect Score! You are a true UAE expert!</p>}
          {percentage >= 80 && percentage < 100 && <p className="text-white text-lg">🌟 Excellent! You know the UAE very well!</p>}
          {percentage >= 60 && percentage < 80 && <p className="text-white text-lg">👍 Great job! Keep learning more about the UAE!</p>}
          {percentage >= 40 && percentage < 60 && <p className="text-white text-lg">💪 Good effort! Try other categories to improve!</p>}
          {percentage < 40 && <p className="text-white text-lg">📚 Keep exploring! Every question teaches you something new!</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <button
            onClick={handleShare}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Share2 size={20} />
            {copied ? 'Copied!' : 'Share Score'}
          </button>
          <Link
            to="/leaderboard"
            className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Trophy size={20} />
            Leaderboard
          </Link>
          <Link
            to="/"
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <span>🔄</span>
            Try Again
          </Link>
        </div>

        <Link to="/" className="text-gray-300 hover:text-white transition-colors">
          ← Back to Categories
        </Link>
      </div>
    </div>
  )
}

export default Results
