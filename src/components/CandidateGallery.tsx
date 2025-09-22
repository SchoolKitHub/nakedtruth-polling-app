'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { presidentialCandidates, Candidate } from '@/lib/candidates';
import { Search, Filter, TrendingUp, TrendingDown, Users, MapPin, Calendar, Award, ChevronDown, ChevronUp, Eye, BarChart3 } from 'lucide-react';

interface CandidateGalleryProps {
  showPollData?: boolean;
  pollResults?: Record<string, number>;
}

export default function CandidateGallery({ showPollData = false, pollResults = {} }: CandidateGalleryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedParty, setSelectedParty] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'swot' | 'stats'>('overview');

  // Filter candidates based on search and filters
  const filteredCandidates = useMemo(() => {
    return presidentialCandidates.filter(candidate => {
      if (candidate.id === 'other' || candidate.id === 'undecided') return false;
      
      const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           candidate.party.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           candidate.description?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesRegion = selectedRegion === 'all' || candidate.keyStats?.region === selectedRegion;
      const matchesParty = selectedParty === 'all' || candidate.party.includes(selectedParty);
      
      return matchesSearch && matchesRegion && matchesParty;
    });
  }, [searchTerm, selectedRegion, selectedParty]);

  // Get unique regions and parties for filters
  const regions = useMemo(() => {
    const regionSet = new Set(presidentialCandidates.map(c => c.keyStats?.region).filter(Boolean));
    return Array.from(regionSet);
  }, []);

  const parties = useMemo(() => {
    const partySet = new Set(presidentialCandidates.map(c => {
      if (c.party.includes('APC')) return 'APC';
      if (c.party.includes('PDP')) return 'PDP';
      if (c.party.includes('ADC')) return 'ADC';
      if (c.party.includes('NNPP')) return 'NNPP';
      return 'Other';
    }));
    return Array.from(partySet);
  }, []);

  const toggleExpanded = (candidateId: string) => {
    setExpandedCard(expandedCard === candidateId ? null : candidateId);
  };

  const getPartyColor = (party: string) => {
    if (party.includes('APC')) return 'bg-red-100 text-red-800 border-red-200';
    if (party.includes('PDP')) return 'bg-green-100 text-green-800 border-green-200';
    if (party.includes('ADC')) return 'bg-blue-100 text-blue-800 border-blue-200';
    if (party.includes('NNPP')) return 'bg-purple-100 text-purple-800 border-purple-200';
    return 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getStrengthWeaknessIcon = (type: 'strength' | 'weakness') => {
    return type === 'strength' ? 
      <TrendingUp className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" /> : 
      <TrendingDown className="h-4 w-4 text-red-600 flex-shrink-0 mt-0.5" />;
  };

  const CandidateCard = ({ candidate }: { candidate: Candidate }) => {
    const isExpanded = expandedCard === candidate.id;
    const pollVotes = pollResults[candidate.party] || 0;
    const totalVotes = Object.values(pollResults).reduce((sum, votes) => sum + votes, 0);
    const pollPercentage = totalVotes > 0 ? (pollVotes / totalVotes * 100).toFixed(1) : '0';

    return (
      <div className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 ${
        isExpanded ? 'col-span-full' : ''
      }`}>
        {/* Header */}
        <div className="p-6">
          <div className="flex items-start space-x-4">
            <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-gray-200 flex-shrink-0">
              {candidate.image ? (
                <Image
                  src={candidate.image}
                  alt={candidate.name}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">
                    {candidate.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-bold text-gray-900 mb-1">{candidate.name}</h3>
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getPartyColor(candidate.party)}`}>
                {candidate.party}
              </div>
              <p className="text-gray-600 mt-2 text-sm">{candidate.description}</p>
              
              {showPollData && pollVotes > 0 && (
                <div className="mt-3 flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <BarChart3 className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-600">
                      {pollVotes} votes ({pollPercentage}%)
                    </span>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => toggleExpanded(candidate.id)}
              className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              {isExpanded ? <ChevronUp className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>

          {/* Quick Stats */}
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
            {candidate.keyStats?.age && (
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Calendar className="h-4 w-4" />
                <span>{candidate.keyStats.age}</span>
              </div>
            )}
            {candidate.keyStats?.region && (
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <MapPin className="h-4 w-4" />
                <span>{candidate.keyStats.region}</span>
              </div>
            )}
            {candidate.position && (
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Award className="h-4 w-4" />
                <span>{candidate.position}</span>
              </div>
            )}
            {candidate.votesIn2023 && (
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Users className="h-4 w-4" />
                <span>{candidate.votesIn2023}</span>
              </div>
            )}
          </div>
        </div>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="border-t border-gray-200">
            {/* Tab Navigation */}
            <div className="flex border-b border-gray-200">
              {[
                { id: 'overview', label: 'Overview', icon: Eye },
                { id: 'swot', label: 'SWOT Analysis', icon: BarChart3 },
                { id: 'stats', label: 'Key Stats', icon: Award }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 px-6 py-3 text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === 'overview' && (
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Full Description</h4>
                    <p className="text-gray-700 leading-relaxed">{candidate.fullDescription}</p>
                  </div>
                  
                  {candidate.keyStats?.coalition && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Coalition/Alliance</h4>
                      <p className="text-gray-700">{candidate.keyStats.coalition}</p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'swot' && candidate.swot && (
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Strengths */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-green-800 flex items-center space-x-2">
                      <TrendingUp className="h-5 w-5" />
                      <span>Strengths</span>
                    </h4>
                    <div className="space-y-3">
                      {candidate.swot.strengths.map((strength, index) => (
                        <div key={index} className="flex space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
                          {getStrengthWeaknessIcon('strength')}
                          <p className="text-sm text-gray-700 leading-relaxed">{strength}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Weaknesses */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-red-800 flex items-center space-x-2">
                      <TrendingDown className="h-5 w-5" />
                      <span>Weaknesses</span>
                    </h4>
                    <div className="space-y-3">
                      {candidate.swot.weaknesses.map((weakness, index) => (
                        <div key={index} className="flex space-x-3 p-3 bg-red-50 rounded-lg border border-red-200">
                          {getStrengthWeaknessIcon('weakness')}
                          <p className="text-sm text-gray-700 leading-relaxed">{weakness}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'stats' && (
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900">Political Background</h4>
                    <div className="space-y-3">
                      {candidate.keyStats?.experience && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Experience:</span>
                          <span className="font-medium text-gray-900">{candidate.keyStats.experience}</span>
                        </div>
                      )}
                      {candidate.keyStats?.age && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Age by 2027:</span>
                          <span className="font-medium text-gray-900">{candidate.keyStats.age}</span>
                        </div>
                      )}
                      {candidate.keyStats?.region && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Base Region:</span>
                          <span className="font-medium text-gray-900">{candidate.keyStats.region}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900">Electoral Performance</h4>
                    <div className="space-y-3">
                      {candidate.votesIn2023 && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">2023 Performance:</span>
                          <span className="font-medium text-gray-900">{candidate.votesIn2023}</span>
                        </div>
                      )}
                      {showPollData && pollVotes > 0 && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Current Poll:</span>
                          <span className="font-medium text-blue-600">{pollVotes} votes ({pollPercentage}%)</span>
                        </div>
                      )}
                      {candidate.keyStats?.coalition && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Alliance:</span>
                          <span className="font-medium text-gray-900">{candidate.keyStats.coalition}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          🏛️ 2027 Presidential Candidates Gallery
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Comprehensive profiles and SWOT analysis of Nigeria's leading presidential contenders for the 2027 election
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search candidates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Region Filter */}
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Regions</option>
            {regions.map(region => (
              <option key={region} value={region}>{region}</option>
            ))}
          </select>

          {/* Party Filter */}
          <select
            value={selectedParty}
            onChange={(e) => setSelectedParty(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Parties</option>
            {parties.map(party => (
              <option key={party} value={party}>{party}</option>
            ))}
          </select>

          {/* View Mode Toggle */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              List
            </button>
          </div>
        </div>

        {/* Results Count */}
        <div className="mt-4 text-sm text-gray-600">
          Showing {filteredCandidates.length} of {presidentialCandidates.length - 2} candidates
        </div>
      </div>

      {/* Candidates Grid */}
      <div className={`grid gap-6 ${
        viewMode === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'
      }`}>
        {filteredCandidates.map(candidate => (
          <CandidateCard key={candidate.id} candidate={candidate} />
        ))}
      </div>

      {/* No Results */}
      {filteredCandidates.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Filter className="h-16 w-16 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No candidates found</h3>
          <p className="text-gray-600">Try adjusting your search terms or filters</p>
        </div>
      )}
    </div>
  );
} 