import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BarChart3, Clock, TrendingUp } from 'lucide-react';

export const metadata = {
  title: 'Results Dashboard - NakedTruth',
  description: 'Real-time analytics and forecasting results for Nigeria\'s 2027 presidential elections',
};

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header currentPage="/dashboard" />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <BarChart3 className="h-16 w-16 text-green-600 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Results Dashboard
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Real-time analytics, regional breakdowns, and forecasting data 
            for Nigeria's 2027 presidential elections.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 text-center mb-8">
          <Clock className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Dashboard Under Development</h2>
          <p className="text-gray-600 mb-6">
            Interactive visualizations and real-time data coming soon:
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <TrendingUp className="h-8 w-8 text-blue-600 mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Candidate Preferences</h3>
            <p className="text-sm text-gray-600">Real-time pie charts and bar graphs showing voter preferences</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <BarChart3 className="h-8 w-8 text-green-600 mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Regional Analysis</h3>
            <p className="text-sm text-gray-600">Breakdown by Nigerian states and geopolitical zones</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <TrendingUp className="h-8 w-8 text-purple-600 mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Historical Trends</h3>
            <p className="text-sm text-gray-600">Comparison with 2023 election results and trends</p>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-yellow-800 mb-3">Sample Size Notice</h3>
          <p className="text-yellow-700 text-sm">
            Results will be displayed once we reach a minimum sample size of 100 responses. 
            Current sample size: 0 responses.
          </p>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 