"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  FileText,
  Search,
  Filter,
  MoreVertical,
  Download,
  Share2,
  Trash2,
  Eye,
  MessageSquare,
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle,
  Plus,
} from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/header"

interface Document {
  id: string
  name: string
  type: string
  uploadDate: Date
  status: "analyzed" | "processing" | "failed"
  riskLevel: "high" | "medium" | "low"
  size: string
  summary: string
}

const mockDocuments: Document[] = [
  {
    id: "1",
    name: "Rental Agreement - Downtown Apartment.pdf",
    type: "Rental Agreement",
    uploadDate: new Date("2024-01-15"),
    status: "analyzed",
    riskLevel: "medium",
    size: "2.4 MB",
    summary: "12-month lease with automatic renewal clause and maintenance responsibilities",
  },
  {
    id: "2",
    name: "Employment Contract - TechCorp.docx",
    type: "Employment Contract",
    uploadDate: new Date("2024-01-10"),
    status: "analyzed",
    riskLevel: "low",
    size: "1.8 MB",
    summary: "Standard employment terms with competitive benefits and reasonable non-compete",
  },
  {
    id: "3",
    name: "Loan Agreement - Personal Loan.pdf",
    type: "Loan Agreement",
    uploadDate: new Date("2024-01-08"),
    status: "analyzed",
    riskLevel: "high",
    size: "3.1 MB",
    summary: "High interest rate with strict penalty clauses and collateral requirements",
  },
  {
    id: "4",
    name: "Service Agreement - Web Development.pdf",
    type: "Service Agreement",
    uploadDate: new Date("2024-01-05"),
    status: "processing",
    riskLevel: "medium",
    size: "1.2 MB",
    summary: "Currently being analyzed...",
  },
]

