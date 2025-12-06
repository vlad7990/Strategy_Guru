/**
 * AI Children's Story Publishing Platform
 * Multi-Agent Story Engine - Type Definitions
 */

export interface StoryRequest {
  // User Inputs
  prompt: string; // User's story idea
  ageRange: '3-5' | '6-8' | '9-12';
  genre?: string[];
  themes?: string[];
  childId?: string; // For personalization
  worldId?: string; // For universe continuity
  characterIds?: string[]; // Use existing characters

  // Parent Controls
  anxietyLevel?: number; // 1-10 from parent settings
  contentFilterLevel?: 'strict' | 'moderate' | 'relaxed';
  educationalFocus?: string[];

  // Story Parameters
  length?: 'short' | 'medium' | 'long'; // Affects page count
  illustrationStyle?: 'soft_storybook' | 'watercolor' | 'cinematic' | 'brand_series';
  voiceMode?: 'bedtime' | 'excitement' | 'standard' | 'autism-friendly';
}

export interface StoryOutline {
  title: string;
  description: string;
  setting: string;
  characters: CharacterBrief[];
  plotPoints: PlotPoint[];
  moralLesson: string;
  emotionalArc: string;
  estimatedPages: number;
  estimatedReadTime: number; // minutes
}

export interface CharacterBrief {
  name: string;
  role: 'protagonist' | 'sidekick' | 'antagonist' | 'mentor' | 'supporting';
  description: string;
  personality: string[];
  appearance: string;
  existingCharacterId?: string; // If using saved character
}

export interface PlotPoint {
  sceneNumber: number;
  title: string;
  description: string;
  emotionalTone: 'gentle' | 'exciting' | 'calm' | 'adventurous' | 'mysterious';
  emotionalIntensity: number; // 1-10
  purpose: string; // What this scene accomplishes
}

export interface StoryDraft {
  outline: StoryOutline;
  scenes: SceneDraft[];
  wordCount: number;
  pageCount: number;
}

export interface SceneDraft {
  sceneNumber: number;
  title: string;
  content: string; // Full narrative text
  narrativeTone: string;
  emotionalLevel: number;
  pageNumber: number;
  imagePrompt: string; // For AI image generation
  characterActions: Record<string, string>; // Character: action
}

export interface CriticFeedback {
  overallScore: number; // 1-100
  strengths: string[];
  weaknesses: string[];
  suggestions: ImprovementSuggestion[];
  pacing: {
    score: number;
    feedback: string;
  };
  characterDevelopment: {
    score: number;
    feedback: string;
  };
  emotionalImpact: {
    score: number;
    feedback: string;
  };
  languageQuality: {
    score: number;
    feedback: string;
  };
  ageAppropriateness: {
    score: number;
    feedback: string;
  };
}

export interface ImprovementSuggestion {
  sceneNumber?: number;
  issue: string;
  suggestion: string;
  priority: 'high' | 'medium' | 'low';
}

export interface AgeAdaptation {
  adaptedContent: SceneDraft[];
  vocabularyLevel: string;
  sentenceComplexity: string;
  conceptLevel: string;
  modifications: AdaptationChange[];
}

export interface AdaptationChange {
  sceneNumber: number;
  type: 'vocabulary' | 'sentence_structure' | 'concept' | 'length';
  original: string;
  adapted: string;
  reason: string;
}

export interface SafetyReview {
  approved: boolean;
  safetyScore: number; // 0-100
  issues: SafetyIssue[];
  triggerWarnings: string[];
  recommendations: string[];
  certificationLevel: 'CCS-A' | 'CCS-B' | 'CCS-C' | 'CCS-Therapy' | 'REJECTED';
}

export interface SafetyIssue {
  severity: 'critical' | 'moderate' | 'minor';
  sceneNumber?: number;
  issue: string;
  description: string;
  resolution: string;
}

export interface PolishedStory {
  scenes: SceneDraft[];
  refinements: Refinement[];
  finalWordCount: number;
  readabilityScore: number;
}

export interface Refinement {
  sceneNumber: number;
  type: 'grammar' | 'flow' | 'imagery' | 'dialogue' | 'pacing';
  before: string;
  after: string;
}

export interface StoryMetadataGenerated {
  themes: string[];
  lessonsTaught: string[];
  emotionalJourney: string;
  culturalElements: string[];
  languageLevel: string;
  illustrationStyle: string;
  musicSuggestions: string[];
  parentNotes: string;
  teacherGuide: string;
  triggerWarnings: string[];
}

