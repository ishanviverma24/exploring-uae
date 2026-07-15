import { Link } from 'react-router-dom'
import { Globe, Landmark, Users, Target } from 'lucide-react'

const Home = () => {
  const categories = [
    { id: 'geography', name: 'Geography', icon: Globe, color: 'bg-blue-500' },
    { id: 'history', name: 'History', icon: Landmark, color: 'bg-amber-600' },
    { id: 'culture', name: 'Culture & Traditions', icon: Users, color: 'bg-pink-500' },
    { id: 'general', name: 'General Knowledge', icon: Target, color: 'bg-purple-500' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 flex items-center justify-center p-4">
      <div className="text-center fade-in">
        <div className="mb-12">
          <div className="uae-flag-gradient h-2 w-48 mx-auto mb-6 rounded-full"></div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">Exploring UAE</h1>
          <p className="text-xl text-gray-200 mb-2">Discover the Magic of the Emirates</p>
          <p className="text-gray-400">Test your knowledge about UAE's rich culture, history, and geography</p>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-12 max-w-2xl mx-auto">
          <div className="glass-effect rounded-lg p-6">
            <div className="text-3xl font-bold text-white">50+</div>
            <p className="text-gray-300 text-sm">Questions</p>
          </div>
          <div className="glass-effect rounded-lg p-6">
            <div className="text-3xl font-bold text-white">4</div>
            <p className="text-gray-300 text-sm">Categories</p>
          </div>
          <div className="glass-effect rounded-lg p-6">
            <div className="text-3xl font-bold text-white">∞</div>
            <p className="text-gray-300 text-sm">Fun Factor</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12 max-w-2xl mx-auto">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <Link
                key={category.id}
                to={`/quiz/${category.id}`}
                className={`${category.color} rounded-lg p-8 text-white font-bold text-lg hover:scale-105 transform transition-all duration-300 shadow-lg flex flex-col items-center gap-3 group`}
              >
                <Icon size={40} className="group-hover:rotate-12 transition-transform" />
                {category.name}
              </Link>
            )
          })}
        </div>

        <Link
          to="/leaderboard"
          className="inline-block bg-white text-purple-900 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors mb-4"
        >
          🏆 View Leaderboard
        </Link>
      </div>
    </div>
  )
}

export default Home
