"use client"

import type React from "react"
import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Upload, FileText, CheckCircle, AlertCircle, Loader2, X, Info } from "lucide-react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"

interface UploadedFile {
  file: File
  id: string
  progress: number
  status: "uploading" | "processing" | "completed" | "error"
  error?: string
}

export default function UploadPage() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [isDragOver, setIsDragOver] = useState(false)
  const router = useRouter()

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)

    const files = Array.from(e.dataTransfer.files)
    handleFiles(files)
  }, [])

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    handleFiles(files)
  }, [])

  const handleFiles = useCallback((files: File[]) => {
    const validFiles = files.filter((file) => {
      const validTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "text/plain",
      ]
      const maxSize = 10 * 1024 * 1024 // 10MB

      return validTypes.includes(file.type) && file.size <= maxSize
    })

    const newFiles: UploadedFile[] = validFiles.map((file) => ({
      file,
      id: Math.random().toString(36).substr(2, 9),
      progress: 0,
      status: "uploading",
    }))

    setUploadedFiles((prev) => [...prev, ...newFiles])

    // Simulate upload and processing
    newFiles.forEach((uploadedFile) => {
      simulateUpload(uploadedFile.id)
    })
  }, [])

  const simulateUpload = useCallback((fileId: string) => {
    // Simulate upload progress
    const uploadInterval = setInterval(() => {
      setUploadedFiles((prev) =>
        prev.map((file) => {
          if (file.id === fileId && file.status === "uploading") {
            const newProgress = Math.min(file.progress + Math.random() * 30, 100)

            if (newProgress >= 100) {
              clearInterval(uploadInterval)

              // Start processing after upload completes
              setTimeout(() => {
                setUploadedFiles((prev) =>
                  prev.map((f) => (f.id === fileId ? { ...f, status: "processing", progress: 0 } : f)),
                )

                // Simulate processing
                const processInterval = setInterval(() => {
                  setUploadedFiles((prev) =>
                    prev.map((f) => {
                      if (f.id === fileId && f.status === "processing") {
                        const newProgress = Math.min(f.progress + Math.random() * 25, 100)

                        if (newProgress >= 100) {
                          clearInterval(processInterval)
                          return { ...f, status: "completed", progress: 100 }
                        }

                        return { ...f, progress: newProgress }
                      }
                      return f
                    }),
                  )
                }, 500)
              }, 1000)

              return { ...file, progress: 100 }
            }

            return { ...file, progress: newProgress }
          }
          return file
        }),
      )
    }, 200)
  }, [])

  const removeFile = useCallback((fileId: string) => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== fileId))
  }, [])

  const analyzeDocument = useCallback(
    (fileId: string) => {
      const file = uploadedFiles.find((f) => f.id === fileId)
      if (file) {
        // Navigate to analysis page with file data
        router.push(`/analysis?file=${encodeURIComponent(file.file.name)}`)
      }
    },
    [uploadedFiles, router],
  )

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split(".").pop()?.toLowerCase()
    return <FileText className="w-5 h-5 text-primary" />
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 text-balance">Understand Legal Documents with AI</h1>
          <p className="text-xl text-gray-600 text-balance max-w-3xl mx-auto">
            Transform complex legal jargon into clear, actionable insights. Upload any contract, agreement, terms of
            service, or any legal document you need help understanding
          </p>
        </div>

        <div className="bg-white rounded-2xl border-2 border-dashed border-gray-200 p-16 text-center mb-8">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Upload className="w-8 h-8 text-gray-600" />
          </div>

          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Upload Your Legal Document</h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Upload contracts, agreements, terms of service, or any legal document you need help understanding
          </p>

          <div className="flex gap-4 justify-center mb-8">
            <input
              type="file"
              multiple
              accept=".pdf,.doc,.docx,.txt"
              onChange={handleFileSelect}
              className="hidden"
              id="file-upload"
            />
            <Button asChild className="bg-black hover:bg-gray-800 text-white px-8 py-3 rounded-lg font-medium">
              <label htmlFor="file-upload" className="cursor-pointer">
                <FileText className="w-4 h-4 mr-2" />
                Choose File
              </label>
            </Button>
            <Button
              variant="outline"
              className="border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-medium bg-transparent"
            >
              Paste Text
            </Button>
          </div>

          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <Info className="w-4 h-4" />
            <span>Your documents are processed securely and privately</span>
          </div>
          <p className="text-xs text-gray-400 mt-2">Supported formats: PDF, DOC, DOCX, TXT (Max 10MB)</p>
        </div>

        <div className="flex justify-center gap-16 mt-16">
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <FileText className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <AlertCircle className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Uploaded Files - keep existing functionality */}
        {uploadedFiles.length > 0 && (
          <div className="bg-white rounded-lg border border-gray-200 p-6 mt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Uploaded Documents</h3>
            <div className="space-y-4">
              {uploadedFiles.map((uploadedFile) => (
                <div key={uploadedFile.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      {getFileIcon(uploadedFile.file.name)}
                      <div>
                        <h4 className="font-medium text-sm text-gray-900">{uploadedFile.file.name}</h4>
                        <p className="text-xs text-gray-500">{formatFileSize(uploadedFile.file.size)}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {uploadedFile.status === "completed" && (
                        <Button
                          size="sm"
                          onClick={() => analyzeDocument(uploadedFile.id)}
                          className="text-xs bg-black hover:bg-gray-800"
                        >
                          Analyze Document
                        </Button>
                      )}

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(uploadedFile.id)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        {uploadedFile.status === "uploading" && (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
                            <span className="text-gray-600">Uploading...</span>
                          </>
                        )}
                        {uploadedFile.status === "processing" && (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin text-yellow-500" />
                            <span className="text-gray-600">Processing with AI...</span>
                          </>
                        )}
                        {uploadedFile.status === "completed" && (
                          <>
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span className="text-gray-600">Ready for analysis</span>
                          </>
                        )}
                        {uploadedFile.status === "error" && (
                          <>
                            <AlertCircle className="w-4 h-4 text-red-500" />
                            <span className="text-gray-600">Upload failed</span>
                          </>
                        )}
                      </div>
                      <span className="text-gray-500">{Math.round(uploadedFile.progress)}%</span>
                    </div>

                    <Progress value={uploadedFile.progress} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
