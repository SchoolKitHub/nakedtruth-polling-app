import Link from 'next/link';
import { Vote, BarChart3, Users, Shield } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-2">
              <Vote className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">NakedTruth</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/poll" className="text-gray-600 hover:text-blue-600 transition-colors">
                Take Poll
              </Link>
              <Link href="/candidates" className="text-gray-600 hover:text-blue-600 transition-colors">
                Candidates
              </Link>
              <Link href="/dashboard" className="text-gray-600 hover:text-blue-600 transition-colors">
                Results
              </Link>
              <Link href="/education" className="text-gray-600 hover:text-blue-600 transition-colors">
                Education
              </Link>
              <Link href="/methodology" className="text-gray-600 hover:text-blue-600 transition-colors">
                Methodology
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            NakedTruth: Forecasting Nigeria&apos;s 2027 Elections
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Anonymous polling and data-driven insights ahead of Nigeria&apos;s 2027 presidential elections on February 27, 2027. 
            Participate in our secure, transparent polling system to help forecast voter sentiment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/poll" 
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Take the Poll
            </Link>
            <Link 
              href="/candidates" 
              className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              View Candidates
            </Link>
            <Link 
              href="/dashboard" 
              className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              View Results
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-6">
            <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3">Anonymous & Secure</h3>
            <p className="text-gray-600">
              Your responses are completely anonymous. We use advanced encryption and privacy measures to protect your data.
            </p>
          </div>
          <div className="text-center p-6">
            <BarChart3 className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3">Real-time Analytics</h3>
            <p className="text-gray-600">
              Interactive dashboards with regional breakdowns, demographic analysis, and historical comparisons.
            </p>
          </div>
          <div className="text-center p-6">
            <Users className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3">Transparent Methodology</h3>
            <p className="text-gray-600">
              Full transparency on our polling methods, sample sizes, and limitations. Educational resources included.
            </p>
          </div>
        </div>

        {/* Disclaimer Section */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-12">
          <h3 className="text-lg font-semibold text-yellow-800 mb-3">Important Disclaimers</h3>
          <ul className="text-yellow-700 space-y-2 text-sm">
            <li>• This app is for forecasting and educational purposes only, not official polling</li>
            <li>• Results are non-binding and may not represent the full electorate due to online sampling biases</li>
            <li>• May under-represent rural voters and older demographics who have limited internet access</li>
            <li>• Always consult INEC for official election information and procedures</li>
            <li>• This platform promotes transparency and neutral analysis of voter sentiment</li>
          </ul>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Vote className="h-6 w-6" />
                <span className="text-lg font-semibold">NakedTruth</span>
              </div>
              <p className="text-gray-400 text-sm">
                Transparent, anonymous polling for Nigeria&apos;s 2027 elections.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Polling</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/poll" className="hover:text-white transition-colors">Take Poll</Link></li>
                <li><Link href="/candidates" className="hover:text-white transition-colors">View Candidates</Link></li>
                <li><Link href="/dashboard" className="hover:text-white transition-colors">View Results</Link></li>
                <li><Link href="/methodology" className="hover:text-white transition-colors">Methodology</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Education</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/education" className="hover:text-white transition-colors">Voter Education</Link></li>
                <li><a href="https://inecnigeria.org" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">INEC Official</a></li>
                <li><Link href="/education#fact-check" className="hover:text-white transition-colors">Fact Check</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link href="/methodology#compliance" className="hover:text-white transition-colors">Legal Compliance</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>
              © 2024 NakedTruth. This is an independent forecasting platform, not affiliated with INEC or any political party.
              Results are for educational and analytical purposes only.
            </p>
            <p className="mt-2">
              Compliant with Nigeria&apos;s Electoral Act 2022 and Data Protection Act 2023.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
