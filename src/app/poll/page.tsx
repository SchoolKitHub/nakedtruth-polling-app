import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Vote, Clock } from 'lucide-react';

export const metadata = {
  title: 'Take Poll - NakedTruth',
  description: 'Participate in our anonymous polling for Nigeria\'s 2027 presidential elections',
};

export default function PollPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header currentPage="/poll" />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <Vote className="h-16 w-16 text-blue-600 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Anonymous Polling Interface
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Cast your anonymous vote for Nigeria's 2027 presidential elections. 
            Your responses help us forecast voter sentiment while maintaining complete privacy.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <Clock className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Coming Soon</h2>
          <p className="text-gray-600 mb-6">
            The polling interface is currently under development. This will include:
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 text-left max-w-2xl mx-auto">
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900">Poll Questions</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Presidential candidate preference</li>
                <li>• Key election issues</li>
                <li>• Voting likelihood assessment</li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900">Demographics</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Age group selection</li>
                <li>• Regional information</li>
                <li>• Anonymous data collection</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Privacy First:</strong> All responses are completely anonymous. 
              No personal data is collected or stored.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 