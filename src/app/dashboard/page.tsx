'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { supabase } from '@/lib/supabase';
import { 
  BarChart3, 
  Users, 
  TrendingUp, 
  RefreshCw, 
  AlertCircle,
  Activity
} from 'lucide-react';
import {
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';

interface PollResults {
  presidential_candidates: Record<string, number>;
  key_issues: Record<string, number>;
  demographics: {
    age_groups: Record<string, number>;
    regions: Record<string, number>;
    genders: Record<string, number>;
  };
  total_responses: number;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFC658'];

export default function DashboardPage() {
  const [results, setResults] = useState<PollResults | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [isRealTimeConnected, setIsRealTimeConnected] = useState(false);

  // Fetch poll results
  const fetchResults = async () => {
    try {
      const response = await fetch('/api/results');
      const data = await response.json();
      
      if (data.success) {
        setResults(data.data);
        setLastUpdate(new Date());
        setError(null);
      } else {
        setError(data.error || 'Failed to fetch results');
      }
    } catch (err) {
      setError('Network error');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Set up real-time subscription
  useEffect(() => {
    fetchResults();

    // Subscribe to real-time changes
    const channel = supabase
      .channel('poll-updates')
      .on('postgres_changes', 
        { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'responses' 
        }, 
        (payload) => {
          console.log('New poll response:', payload);
          // Refetch results when new response is submitted
          fetchResults();
        }
      )
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          setIsRealTimeConnected(true);
          console.log('Real-time connection established');
        } else if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT') {
          setIsRealTimeConnected(false);
          console.error('Real-time connection failed');
        }
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Prepare chart data
  const getCandidateChartData = () => {
    if (!results?.presidential_candidates) return [];
    return Object.entries(results.presidential_candidates).map(([name, count]) => ({
      name: name.replace(/\s*\([^)]*\)\s*/g, '').trim(), // Remove party abbreviations for cleaner display
      fullName: name,
      value: count,
      percentage: ((count / results.total_responses) * 100).toFixed(1)
    }));
  };

  const getIssuesChartData = () => {
    if (!results?.key_issues) return [];
    return Object.entries(results.key_issues)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 6) // Top 6 issues
      .map(([name, count]) => ({
        name: name.replace('&', '&').replace(/Development|System|Reform/g, '').trim(),
        fullName: name,
        value: count,
        percentage: ((count / results.total_responses) * 100).toFixed(1)
      }));
  };

  const getDemographicChartData = (category: keyof PollResults['demographics']) => {
    if (!results?.demographics[category]) return [];
    return Object.entries(results.demographics[category]).map(([name, count]) => ({
      name,
      value: count,
      percentage: ((count / results.total_responses) * 100).toFixed(1)
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <Header currentPage="/dashboard" />
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-center py-20">
            <RefreshCw className="h-8 w-8 text-blue-600 animate-spin mr-3" />
            <span className="text-lg text-gray-600">Loading poll results...</span>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !results || results.total_responses === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <Header currentPage="/dashboard" />
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center py-20">
            <AlertCircle className="h-16 w-16 text-yellow-500 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {error ? 'Error Loading Results' : 'No Poll Data Yet'}
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              {error ? error : 'Be the first to participate in our polling to see results here!'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/poll"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Take the Poll
              </a>
              <button
                onClick={fetchResults}
                className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header currentPage="/dashboard" />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="text-center mb-8">
          <BarChart3 className="h-16 w-16 text-green-600 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Live Results Dashboard
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
            Real-time polling results for Nigeria's 2027 presidential elections
          </p>
          
          {/* Status Bar */}
          <div className="flex items-center justify-center space-x-6 text-sm">
            <div className="flex items-center">
              <Users className="h-4 w-4 text-blue-600 mr-2" />
              <span className="font-semibold">{results.total_responses}</span>
              <span className="text-gray-600 ml-1">Total Responses</span>
            </div>
            <div className="flex items-center">
              <Activity className={`h-4 w-4 mr-2 ${isRealTimeConnected ? 'text-green-600' : 'text-red-600'}`} />
              <span className={isRealTimeConnected ? 'text-green-600' : 'text-red-600'}>
                {isRealTimeConnected ? 'Live Updates' : 'Disconnected'}
              </span>
            </div>
            <div className="text-gray-500">
              Last updated: {lastUpdate.toLocaleTimeString()}
            </div>
          </div>
        </div>

        {/* Presidential Candidates Results */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
            <TrendingUp className="h-6 w-6 text-blue-600 mr-2" />
            Presidential Candidate Preferences
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Pie Chart */}
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-4 text-center">Vote Share</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={getCandidateChartData()}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({name, percentage}) => `${name}: ${percentage}%`}
                  >
                    {getCandidateChartData().map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number, name) => [value, 'Votes']} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Bar Chart */}
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-4 text-center">Vote Count</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={getCandidateChartData()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                  <YAxis />
                  <Tooltip 
                    formatter={(value: number) => [value, 'Votes']}
                    labelFormatter={(label) => {
                      const item = getCandidateChartData().find(d => d.name === label);
                      return item?.fullName || label;
                    }}
                  />
                  <Bar dataKey="value" fill="#0088FE" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Key Issues Results */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
            <BarChart3 className="h-6 w-6 text-green-600 mr-2" />
            Top Priority Issues
          </h2>
          
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={getIssuesChartData()} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={120} />
              <Tooltip 
                formatter={(value: number) => [value, 'Mentions']}
                labelFormatter={(label) => {
                  const item = getIssuesChartData().find(d => d.name === label);
                  return item?.fullName || label;
                }}
              />
              <Bar dataKey="value" fill="#00C49F" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Demographics Breakdown */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          
          {/* Age Groups */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Users className="h-5 w-5 text-purple-600 mr-2" />
              Age Groups
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={getDemographicChartData('age_groups')}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({name, percentage}) => `${name}: ${percentage}%`}
                >
                  {getDemographicChartData('age_groups').map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => [value, 'Responses']} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Regions */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <BarChart3 className="h-5 w-5 text-blue-600 mr-2" />
              Regions
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={getDemographicChartData('regions')}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip formatter={(value: number) => [value, 'Responses']} />
                <Bar dataKey="value" fill="#0088FE" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Gender */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Users className="h-5 w-5 text-green-600 mr-2" />
              Gender
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={getDemographicChartData('genders')}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({name, percentage}) => `${name}: ${percentage}%`}
                >
                  {getDemographicChartData('genders').map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => [value, 'Responses']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-yellow-800 mb-3">Important Notes</h3>
          <ul className="text-yellow-700 space-y-2 text-sm">
            <li>• Results update in real-time as new responses are submitted</li>
            <li>• Sample size: {results.total_responses} anonymous responses</li>
            <li>• Online polling may not represent the full Nigerian electorate</li>
            <li>• This data is for forecasting and educational purposes only</li>
            <li>• Rural areas and older demographics may be under-represented</li>
          </ul>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 