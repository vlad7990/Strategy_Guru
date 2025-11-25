"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, FileText, Loader2, CheckCircle2, AlertCircle, X } from "lucide-react";
import { aiApi, type ObjectiveSuggestion } from "@/lib/api";

interface DocumentUploadOKRProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAccept: (objectives: ObjectiveSuggestion[]) => void;
}

export function DocumentUploadOKR({ open, onOpenChange, onAccept }: DocumentUploadOKRProps) {
  const [file, setFile] = useState<File | null>(null);
  const [documentText, setDocumentText] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'upload' | 'processing' | 'results'>('upload');
  const [suggestions, setSuggestions] = useState<ObjectiveSuggestion[]>([]);
  const [analysis, setAnalysis] = useState("");
  const [error, setError] = useState("");

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setError("");

    // Read file content
    try {
      const text = await readFileContent(selectedFile);
      setDocumentText(text);
    } catch (err) {
      setError("Failed to read file. Please try a different file.");
    }
  };

  const readFileContent = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        const text = e.target?.result as string;
        resolve(text);
      };

      reader.onerror = () => {
        reject(new Error("Failed to read file"));
      };

      // Read as text
      reader.readAsText(file);
    });
  };

  const handleGenerate = async () => {
    if (!documentText.trim()) {
      setError("No content found in document");
      return;
    }

    setLoading(true);
    setError("");
    setStep('processing');

    try {
      const response = await aiApi.generateFromDocument(documentText);

      if (response.success && response.data) {
        setSuggestions(response.data.objectives);
        setAnalysis(response.data.analysis);
        setStep('results');
      } else {
        setError(response.error?.message || "Failed to generate OKRs from document");
        setStep('upload');
      }
    } catch (err: any) {
      setError(err.message || "An error occurred");
      setStep('upload');
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = () => {
    onAccept(suggestions);
    handleClose();
  };

  const handleClose = () => {
    setFile(null);
    setDocumentText("");
    setStep('upload');
    setSuggestions([]);
    setAnalysis("");
    setError("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5 text-blue-600" />
            Generate OKRs from Strategy Document
          </DialogTitle>
          <DialogDescription>
            Upload your strategy document and let AI extract structured OKRs with measurable value drivers
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Upload Step */}
          {step === 'upload' && (
            <>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                <label htmlFor="file-upload" className="cursor-pointer">
                  <div className="flex flex-col items-center gap-3">
                    <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
                      <Upload className="h-8 w-8 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {file ? file.name : "Click to upload document"}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Supports: .txt, .md, .doc, .docx (text-based documents)
                      </p>
                    </div>
                    {file && (
                      <div className="flex items-center gap-2 text-sm text-green-600">
                        <CheckCircle2 className="h-4 w-4" />
                        File loaded successfully
                      </div>
                    )}
                  </div>
                  <input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    accept=".txt,.md,.doc,.docx,text/*"
                    onChange={handleFileSelect}
                  />
                </label>
              </div>

              {file && documentText && (
                <Card className="bg-gray-50">
                  <CardContent className="pt-4">
                    <div className="flex items-start gap-2 mb-2">
                      <FileText className="h-4 w-4 text-gray-600 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">Document Preview</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {documentText.length} characters • {documentText.split(/\s+/).length} words
                        </p>
                      </div>
                    </div>
                    <div className="bg-white border border-gray-200 rounded p-3 mt-2 max-h-[200px] overflow-y-auto">
                      <p className="text-xs text-gray-700 whitespace-pre-wrap">
                        {documentText.slice(0, 500)}...
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-md p-3 flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              )}

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={handleClose}>
                  Cancel
                </Button>
                <Button
                  onClick={handleGenerate}
                  disabled={!file || !documentText || loading}
                  className="gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4" />
                      Generate OKRs
                    </>
                  )}
                </Button>
              </div>
            </>
          )}

          {/* Processing Step */}
          {step === 'processing' && (
            <div className="flex flex-col items-center justify-center py-12 gap-4">
              <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
              <div className="text-center">
                <p className="text-lg font-semibold text-gray-900">Analyzing your strategy document...</p>
                <p className="text-sm text-gray-500 mt-2">
                  AI is extracting key strategic objectives and creating measurable value drivers
                </p>
              </div>
            </div>
          )}

          {/* Results Step */}
          {step === 'results' && (
            <div className="space-y-4">
              {/* Analysis */}
              {analysis && (
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="pt-4">
                    <p className="text-sm font-medium text-gray-900 mb-2">📊 Strategic Analysis</p>
                    <p className="text-sm text-gray-700">{analysis}</p>
                  </CardContent>
                </Card>
              )}

              {/* Extracted OKRs */}
              <div>
                <p className="text-sm font-semibold text-gray-900 mb-3">
                  Extracted {suggestions.length} Strategic Objectives
                </p>
                <div className="space-y-3">
                  {suggestions.map((objective, index) => (
                    <Card key={index} className="border-blue-200">
                      <CardContent className="pt-4">
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <p className="font-semibold text-gray-900">{objective.title}</p>
                            <p className="text-sm text-gray-600 mt-1">{objective.description}</p>
                            <div className="mt-2 space-y-1">
                              {objective.valueDrivers.map((vd, vdIndex) => (
                                <p key={vdIndex} className="text-xs text-gray-600 pl-4 border-l-2 border-gray-300">
                                  • {vd.description} ({vd.targetValue} {vd.unit})
                                </p>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button variant="outline" onClick={() => setStep('upload')}>
                  Back
                </Button>
                <Button onClick={handleAccept} className="gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  Accept & Create OKRs
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
