'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { presidentialCandidates } from '@/lib/candidates';
import { 
  BarChart3, 
  Users, 
  RefreshCw, 
  AlertCircle
} from 'lucide-react';

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

export default function DashboardPage() {
  const [results, setResults] = useState<PollResults | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  const fetchResults = async () => {
    try {
      const response = await fetch('/api/results', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      if (data.success && data.data) {
        setResults(data.data);
        setLastUpdate(new Date());
        setError(null);
      } else {
        console.error('API returned error:', data.error);
        setError(data.error || 'Failed to fetch results');
      }
    } catch (err) {
      console.error('Fetch error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Network error';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  // Function to get candidate data from party name or candidate name
  const getCandidateData = (key: string) => {
    // First try to match by party name
    let candidate = presidentialCandidates.find(c => c.party === key);
    
    // If not found, try to match by candidate name (for cases like "Atiku Abubakar (ADC Coalition)")
    if (!candidate) {
      candidate = presidentialCandidates.find(c => key.includes(c.name));
    }
    
    // Return candidate data or fallback
    return candidate || { 
      name: key.replace(/\s*\(.*?\)\s*/g, '').trim(), // Remove party in parentheses
      image: '', 
      party: key,
      id: key 
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <Header currentPage="/dashboard" />
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col items-center justify-center py-20">
            <RefreshCw className="h-8 w-8 text-blue-600 animate-spin mr-3" />
            <span className="text-lg text-gray-600 mb-4">Loading poll results...</span>
            <div className="text-sm text-gray-500">
              Check the browser console (F12) for debug information
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <Header currentPage="/dashboard" />
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center py-20">
            <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Error Loading Results
            </h1>
            <p className="text-lg text-red-600 mb-8">
              {error}
            </p>
            <button
              onClick={() => {
                setLoading(true);
                setError(null);
                fetchResults();
              }}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center mx-auto"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!results || results.total_responses === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <Header currentPage="/dashboard" />
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center py-20">
            <AlertCircle className="h-16 w-16 text-yellow-500 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              No Poll Data Yet
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Be the first to participate in our polling to see results here!
            </p>
            <a
              href="/poll"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Take the Poll
            </a>
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
            📊 Poll Results Dashboard
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
            Live polling results for Nigeria's 2027 presidential elections
          </p>
          
          {/* Status Bar */}
          <div className="flex items-center justify-center space-x-6 text-sm bg-green-50 p-4 rounded-lg">
            <div className="flex items-center">
              <Users className="h-4 w-4 text-blue-600 mr-2" />
              <span className="font-semibold text-2xl text-green-600">{results.total_responses}</span>
              <span className="text-gray-600 ml-1">Total Responses</span>
            </div>
            <div className="text-gray-500">
              Last updated: {lastUpdate.toLocaleTimeString()}
            </div>
            <button
              onClick={() => {
                setLoading(true);
                fetchResults();
              }}
              className="text-blue-600 hover:text-blue-800 flex items-center bg-white px-3 py-1 rounded"
            >
              <RefreshCw className="h-4 w-4 mr-1" />
              Refresh
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Presidential Candidates */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              🏛️ Presidential Candidates
            </h2>
            <div className="space-y-3">
              {Object.entries(results.presidential_candidates).map(([key, votes]) => {
                const candidate = getCandidateData(key);
                return (
                  <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200 flex-shrink-0">
                        {candidate.image ? (
                          <Image
                            src={candidate.image}
                            alt={candidate.name}
                            fill
                            className="object-cover"
                            sizes="40px"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                            <span className="text-white text-sm font-bold">
                              {candidate.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                            </span>
                          </div>
                        )}
                      </div>
                      <span className="font-medium text-gray-900">{candidate.name}</span>
                    </div>
                    <span className="text-lg font-bold text-blue-600">
                      {votes} ({((votes / results.total_responses) * 100).toFixed(1)}%)
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Key Issues */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              🎯 Key Issues
            </h2>
            <div className="space-y-3">
              {Object.entries(results.key_issues)
                .sort(([,a], [,b]) => b - a)
                .slice(0, 6)
                .map(([issue, mentions]) => (
                <div key={issue} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="font-medium text-sm">{issue}</span>
                  <span className="text-lg font-bold text-green-600">
                    {mentions}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Demographics */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              👥 Demographics
            </h2>
            
            <div className="mb-6">
              <h3 className="font-medium text-gray-700 mb-2">Age Groups</h3>
              <div className="space-y-2">
                {Object.entries(results.demographics.age_groups).map(([age, count]) => (
                  <div key={age} className="flex justify-between text-sm">
                    <span>{age}</span>
                    <span className="font-semibold">{count}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="font-medium text-gray-700 mb-2">Regions</h3>
              <div className="space-y-2">
                {Object.entries(results.demographics.regions).map(([region, count]) => (
                  <div key={region} className="flex justify-between text-sm">
                    <span>{region}</span>
                    <span className="font-semibold">{count}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-700 mb-2">Gender</h3>
              <div className="space-y-2">
                {Object.entries(results.demographics.genders).map(([gender, count]) => (
                  <div key={gender} className="flex justify-between text-sm">
                    <span>{gender}</span>
                    <span className="font-semibold">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mt-8">
          <h3 className="text-lg font-semibold text-yellow-800 mb-3">⚠️ Important Notes</h3>
          <ul className="text-yellow-700 space-y-2 text-sm">
            <li>• Sample size: {results.total_responses} anonymous responses</li>
            <li>• Online polling may not represent the full Nigerian electorate</li>
            <li>• This data is for forecasting and educational purposes only</li>
          </ul>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 