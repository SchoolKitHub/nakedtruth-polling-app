'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CandidateGallery from '@/components/CandidateGallery';
import { BarChart3, TrendingUp, Users, MapPin } from 'lucide-react';

interface PollResults {
  total_responses: number;
  presidential_candidates: Record<string, number>;
  key_issues: Record<string, number>;
  demographics: {
    age_groups: Record<string, number>;
    regions: Record<string, number>;
    gender: Record<string, number>;
  };
}

export default function CandidatesPage() {
  const [pollResults, setPollResults] = useState<PollResults | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showPollData, setShowPollData] = useState(false);

  useEffect(() => {
    fetchPollResults();
  }, []);

  const fetchPollResults = async () => {
    try {
      const response = await fetch('/api/poll-results');
      if (response.ok) {
        const data = await response.json();
        setPollResults(data);
      }
    } catch (error) {
      console.error('Error fetching poll results:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const topCandidates = pollResults ? 
    Object.entries(pollResults.presidential_candidates)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3) : [];

  const totalVotes = pollResults?.total_responses || 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header currentPage="/candidates" />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Poll Data Toggle */}
        {!isLoading && pollResults && (
          <div className="mb-8 bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Live Poll Integration</h2>
                <p className="text-gray-600">
                  Show current polling data alongside candidate profiles ({totalVotes} total responses)
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showPollData}
                    onChange={(e) => setShowPollData(e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Show Poll Data</span>
                </label>
              </div>
            </div>

            {/* Quick Poll Summary */}
            {showPollData && (
              <div className="mt-6 grid md:grid-cols-3 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <BarChart3 className="h-8 w-8 text-blue-600" />
                    <div>
                      <p className="text-sm text-blue-600 font-medium">Total Responses</p>
                      <p className="text-2xl font-bold text-blue-900">{totalVotes}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <TrendingUp className="h-8 w-8 text-green-600" />
                    <div>
                      <p className="text-sm text-green-600 font-medium">Leading Candidate</p>
                      <p className="text-lg font-bold text-green-900">
                        {topCandidates[0] ? topCandidates[0][0].split(' (')[0] : 'N/A'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <Users className="h-8 w-8 text-purple-600" />
                    <div>
                      <p className="text-sm text-purple-600 font-medium">Active Candidates</p>
                      <p className="text-2xl font-bold text-purple-900">
                        {Object.keys(pollResults.presidential_candidates).length}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Candidate Gallery */}
        <CandidateGallery 
          showPollData={showPollData} 
          pollResults={pollResults?.presidential_candidates || {}} 
        />

        {/* Additional Insights */}
        {showPollData && pollResults && (
          <div className="mt-12 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">📊 Current Polling Insights</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Top Candidates */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  <span>Top Performing Candidates</span>
                </h3>
                <div className="space-y-3">
                  {topCandidates.map(([candidate, votes], index) => {
                    const percentage = ((votes / totalVotes) * 100).toFixed(1);
                    return (
                      <div key={candidate} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                            index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-400'
                          }`}>
                            {index + 1}
                          </div>
                          <span className="font-medium text-gray-900">{candidate}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-blue-600">{votes} votes</div>
                          <div className="text-sm text-gray-600">{percentage}%</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Regional Distribution */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  <span>Regional Participation</span>
                </h3>
                <div className="space-y-3">
                  {Object.entries(pollResults.demographics.regions)
                    .sort(([,a], [,b]) => b - a)
                    .slice(0, 5)
                    .map(([region, count]) => {
                      const percentage = ((count / totalVotes) * 100).toFixed(1);
                      return (
                        <div key={region} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <span className="font-medium text-gray-900">{region}</span>
                          <div className="text-right">
                            <div className="font-bold text-blue-600">{count} responses</div>
                            <div className="text-sm text-gray-600">{percentage}%</div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> Poll data is updated in real-time and reflects current voter sentiment. 
                The comprehensive SWOT analysis above provides deeper insights into each candidate's electoral prospects.
              </p>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
} 