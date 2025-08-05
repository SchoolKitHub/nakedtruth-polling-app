import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Shield, FileText, Users, AlertTriangle } from 'lucide-react';

export const metadata = {
  title: 'Methodology - NakedTruth',
  description: 'Transparent methodology, data security, and legal compliance for our polling platform',
};

export default function MethodologyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header currentPage="/methodology" />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <FileText className="h-16 w-16 text-blue-600 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Methodology & Transparency
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Complete transparency about our polling methods, data security measures, 
            and legal compliance with Nigerian electoral laws.
          </p>
        </div>

        <div className="space-y-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center mb-4">
              <Shield className="h-8 w-8 text-green-600 mr-3" />
              <h2 className="text-2xl font-semibold text-gray-900">Data Security & Privacy</h2>
            </div>
            <div className="space-y-4 text-gray-600">
              <p>
                Our platform prioritizes voter privacy and data security through multiple layers of protection:
              </p>
              <ul className="space-y-2 ml-4">
                <li>• <strong>Anonymous Responses:</strong> No personal information is collected or stored</li>
                <li>• <strong>IP Hash Protection:</strong> IP addresses are hashed for duplicate prevention only</li>
                <li>• <strong>Encrypted Data:</strong> All data is encrypted in transit and at rest</li>
                <li>• <strong>Secure Database:</strong> Hosted on Supabase with Row Level Security (RLS)</li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center mb-4">
              <Users className="h-8 w-8 text-blue-600 mr-3" />
              <h2 className="text-2xl font-semibold text-gray-900">Sampling Methodology</h2>
            </div>
            <div className="space-y-4 text-gray-600">
              <p>
                Our polling methodology is designed to capture voter sentiment while acknowledging limitations:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Sample Collection</h3>
                  <ul className="space-y-1 text-sm">
                    <li>• Online self-selected participation</li>
                    <li>• Demographic stratification</li>
                    <li>• Regional representation tracking</li>
                    <li>• Duplicate prevention measures</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Analysis Methods</h3>
                  <ul className="space-y-1 text-sm">
                    <li>• Weighted demographic analysis</li>
                    <li>• Regional breakdown comparisons</li>
                    <li>• Historical trend analysis</li>
                    <li>• Statistical significance testing</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8">
            <div className="flex items-center mb-4">
              <AlertTriangle className="h-8 w-8 text-yellow-600 mr-3" />
              <h2 className="text-2xl font-semibold text-yellow-800">Limitations & Disclaimers</h2>
            </div>
            <div className="space-y-4 text-yellow-800">
              <p>We are transparent about the limitations of our online polling approach:</p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Sample Bias</h3>
                  <ul className="space-y-1 text-sm text-yellow-700">
                    <li>• Over-represents internet users</li>
                    <li>• May under-represent rural areas</li>
                    <li>• Skews toward younger demographics</li>
                    <li>• Self-selection bias</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Usage Guidelines</h3>
                  <ul className="space-y-1 text-sm text-yellow-700">
                    <li>• For forecasting purposes only</li>
                    <li>• Not a substitute for scientific polling</li>
                    <li>• Results are non-binding</li>
                    <li>• Consult INEC for official data</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8" id="compliance">
            <div className="flex items-center mb-4">
              <FileText className="h-8 w-8 text-purple-600 mr-3" />
              <h2 className="text-2xl font-semibold text-gray-900">Legal Compliance</h2>
            </div>
            <div className="space-y-4 text-gray-600">
              <p>
                This platform operates in full compliance with Nigerian laws and regulations:
              </p>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Electoral Act 2022</h3>
                  <p className="text-sm">
                    Our platform does not engage in campaigning or voter influence. 
                    We provide neutral forecasting and educational content only.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Nigeria Data Protection Act 2023</h3>
                  <p className="text-sm">
                    All data collection is anonymous and consensual. No personal data is processed 
                    without explicit consent, and users can participate completely anonymously.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">INEC Regulations</h3>
                  <p className="text-sm">
                    This platform is independent and not affiliated with INEC or any political party. 
                    We defer to INEC for all official election information and procedures.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 