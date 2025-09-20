import Link from "next/link"
import { Scale, History, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <Scale className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">LegalClarify AI</h1>
              <p className="text-sm text-gray-500 -mt-1">Demystifying Legal Documents</p>
            </div>
          </Link>

          {/* Navigation */}
          <div className="flex items-center gap-6">
            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
              <History className="w-4 h-4 mr-2" />
              History
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
              <Shield className="w-4 h-4 mr-2" />
              Privacy
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
