"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import {
  FileText,
  Shield,
  AlertTriangle,
  CheckCircle,
  MessageSquare,
  Download,
  Share2,
  ArrowLeft,
  Clock,
  DollarSign,
  Users,
  Calendar,
  Info,
  Scale,
  History,
  Lock,
} from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

interface RiskItem {
  level: "high" | "medium" | "low"
  title: string
  description: string
  clause: string
}

interface KeyTerm {
  term: string
  definition: string
  importance: "high" | "medium" | "low"
}

export default function AnalysisPage() {
  const searchParams = useSearchParams()
  const fileName = searchParams?.get("file") || "Legal Document"

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time for AI analysis
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  // Mock data - in real app this would come from AI analysis
  const summary = {
    documentType: "Rental Agreement",
    parties: ["John Smith (Tenant)", "ABC Property Management (Landlord)"],
    duration: "12 months",
    keyDates: ["Lease Start: January 1, 2024", "Lease End: December 31, 2024"],
    financialTerms: ["Monthly Rent: $2,500", "Security Deposit: $2,500", "Late Fee: $50"],
  }

  const risks: RiskItem[] = [
    {
      level: "high",
      title: "Automatic Renewal Clause",
      description: "The lease automatically renews for another full term unless 60 days notice is given.",
      clause: "Section 12.3: This lease shall automatically renew for successive periods...",
    },
    {
      level: "medium",
      title: "Maintenance Responsibility",
      description: "Tenant is responsible for all maintenance costs above $100.",
      clause: "Section 8.2: Tenant shall be responsible for maintenance and repairs...",
    },
    {
      level: "low",
      title: "Pet Policy Restrictions",
      description: "No pets allowed without written consent and additional deposit.",
      clause: "Section 15.1: No animals or pets shall be kept on the premises...",
    },
  ]

  const keyTerms: KeyTerm[] = [
    {
      term: "Joint and Several Liability",
      definition:
        "Each tenant is individually responsible for the full amount of rent and damages, not just their portion.",
      importance: "high",
    },
    {
      term: "Quiet Enjoyment",
      definition: "Your right to use the property without unreasonable interference from the landlord.",
      importance: "medium",
    },
    {
      term: "Holdover Tenancy",
      definition: "Continuing to occupy the property after the lease expires, which may create legal obligations.",
      importance: "medium",
    },
  ]

  const getRiskColor = (level: string) => {
    switch (level) {
      case "high":
        return "text-red-600 bg-red-50 border-red-200"
      case "medium":
        return "text-yellow-600 bg-yellow-50 border-yellow-200"
      case "low":
        return "text-green-600 bg-green-50 border-green-200"
      default:
        return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

  const getRiskIcon = (level: string) => {
    switch (level) {
      case "high":
        return <AlertTriangle className="w-4 h-4" />
      case "medium":
        return <Info className="w-4 h-4" />
      case "low":
        return <CheckCircle className="w-4 h-4" />
      default:
        return <Info className="w-4 h-4" />
    }
  }

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case "high":
        return "bg-primary text-primary-foreground"
      case "medium":
        return "bg-accent text-accent-foreground"
      case "low":
        return "bg-secondary text-secondary-foreground"
      default:
        return "bg-secondary text-secondary-foreground"
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <Scale className="w-10 h-10 text-gray-600 animate-pulse" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Analyzing Your Document</h2>
          <p className="text-gray-600">Our AI is processing your legal document...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link href="/" className="flex items-center gap-3">
                <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                  <Scale className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">LegalClarify AI</h1>
                  <p className="text-sm text-gray-600">Demystifying Legal Documents</p>
                </div>
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
                <History className="w-4 h-4 mr-2" />
                History
              </Button>
              <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
                <Lock className="w-4 h-4 mr-2" />
                Privacy
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" size="sm" asChild className="text-gray-600">
              <Link href="/upload">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Upload
              </Link>
            </Button>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 mb-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900 mb-2">{fileName}</h1>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>Analyzed 2 minutes ago</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FileText className="w-4 h-4" />
                    <span>{summary.documentType}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="text-gray-600 bg-transparent">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
                <Button variant="outline" size="sm" className="text-gray-600 bg-transparent">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>

            <Alert className="bg-blue-50 border-blue-200">
              <Shield className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-800">
                This analysis is for informational purposes only and does not constitute legal advice. Please consult
                with a qualified attorney for legal guidance.
              </AlertDescription>
            </Alert>
          </div>
        </div>

        <Tabs defaultValue="summary" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white border border-gray-200 rounded-lg p-1">
            <TabsTrigger value="summary" className="data-[state=active]:bg-gray-100">
              Summary
            </TabsTrigger>
            <TabsTrigger value="risks" className="data-[state=active]:bg-gray-100">
              Risk Analysis
            </TabsTrigger>
            <TabsTrigger value="terms" className="data-[state=active]:bg-gray-100">
              Key Terms
            </TabsTrigger>
            <TabsTrigger value="chat" className="data-[state=active]:bg-gray-100">
              Ask Questions
            </TabsTrigger>
          </TabsList>

          <TabsContent value="summary" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-white shadow-sm border-gray-200">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-gray-900">
                    <FileText className="w-5 h-5 text-gray-600" />
                    Document Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium text-sm mb-2 text-gray-900">Document Type</h4>
                    <p className="text-sm text-gray-600">{summary.documentType}</p>
                  </div>
                  <Separator className="bg-gray-200" />
                  <div>
                    <h4 className="font-medium text-sm mb-2 text-gray-900">Parties Involved</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {summary.parties.map((party, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <Users className="w-3 h-3" />
                          {party}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Separator className="bg-gray-200" />
                  <div>
                    <h4 className="font-medium text-sm mb-2 text-gray-900">Duration</h4>
                    <p className="text-sm text-gray-600 flex items-center gap-2">
                      <Calendar className="w-3 h-3" />
                      {summary.duration}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-sm border-gray-200">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-gray-900">
                    <DollarSign className="w-5 h-5 text-gray-600" />
                    Financial Terms
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {summary.financialTerms.map((term, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-900">{term.split(":")[0]}</span>
                      <span className="text-sm text-gray-600">{term.split(":")[1]}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            <Card className="bg-white shadow-sm border-gray-200">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <Calendar className="w-5 h-5 text-gray-600" />
                  Important Dates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {summary.keyDates.map((date, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
                      <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                      <span className="text-sm text-gray-900">{date}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="risks" className="space-y-6">
            <Card className="bg-white shadow-sm border-gray-200">
              <CardHeader className="pb-4">
                <CardTitle className="text-gray-900">Risk Assessment</CardTitle>
                <CardDescription className="text-gray-600">
                  Potential risks and unfavorable terms identified in your document
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {risks.map((risk, index) => (
                  <div key={index} className={`p-4 rounded-lg border ${getRiskColor(risk.level)}`}>
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">{getRiskIcon(risk.level)}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-medium text-sm">{risk.title}</h4>
                          <Badge variant="outline" className="text-xs">
                            {risk.level.toUpperCase()} RISK
                          </Badge>
                        </div>
                        <p className="text-sm mb-3">{risk.description}</p>
                        <div className="bg-white/50 p-3 rounded border text-xs font-mono">{risk.clause}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="terms" className="space-y-6">
            <Card className="bg-white shadow-sm border-gray-200">
              <CardHeader className="pb-4">
                <CardTitle className="text-gray-900">Key Terms Explained</CardTitle>
                <CardDescription className="text-gray-600">
                  Complex legal terms from your document translated into plain English
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {keyTerms.map((term, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-sm text-gray-900">{term.term}</h4>
                      <Badge className={`text-xs ${getImportanceColor(term.importance)}`}>
                        {term.importance.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{term.definition}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="chat" className="space-y-6">
            <Card className="bg-white shadow-sm border-gray-200">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <MessageSquare className="w-5 h-5 text-gray-600" />
                  Ask Questions About Your Document
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Get instant answers to specific questions about your legal document
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageSquare className="w-8 h-8 text-gray-600" />
                  </div>
                  <h3 className="text-lg font-medium mb-2 text-gray-900">Interactive Chat Coming Soon</h3>
                  <p className="text-gray-600 mb-4">
                    Ask specific questions about clauses, terms, and implications in your document
                  </p>
                  <Button asChild className="bg-black text-white hover:bg-gray-800">
                    <Link href="/chat">Start Chat Session</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
