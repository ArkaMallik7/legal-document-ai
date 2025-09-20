import { Button } from "@/components/ui/button"
import { Scale, FileText, AlertTriangle, MessageCircle, Shield, Trash2, UserX, History, Lock } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                <Scale className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">LegalClarify AI</h1>
                <p className="text-sm text-gray-600">Demystifying Legal Documents</p>
              </div>
            </div>
            <nav className="flex items-center gap-6">
              <Link
                href="/history"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <History className="w-4 h-4" />
                <span>History</span>
              </Link>
              <Link
                href="/privacy"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Lock className="w-4 h-4" />
                <span>Privacy</span>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Understand Legal Documents with AI</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Transform complex legal jargon into clear, actionable insights. Upload any contract, agreement, or legal
            document and get instant explanations, risk assessments, and personalized guidance.
          </p>
        </div>

        {/* Upload Section */}
        <div className="max-w-2xl mx-auto mb-20">
          <div className="bg-white rounded-2xl border-2 border-dashed border-gray-300 p-12 text-center">
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <FileText className="w-10 h-10 text-gray-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Upload Your Legal Document</h3>
            <p className="text-gray-600 mb-8">
              Upload contracts, agreements, terms of service, or any legal document you need help understanding
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <Button size="lg" className="bg-black hover:bg-gray-800 text-white px-8" asChild>
                <Link href="/upload">
                  <FileText className="w-5 h-5 mr-2" />
                  Choose File
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="px-8 bg-transparent" asChild>
                <Link href="/paste">Paste Text</Link>
              </Button>
            </div>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <Shield className="w-4 h-4" />
              <span>Your documents are processed securely and privately</span>
            </div>
            <p className="text-xs text-gray-400 mt-2">Supported formats: PDF, DOC, DOCX, TXT (Max 10MB)</p>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FileText className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Smart Summaries</h3>
            <p className="text-gray-600 leading-relaxed">
              Get concise, plain-English summaries of complex legal documents
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-8 h-8 text-yellow-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Risk Analysis</h3>
            <p className="text-gray-600 leading-relaxed">
              Identify potentially problematic clauses and understand their implications
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <MessageCircle className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Interactive Q&A</h3>
            <p className="text-gray-600 leading-relaxed">Ask specific questions about any part of your document</p>
          </div>
        </div>

        {/* Privacy Section */}
        <div className="bg-white rounded-2xl p-8 mb-16">
          <h3 className="text-2xl font-semibold text-gray-900 text-center mb-8">Your Privacy Matters</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-orange-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">End-to-end encryption</h4>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Auto-delete after 24hrs</h4>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserX className="w-6 h-6 text-orange-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">No human access</h4>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                  <Scale className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold text-gray-900">LegalClarify AI</span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Making legal documents accessible to everyone through AI-powered analysis.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Features</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <Link href="/analysis" className="hover:text-gray-900 transition-colors">
                    Document Analysis
                  </Link>
                </li>
                <li>
                  <Link href="/risk" className="hover:text-gray-900 transition-colors">
                    Risk Assessment
                  </Link>
                </li>
                <li>
                  <Link href="/summaries" className="hover:text-gray-900 transition-colors">
                    Plain English Summaries
                  </Link>
                </li>
                <li>
                  <Link href="/chat" className="hover:text-gray-900 transition-colors">
                    Interactive Q&A
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Privacy & Security</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <Link href="/privacy" className="hover:text-gray-900 transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-gray-900 transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/security" className="hover:text-gray-900 transition-colors">
                    Security Practices
                  </Link>
                </li>
                <li>
                  <Link href="/data" className="hover:text-gray-900 transition-colors">
                    Data Retention
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <Link href="/help" className="hover:text-gray-900 transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-gray-900 transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/legal" className="hover:text-gray-900 transition-colors">
                    Legal Disclaimer
                  </Link>
                </li>
                <li>
                  <Link href="/feedback" className="hover:text-gray-900 transition-colors">
                    Feedback
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm text-gray-500">
            <p>
              &copy; 2024 LegalClarify AI. This tool provides AI-generated analysis and should not replace professional
              legal advice.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
