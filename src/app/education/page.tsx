import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { GraduationCap, ExternalLink, CheckCircle } from 'lucide-react';

export const metadata = {
  title: 'Voter Education - NakedTruth',
  description: 'Educational resources about Nigeria\'s electoral process and 2027 presidential elections',
};

export default function EducationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header currentPage="/education" />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <GraduationCap className="h-16 w-16 text-purple-600 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Voter Education Portal
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Learn about Nigeria's electoral process, candidate qualifications, 
            and key issues for the 2027 presidential elections.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <CheckCircle className="h-8 w-8 text-green-600 mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              How Nigeria's President is Elected
            </h2>
            <p className="text-gray-600 mb-4">
              Understanding the constitutional requirements, INEC processes, and electoral procedures.
            </p>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Constitutional qualifications for presidency</li>
              <li>• Electoral college and voting process</li>
              <li>• INEC registration and procedures</li>
              <li>• Timeline for 2027 elections</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <CheckCircle className="h-8 w-8 text-blue-600 mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Key Issues for 2027
            </h2>
            <p className="text-gray-600 mb-4">
              Major policy areas and challenges facing Nigeria's next president.
            </p>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Economic development and job creation</li>
              <li>• Security and stability</li>
              <li>• Corruption and governance</li>
              <li>• Infrastructure and development</li>
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">2023 Election Reference Data</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">25.4M</div>
              <div className="text-sm text-gray-600">Total Votes Cast</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">29%</div>
              <div className="text-sm text-gray-600">Voter Turnout</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">87.2M</div>
              <div className="text-sm text-gray-600">Registered Voters</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Official Resources</h2>
          <div className="space-y-4">
            <a 
              href="https://inecnigeria.org" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <ExternalLink className="h-5 w-5 text-blue-600 mr-3" />
              <div>
                <div className="font-semibold text-gray-900">INEC Official Website</div>
                <div className="text-sm text-gray-600">Independent National Electoral Commission</div>
              </div>
            </a>
            
            <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
              <div className="flex items-center mb-2">
                <ExternalLink className="h-5 w-5 text-gray-400 mr-3" />
                <div className="font-semibold text-gray-700">Fact-Checking Resources</div>
              </div>
              <div className="text-sm text-gray-600">
                Links to verified fact-checking organizations will be added here.
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 