'use client';
import { presidentialCandidates } from "@/lib/candidates";
import CandidateCard from "@/components/CandidateCard";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Vote, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

interface PollFormData {
  presidential_candidate: string;
  key_issues: string[];
  demographics: {
    age_group: string;
    region: string;
    gender: string;
  };
  consent: boolean;
}

export default function PollPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [selectedCandidate, setSelectedCandidate] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm<PollFormData>();

  const watchedIssues = watch('key_issues', []);

  const keyIssues = [
    'Economy & Job Creation',
    'Security & Safety',
    'Corruption & Governance',
    'Infrastructure Development',
    'Healthcare System',
    'Education Reform',
    'Agricultural Development',
    'Youth Empowerment'
  ];

  const ageGroups = [
    '18-24',
    '25-34',
    '35-44',
    '45-54',
    '55-64',
    '65+'
  ];

  const regions = [
    'North Central',
    'North East',
    'North West',
    'South East',
    'South South',
    'South West'
  ];

  const genders = [
    'Male',
    'Female',
    'Prefer not to say'
  ];

  const handleIssueChange = (issue: string, checked: boolean) => {
    const currentIssues = watchedIssues || [];
    if (checked) {
      setValue('key_issues', [...currentIssues, issue]);
    } else {
      setValue('key_issues', currentIssues.filter(i => i !== issue));
    }
  };

  const handleCandidateSelect = (candidateId: string) => {
    setSelectedCandidate(candidateId);
    setValue("presidential_candidate", candidateId);
  };

  const onSubmit = async (data: PollFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Convert candidate ID to candidate name for better data consistency
      const candidateData = presidentialCandidates.find(c => c.id === data.presidential_candidate);
      const candidateName = candidateData ? `${candidateData.name} (${candidateData.party})` : data.presidential_candidate;
      
      const submitData = {
        ...data,
        presidential_candidate: candidateName
      };

      const response = await fetch("/api/submit-poll", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      });

      const result = await response.json();

      if (result.success) {
        setIsSubmitted(true);
        // Store in localStorage to prevent multiple submissions
        localStorage.setItem("nakedtruth_voted", "true");
      } else {
        setSubmitError(result.error || "Failed to submit poll");
      }
    } catch (error) {
      setSubmitError("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Check if user has already voted
  if (typeof window !== 'undefined' && localStorage.getItem('nakedtruth_voted')) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <Header currentPage="/poll" />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Thank You for Participating!
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Your response has been recorded anonymously. You can view the aggregated results in our dashboard.
            </p>
            <a
              href="/dashboard"
              className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              View Results Dashboard
            </a>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <Header currentPage="/poll" />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Thank You for Your Participation!
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Your anonymous response has been recorded and will contribute to our forecasting analysis.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <a
                href="/dashboard"
                className="inline-flex items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                View Results Dashboard
              </a>
              <a
                href="/education"
                className="inline-flex items-center justify-center border border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Learn More About Elections
              </a>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header currentPage="/poll" />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <Vote className="h-16 w-16 text-blue-600 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Nigeria 2027 Presidential Election Poll
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Participate in forecasting voter's sentiments for 2027 Presidential Election - Completely anonymous and secure.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-lg p-8 space-y-8">
          {/* Presidential Candidate Section */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Presidential Preference
            </h2>
            <p className="text-gray-600 mb-6">
              Which candidate would you most likely vote for in the 2027 presidential election?
            </p>
            <div className="grid gap-4">
              {presidentialCandidates.map((candidate) => (
                <CandidateCard
                  key={candidate.id}
                  candidate={candidate}
                  isSelected={selectedCandidate === candidate.id}
                  onSelect={handleCandidateSelect}
                  register={register}
                />
              ))}
            </div>
            {errors.presidential_candidate && (
              <p className="text-red-600 text-sm mt-2">{errors.presidential_candidate.message}</p>
            )}
          </div>

          {/* Key Issues Section */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Key Issues
            </h2>
            <p className="text-gray-600 mb-6">
              What are the most important issues for Nigeria's next president to address? (Select all that apply)
            </p>
            <div className="grid md:grid-cols-2 gap-3">
              {keyIssues.map((issue) => (
                <label key={issue} className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={watchedIssues?.includes(issue) || false}
                    onChange={(e) => handleIssueChange(issue, e.target.checked)}
                    className="mr-3 text-blue-600 rounded"
                  />
                  <span className="text-gray-900">{issue}</span>
                </label>
              ))}
            </div>
            {errors.key_issues && (
              <p className="text-red-600 text-sm mt-2">Please select at least one key issue</p>
            )}
          </div>

          {/* Demographics Section */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Demographics
            </h2>
            <p className="text-gray-600 mb-6">
              This information helps us understand different perspectives across Nigeria. 
              All responses remain completely anonymous.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              {/* Age Group */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Age Group *
                </label>
                <select
                  {...register('demographics.age_group', { required: 'Age group is required' })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select age group</option>
                  {ageGroups.map((age) => (
                    <option key={age} value={age}>{age}</option>
                  ))}
                </select>
                {errors.demographics?.age_group && (
                  <p className="text-red-600 text-sm mt-1">{errors.demographics.age_group.message}</p>
                )}
              </div>

              {/* Region */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Region *
                </label>
                <select
                  {...register('demographics.region', { required: 'Region is required' })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select region</option>
                  {regions.map((region) => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
                {errors.demographics?.region && (
                  <p className="text-red-600 text-sm mt-1">{errors.demographics.region.message}</p>
                )}
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender *
                </label>
                <select
                  {...register('demographics.gender', { required: 'Gender is required' })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select gender</option>
                  {genders.map((gender) => (
                    <option key={gender} value={gender}>{gender}</option>
                  ))}
                </select>
                {errors.demographics?.gender && (
                  <p className="text-red-600 text-sm mt-1">{errors.demographics.gender.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Consent Section */}
          <div className="bg-blue-50 p-6 rounded-lg">
            <label className="flex items-start">
              <input
                type="checkbox"
                {...register('consent', { required: 'Consent is required to participate' })}
                className="mt-1 mr-3 text-blue-600 rounded"
              />
              <div className="text-sm text-blue-800">
                <p className="font-semibold mb-2">Consent & Privacy Agreement</p>
                <p>
                  I understand that my responses are completely anonymous and will be used for 
                  forecasting and educational purposes only. I confirm that I am eligible to vote 
                  in Nigerian elections and consent to participate in this poll.
                </p>
              </div>
            </label>
            {errors.consent && (
              <p className="text-red-600 text-sm mt-2">{errors.consent.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex flex-col items-center space-y-4">
            {submitError && (
              <div className="flex items-center text-red-600 bg-red-50 p-3 rounded-lg">
                <AlertCircle className="h-5 w-5 mr-2" />
                <span>{submitError}</span>
              </div>
            )}
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full md:w-auto bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Submitting Your Response...
                </>
              ) : (
                'Submit Anonymous Response'
              )}
            </button>
            
            <p className="text-sm text-gray-500 text-center max-w-md">
              Your response will be encrypted and stored anonymously. 
              No personal information or IP addresses are saved.
            </p>
          </div>
        </form>
      </main>
      
      <Footer />
    </div>
  );
} 