export interface MoralArchitectureGenerated {
  primaryLesson: string;
  secondaryLessons: string[];
  thematicGrowth: string;
  resolutionType: 'comfort' | 'triumph' | 'understanding';
  parentActivities: ParentActivity[];
  valueTags: string[];
  culturalValues: string[];
  conflictType: string;
  resolutionMethod: string;
}

export interface ParentActivity {
  title: string;
  description: string;
  ageAppropriate: string;
  materials?: string[];
  discussionPrompts: string[];
}

export interface EmotionGraphGenerated {
  overallIntensity: number;
  peakIntensity: number;
  comfortFloor: number;
  emotionalArc: 'rising' | 'falling' | 'wave' | 'steady';
  primaryEmotion: string;
  secondaryEmotions: string[];
  comfortBands: ComfortBand[];
  calmingPoints: CalmingPoint[];
  excitementPoints: ExcitementPoint[];
  nodes: EmotionNodeData[];
}

export interface ComfortBand {
  ageRange: string;
  minIntensity: number;
  maxIntensity: number;
  description: string;
}

export interface CalmingPoint {
  sceneNumber: number;
  technique: string;
  description: string;
}

export interface ExcitementPoint {
  sceneNumber: number;
  type: string;
  intensity: number;
}

export interface EmotionNodeData {
  sceneNumber: number;
  intensity: number;
  emotionType: 'joy' | 'fear' | 'sadness' | 'excitement' | 'calm' | 'wonder' | 'courage';
  comfortLevel: number;
  purpose: string;
}

export interface MemoryUpdate {
  characterMemories: CharacterMemoryEntry[];
  worldUpdates: WorldUpdate[];
  relationshipChanges: RelationshipChange[];
}

export interface CharacterMemoryEntry {
  characterId: string;
  characterName: string;
  memoryType: 'event' | 'emotion' | 'relationship' | 'victory' | 'fear';
  content: string;
  emotionalImpact: string;
  significance: number; // 1-10
}

export interface WorldUpdate {
  worldId?: string;
  updateType: 'location' | 'rule' | 'culture' | 'history';
  content: string;
  significance: number;
}

export interface RelationshipChange {
  character1: string;
  character2: string;
  changeType: 'formed' | 'strengthened' | 'tested' | 'resolved';
  description: string;
}

export interface VoiceMapping {
  narrationMode: string;
  language: string;
  segments: VoiceSegmentData[];
  totalDuration: number; // estimated seconds
}

export interface VoiceSegmentData {
  sceneNumber: number;
  text: string;
  ssml: string; // SSML markup for emotional pacing
  pitch: 'high' | 'medium' | 'low';
  pace: 'slow' | 'moderate' | 'fast';
  emotionalTone: string;
  pauseBefore: number; // milliseconds
  pauseAfter: number;
  ambientSound?: string;
}

export interface EducationalStandardsMapping {
  selStandards: SELStandard[];
  ccssLiteracy: CCSSCode[];
  gradeLevel: string[];
  readingLevel: string; // Lexile measure
  comprehensionLevel: 'literal' | 'inferential' | 'evaluative';
  vocabularyTier: 1 | 2 | 3;
  literaryDevices: string[];
  discussionTopics: string[];
  assessmentIdeas: AssessmentIdea[];
}

export interface SELStandard {
  code: string;
  description: string;
  sceneReferences: number[];
}

export interface CCSSCode {
  code: string;
  description: string;
  application: string;
}

export interface AssessmentIdea {
  type: 'comprehension' | 'vocabulary' | 'critical_thinking' | 'creative';
  question: string;
  expectedResponse: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface CompleteStoryOutput {
  // Story Content
  story: PolishedStory;
  metadata: StoryMetadataGenerated;

  // Moral & Emotional
  moralArchitecture: MoralArchitectureGenerated;
  emotionGraph: EmotionGraphGenerated;

  // Memory & Continuity
  memoryUpdates: MemoryUpdate;

  // Voice & Audio
  voiceMapping: VoiceMapping;

  // Education
  educationalMapping: EducationalStandardsMapping;

  // Safety
  safetyCertification: SafetyReview;

  // Database IDs (populated after save)
  storyId?: string;
  characterIds?: string[];
}

export interface AgentContext {
  userId: string;
  childId?: string;
  existingCharacters?: any[];
  existingWorld?: any;
  characterMemories?: any[];
  parentSettings?: {
    anxietyLevel: number;
    contentFilterLevel: string;
    educationalFocus: string[];
  };
}
