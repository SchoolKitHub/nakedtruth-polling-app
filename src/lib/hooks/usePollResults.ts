import { useState, useEffect } from 'react';
import { supabase } from '../supabase';

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

export function usePollResults() {
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
          console.log('New poll response received:', payload);
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
          console.error('Real-time connection failed:', status);
        }
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return {
    results,
    loading,
    error,
    lastUpdate,
    isRealTimeConnected,
    refetch: fetchResults
  };
} 