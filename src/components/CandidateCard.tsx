import { Candidate } from '@/lib/candidates';
import Image from 'next/image';
import { UseFormRegister } from 'react-hook-form';

interface CandidateCardProps {
  candidate: Candidate;
  isSelected: boolean;
  onSelect: (candidateId: string) => void;
  register: UseFormRegister<any>;
}

export default function CandidateCard({ candidate, isSelected, onSelect, register }: CandidateCardProps) {
  return (
    <label 
      className={`block p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md ${
        isSelected 
          ? 'border-blue-500 bg-blue-50 shadow-md' 
          : 'border-gray-200 hover:border-gray-300'
      }`}
      onClick={() => onSelect(candidate.id)}
    >
      {/* Radio, Image and Content - Horizontal Layout */}
      <div className="flex items-start gap-4">
        {/* Radio Input - Aligned Left */}
        <div className="flex items-center pt-1">
          <input
            type="radio"
            value={candidate.id}
            {...register('presidential_candidate', { required: 'Please select a candidate preference' })}
            className="w-5 h-5 text-blue-600 focus:ring-blue-500"
          />
        </div>

        {/* Avatar Image */}
        {candidate.image ? (
          <div className="w-16 h-16 relative rounded-full overflow-hidden border-2 border-gray-200 flex-shrink-0">
            <Image
              src={candidate.image}
              alt={candidate.name}
              fill
              className="object-cover"
              sizes="64px"
            />
          </div>
        ) : (
          <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
            <span className="text-gray-500 text-xl font-semibold">
              {candidate.name.charAt(0)}
            </span>
          </div>
        )}
        
        {/* Name and Description */}
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-gray-900 text-base mb-2">{candidate.name}</h3>
          {candidate.description && (
            <p className="text-sm text-gray-700 leading-relaxed">{candidate.description}</p>
          )}
        </div>
      </div>
    </label>
  );
}
