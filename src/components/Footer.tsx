import Link from 'next/link';
import { Vote } from 'lucide-react';

export default function Footer() {
  return (
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
  );
} 