export default function DashboardPage() {
  const [documents, setDocuments] = useState<Document[]>(mockDocuments)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<"all" | "analyzed" | "processing" | "failed">("all")
  const [filterRisk, setFilterRisk] = useState<"all" | "high" | "medium" | "low">("all")

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.type.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || doc.status === filterStatus
    const matchesRisk = filterRisk === "all" || doc.riskLevel === filterRisk

    return matchesSearch && matchesStatus && matchesRisk
  })

  const getRiskColor = (level: string) => {
    switch (level) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "analyzed":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "processing":
        return <Clock className="w-4 h-4 text-yellow-500 animate-pulse" />
      case "failed":
        return <AlertTriangle className="w-4 h-4 text-red-500" />
      default:
        return <FileText className="w-4 h-4" />
    }
  }

  const handleDeleteDocument = (id: string) => {
    setDocuments((prev) => prev.filter((doc) => doc.id !== id))
  }

  const getDocumentStats = () => {
    const total = documents.length
    const analyzed = documents.filter((d) => d.status === "analyzed").length
    const highRisk = documents.filter((d) => d.riskLevel === "high" && d.status === "analyzed").length

    return { total, analyzed, highRisk }
  }

  const stats = getDocumentStats()

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Document Dashboard</h1>
          <p className="text-xl text-gray-600">Manage and review your analyzed legal documents</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white border border-gray-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-500">Total Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold text-gray-900">{stats.total}</span>
                <FileText className="w-5 h-5 text-gray-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border border-gray-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-500">Analyzed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold text-gray-900">{stats.analyzed}</span>
                <CheckCircle className="w-5 h-5 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border border-gray-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-500">High Risk</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold text-gray-900">{stats.highRisk}</span>
                <AlertTriangle className="w-5 h-5 text-red-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6 bg-white border border-gray-200">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search documents..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-gray-300"
                />
              </div>

              <div className="flex gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="border-gray-300 bg-transparent">
                      <Filter className="w-4 h-4 mr-2" />
                      Status: {filterStatus === "all" ? "All" : filterStatus}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setFilterStatus("all")}>All Status</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilterStatus("analyzed")}>Analyzed</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilterStatus("processing")}>Processing</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilterStatus("failed")}>Failed</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="border-gray-300 bg-transparent">
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      Risk: {filterRisk === "all" ? "All" : filterRisk}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setFilterRisk("all")}>All Risk Levels</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilterRisk("high")}>High Risk</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilterRisk("medium")}>Medium Risk</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilterRisk("low")}>Low Risk</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Documents List */}
        <Tabs defaultValue="grid" className="space-y-6">
          <TabsList className="bg-white border border-gray-200">
            <TabsTrigger value="grid">Grid View</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
          </TabsList>

          <TabsContent value="grid" className="space-y-6">
            {filteredDocuments.length === 0 ? (
              <Card className="bg-white border border-gray-200">
                <CardContent className="text-center py-12">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">No documents found</h3>
                  <p className="text-gray-600 mb-4">
                    {searchTerm || filterStatus !== "all" || filterRisk !== "all"
                      ? "Try adjusting your search or filters"
                      : "Upload your first legal document to get started"}
                  </p>
                  <Button asChild className="bg-black hover:bg-gray-800">
                    <Link href="/upload">
                      <Plus className="w-4 h-4 mr-2" />
                      Upload Document
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDocuments.map((doc) => (
                  <Card key={doc.id} className="hover:shadow-lg transition-shadow bg-white border border-gray-200">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(doc.status)}
                          <Badge variant="outline" className="text-xs border-gray-300">
                            {doc.type}
                          </Badge>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link href={`/analysis?file=${encodeURIComponent(doc.name)}`}>
                                <Eye className="w-4 h-4 mr-2" />
                                View Analysis
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/chat?doc=${doc.id}`}>
                                <MessageSquare className="w-4 h-4 mr-2" />
                                Ask Questions
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="w-4 h-4 mr-2" />
                              Download Report
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Share2 className="w-4 h-4 mr-2" />
                              Share
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteDocument(doc.id)}>
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <CardTitle className="text-lg font-semibold line-clamp-2 text-gray-900">{doc.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Badge className={`text-xs ${getRiskColor(doc.riskLevel)}`}>
                          {doc.riskLevel.toUpperCase()} RISK
                        </Badge>
                        <span className="text-xs text-gray-500">{doc.size}</span>
                      </div>

                      <p className="text-sm text-gray-600 line-clamp-2">{doc.summary}</p>

                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Calendar className="w-3 h-3" />
                        <span>Uploaded {doc.uploadDate.toLocaleDateString()}</span>
                      </div>

                      {doc.status === "analyzed" && (
                        <div className="flex gap-2">
                          <Button size="sm" className="flex-1 bg-black hover:bg-gray-800" asChild>
                            <Link href={`/analysis?file=${encodeURIComponent(doc.name)}`}>View Analysis</Link>
                          </Button>
                          <Button size="sm" variant="outline" className="border-gray-300 bg-transparent" asChild>
                            <Link href={`/chat?doc=${doc.id}`}>
                              <MessageSquare className="w-4 h-4" />
                            </Link>
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="list" className="space-y-4">
            {filteredDocuments.length === 0 ? (
              <Card className="bg-white border border-gray-200">
                <CardContent className="text-center py-12">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">No documents found</h3>
                  <p className="text-gray-600 mb-4">
                    {searchTerm || filterStatus !== "all" || filterRisk !== "all"
                      ? "Try adjusting your search or filters"
                      : "Upload your first legal document to get started"}
                  </p>
                  <Button asChild className="bg-black hover:bg-gray-800">
                    <Link href="/upload">
                      <Plus className="w-4 h-4 mr-2" />
                      Upload Document
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-white border border-gray-200">
                <CardContent className="p-0">
                  <div className="divide-y divide-border">
                    {filteredDocuments.map((doc) => (
                      <div key={doc.id} className="p-4 hover:bg-muted/50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 flex-1">
                            <div className="flex items-center gap-2">
                              {getStatusIcon(doc.status)}
                              <FileText className="w-5 h-5 text-gray-400" />
                            </div>

                            <div className="flex-1 min-w-0">
                              <h3 className="font-medium truncate text-gray-900">{doc.name}</h3>
                              <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                                <span>{doc.type}</span>
                                <span>{doc.size}</span>
                                <span>Uploaded {doc.uploadDate.toLocaleDateString()}</span>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <Badge className={`text-xs ${getRiskColor(doc.riskLevel)}`}>
                                {doc.riskLevel.toUpperCase()}
                              </Badge>
                              <Badge variant="outline" className="text-xs border-gray-300">
                                {doc.status}
                              </Badge>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 ml-4">
                            {doc.status === "analyzed" && (
                              <>
                                <Button size="sm" variant="outline" className="border-gray-300 bg-transparent" asChild>
                                  <Link href={`/analysis?file=${encodeURIComponent(doc.name)}`}>View Analysis</Link>
                                </Button>
                                <Button size="sm" variant="outline" className="border-gray-300 bg-transparent" asChild>
                                  <Link href={`/chat?doc=${doc.id}`}>
                                    <MessageSquare className="w-4 h-4" />
                                  </Link>
                                </Button>
                              </>
                            )}

                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreVertical className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Download className="w-4 h-4 mr-2" />
                                  Download Report
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Share2 className="w-4 h-4 mr-2" />
                                  Share
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteDocument(doc.id)}>
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
