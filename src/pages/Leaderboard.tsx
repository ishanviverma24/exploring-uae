import { Link } from 'react-router-dom'
import { Trophy, Medal } from 'lucide-react'
import { useState } from 'react'

const Leaderboard = () => {
  const [leaderboardData] = useState([
    { rank: 1, name: '🇦🇪 Ahmed Al Mansoori', score: 245, category: 'All Categories', badge: '👑' },
    { rank: 2, name: '🇦🇪 Fatima Al Noor', score: 234, category: 'All Categories', badge: '⭐' },
    { rank: 3, name: '🇦🇪 Mohammed Al Mazrouei', score: 218, category: 'All Categories', badge: '🥉' },
    { rank: 4, name: 'Sara Al Dhaheri', score: 205, category: 'All Categories', badge: '' },
    { rank: 5, name: 'Ali Al Mansouri', score: 198, category: 'All Categories', badge: '' },
    { rank: 6, name: 'Layla Al Khaleji', score: 187, category: 'All Categories', badge: '' },
    { rank: 7, name: 'Hassan Al Zaabi', score: 176, category: 'All Categories', badge: '' },
    { rank: 8, name: 'Noor Al Falasi', score: 165, category: 'All Categories', badge: '' },
    { rank: 9, name: 'Rashid Al Shami', score: 154, category: 'All Categories', badge: '' },
    { rank: 10, name: 'Amira Al Ketbi', score: 143, category: 'All Categories', badge: '' },
  ])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Trophy size={40} className="text-yellow-400" />
            <h1 className="text-4xl md:text-5xl font-bold text-white">Leaderboard</h1>
            <Trophy size={40} className="text-yellow-400" />
          </div>
          <p className="text-gray-300">Top UAE Quiz Champions</p>
        </div>

        <div className="glass-effect rounded-lg overflow-hidden mb-8 fade-in">
          <div className="overflow-x-auto">
            <table className="w-full text-white">
              <thead>
                <tr className="bg-gradient-to-r from-green-600 to-blue-600 border-b border-white/20">
                  <th className="px-6 py-4 text-left text-sm font-bold">Rank</th>
                  <th className="px-6 py-4 text-left text-sm font-bold">Player</th>
                  <th className="px-6 py-4 text-left text-sm font-bold">Score</th>
                  <th className="px-6 py-4 text-left text-sm font-bold">Category</th>
                </tr>
              </thead>
              <tbody>
                {leaderboardData.map((entry, index) => (
                  <tr
                    key={index}
                    className={`border-b border-white/10 transition-colors ${
                      entry.rank <= 3 ? 'bg-yellow-600/10 hover:bg-yellow-600/20' : 'hover:bg-white/5'
                    }`}
                  >
                    <td className="px-6 py-4 text-center font-bold">
                      {entry.rank === 1 ? (
                        <Medal size={24} className="text-yellow-400 mx-auto" />
                      ) : entry.rank === 2 ? (
                        <Medal size={24} className="text-gray-300 mx-auto" />
                      ) : entry.rank === 3 ? (
                        <Medal size={24} className="text-orange-600 mx-auto" />
                      ) : (
                        <span className="text-lg">{entry.rank}</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span>{entry.name}</span>
                        {entry.badge && <span className="text-lg">{entry.badge}</span>}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-bold text-lg text-green-400">{entry.score}</span>
                    </td>
                    <td className="px-6 py-4 text-gray-300">{entry.category}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="glass-effect rounded-lg p-6 text-center fade-in">
            <div className="text-4xl font-bold text-green-400 mb-2">1,250+</div>
            <p className="text-gray-300">Total Players</p>
          </div>
          <div className="glass-effect rounded-lg p-6 text-center fade-in">
            <div className="text-4xl font-bold text-blue-400 mb-2">50,000+</div>
            <p className="text-gray-300">Questions Answered</p>
          </div>
          <div className="glass-effect rounded-lg p-6 text-center fade-in">
            <div className="text-4xl font-bold text-purple-400 mb-2">100%</div>
            <p className="text-gray-300">Fun Guaranteed</p>
          </div>
        </div>

        <div className="text-center">
          <Link
            to="/"
            className="inline-block bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold py-4 px-8 rounded-lg hover:shadow-lg transition-all mb-4"
          >
            🚀 Start Quiz & Climb the Rankings
          </Link>
          <p className="text-gray-400 text-sm">← Back to Home</p>
        </div>
      </div>
    </div>
  )
}

export default Leaderboard
