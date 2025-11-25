/**
 * API Module - Exports all API clients
 * Centralized access to all backend API endpoints
 */

export { apiClient, type ApiResponse } from './client';
export { objectivesApi } from './objectives';
export { metricsApi } from './metrics';
export { feedbackApi } from './feedback';
export { competitorsApi } from './competitors';
export { roadmapApi } from './roadmap';
export { reportsApi } from './reports';
export { projectsApi } from './projects';
export { alertsApi } from './alerts';
export { aiApi, type ObjectiveSuggestion, type KeyResultSuggestion, type OKRGenerationResponse, type ChatMessage } from './ai';
