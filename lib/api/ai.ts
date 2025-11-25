import { apiClient, ApiResponse } from './client';

export interface ValueDriverSuggestion {
  description: string;
  targetValue: number;
  unit: string;
  rationale: string;
}

export interface ObjectiveSuggestion {
  title: string;
  description: string;
  category: string;
  quarter: string;
  year: number;
  valueDrivers: ValueDriverSuggestion[];
}

export interface OKRGenerationResponse {
  objectives: ObjectiveSuggestion[];
  analysis: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export const aiApi = {
  /**
   * Generate OKRs from text input
   */
  generateOKRs: async (
    input: string,
    context?: {
      industry?: string;
      companySize?: string;
      currentQuarter?: string;
      existingObjectives?: string[];
    }
  ): Promise<ApiResponse<OKRGenerationResponse>> => {
    return apiClient.post<OKRGenerationResponse>('/api/ai/generate-okrs', {
      input,
      context,
    });
  },

  /**
   * Generate OKRs from document text
   */
  generateFromDocument: async (
    documentText: string,
    context?: {
      industry?: string;
      companySize?: string;
    }
  ): Promise<ApiResponse<OKRGenerationResponse>> => {
    return apiClient.post<OKRGenerationResponse>('/api/ai/generate-from-document', {
      documentText,
      context,
    });
  },

  /**
   * Chat with AI Assistant
   */
  chat: async (
    messages: ChatMessage[],
    context?: string
  ): Promise<ApiResponse<{ message: string }>> => {
    return apiClient.post<{ message: string }>('/api/ai/chat', {
      messages,
      context,
    });
  },

  /**
   * Refine existing OKRs based on feedback
   */
  refineOKRs: async (
    existingOKRs: ObjectiveSuggestion[],
    feedback: string
  ): Promise<ApiResponse<OKRGenerationResponse>> => {
    return apiClient.post<OKRGenerationResponse>('/api/ai/refine-okrs', {
      existingOKRs,
      feedback,
    });
  },

  /**
   * Check AI service health
   */
  healthCheck: async (): Promise<ApiResponse<{
    status: string;
    model: string;
    message: string;
  }>> => {
    return apiClient.get('/api/ai/health');
  },
};
