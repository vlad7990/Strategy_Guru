/**
 * Story Engine - Main Orchestrator
 * Coordinates all 10 AI agents in the proper pipeline
 *
 * Pipeline Flow:
 * Writer → Critic → Age Adapter → Safety → Editor →
 * Metadata → Moral Architecture → Memory → Voice → Education
 */

import { WriterAgent } from './agents/WriterAgent';
import { CriticAgent } from './agents/CriticAgent';
import { AgeAdapterAgent } from './agents/AgeAdapterAgent';
import { SafetyAgent } from './agents/SafetyAgent';
import { EditorAgent } from './agents/EditorAgent';
import { MetadataAgent } from './agents/MetadataAgent';
import { MoralArchitectureAgent } from './agents/MoralArchitectureAgent';
import { MemoryAgent } from './agents/MemoryAgent';
import { VoiceEngine } from './agents/VoiceEngine';
import { EducationMapper } from './agents/EducationMapper';

import {
  StoryRequest,
  CompleteStoryOutput,
  AgentContext,
} from './types';

export class StoryEngine {
  private writerAgent: WriterAgent;
  private criticAgent: CriticAgent;
  private ageAdapterAgent: AgeAdapterAgent;
  private safetyAgent: SafetyAgent;
  private editorAgent: EditorAgent;
  private metadataAgent: MetadataAgent;
  private moralArchitectureAgent: MoralArchitectureAgent;
  private memoryAgent: MemoryAgent;
  private voiceEngine: VoiceEngine;
  private educationMapper: EducationMapper;

  constructor() {
    // Initialize all agents
    this.writerAgent = new WriterAgent();
    this.criticAgent = new CriticAgent();
    this.ageAdapterAgent = new AgeAdapterAgent();
    this.safetyAgent = new SafetyAgent();
    this.editorAgent = new EditorAgent();
    this.metadataAgent = new MetadataAgent();
    this.moralArchitectureAgent = new MoralArchitectureAgent();
    this.memoryAgent = new MemoryAgent();
    this.voiceEngine = new VoiceEngine();
    this.educationMapper = new EducationMapper();
  }

  /**
   * Main execution method - runs the complete pipeline
   */
  async generateStory(
    request: StoryRequest,
    context: AgentContext
  ): Promise<CompleteStoryOutput> {
    console.log('🎨 Starting Story Generation Pipeline...');
    console.log(`   Age Range: ${request.ageRange}`);
    console.log(`   Prompt: ${request.prompt.substring(0, 60)}...`);

    try {
      // STEP 1: Writer Agent - Generate initial draft
      console.log('\n📝 Step 1: Writer Agent - Generating story draft...');
      const draft = await this.writerAgent.execute(request, context);
      console.log(`   ✓ Generated ${draft.scenes.length} scenes, ${draft.wordCount} words`);

      // STEP 2: Critic Agent - Review and provide feedback
      console.log('\n🎭 Step 2: Critic Agent - Reviewing draft...');
      const critique = await this.criticAgent.execute(draft, request, context);
      console.log(`   ✓ Overall Score: ${critique.overallScore}/100`);
      console.log(`   ✓ Suggestions: ${critique.suggestions.length}`);

      // STEP 3: Age Adapter Agent - Adapt for age appropriateness
      console.log('\n👶 Step 3: Age Adapter - Adapting for age range...');
      const adaptation = await this.ageAdapterAgent.execute(draft, request, critique);
      console.log(`   ✓ Adaptations made: ${adaptation.modifications.length}`);
      console.log(`   ✓ Vocabulary Level: ${adaptation.vocabularyLevel}`);

      // STEP 4: Safety Agent - Ensure child safety
      console.log('\n🛡️  Step 4: Safety Agent - Safety review...');
      const safetyReview = await this.safetyAgent.execute(
        { ...draft, scenes: adaptation.adaptedContent },
        request,
        context
      );
      console.log(`   ✓ Safety Score: ${safetyReview.safetyScore}/100`);
      console.log(`   ✓ Certification: ${safetyReview.certificationLevel}`);
      console.log(`   ✓ Approved: ${safetyReview.approved ? 'YES' : 'NO'}`);

      // If safety check fails, reject the story
      if (!safetyReview.approved) {
        console.error('   ❌ SAFETY CHECK FAILED - Story rejected');
        throw new Error(`Safety check failed: ${safetyReview.issues.map(i => i.issue).join(', ')}`);
      }

      // STEP 5: Editor Agent - Polish to publication quality
      console.log('\n✨ Step 5: Editor - Polishing prose...');
      const polishedStory = await this.editorAgent.execute(adaptation);
      console.log(`   ✓ Refinements: ${polishedStory.refinements.length}`);
      console.log(`   ✓ Final Word Count: ${polishedStory.finalWordCount}`);
      console.log(`   ✓ Readability: Grade ${polishedStory.readabilityScore}`);

      // STEP 6: Metadata Agent - Generate publication metadata
      console.log('\n📋 Step 6: Metadata - Generating metadata...');
      const metadata = await this.metadataAgent.execute(polishedStory, request);
      console.log(`   ✓ Themes: ${metadata.themes.join(', ')}`);
      console.log(`   ✓ Lessons: ${metadata.lessonsTaught.join(', ')}`);

      // STEP 7: Moral Architecture Agent - Create moral maps & emotion graphs
      console.log('\n💝 Step 7: Moral Architecture - Creating moral map...');
      const { moralArchitecture, emotionGraph } = await this.moralArchitectureAgent.execute(
        polishedStory,
        request,
        context
      );
      console.log(`   ✓ Primary Lesson: ${moralArchitecture.primaryLesson}`);
      console.log(`   ✓ Emotional Arc: ${emotionGraph.emotionalArc}`);
      console.log(`   ✓ Peak Intensity: ${emotionGraph.peakIntensity}/10`);
      console.log(`   ✓ Comfort Floor: ${emotionGraph.comfortFloor}/10`);

      // STEP 8: Memory Agent - Update character/world memories
      console.log('\n🧠 Step 8: Memory - Updating continuity...');
      const memoryUpdates = await this.memoryAgent.execute(polishedStory, context);
      console.log(`   ✓ Character Memories: ${memoryUpdates.characterMemories.length}`);
      console.log(`   ✓ World Updates: ${memoryUpdates.worldUpdates.length}`);
      console.log(`   ✓ Relationship Changes: ${memoryUpdates.relationshipChanges.length}`);

      // STEP 9: Voice Engine - Generate narration mapping
      console.log('\n🎙️  Step 9: Voice Engine - Creating narration...');
      const voiceMapping = await this.voiceEngine.execute(polishedStory, request);
      console.log(`   ✓ Mode: ${voiceMapping.narrationMode}`);
      console.log(`   ✓ Segments: ${voiceMapping.segments.length}`);
      console.log(`   ✓ Estimated Duration: ${Math.floor(voiceMapping.totalDuration / 60)} min`);

      // STEP 10: Education Mapper - Map to educational standards
      console.log('\n🎓 Step 10: Education Mapper - Mapping standards...');
      const educationalMapping = await this.educationMapper.execute(
        polishedStory,
        moralArchitecture,
        request
      );
      console.log(`   ✓ SEL Standards: ${educationalMapping.selStandards.length}`);
      console.log(`   ✓ CCSS Standards: ${educationalMapping.ccssLiteracy.length}`);
      console.log(`   ✓ Grade Levels: ${educationalMapping.gradeLevel.join(', ')}`);

      // Compile complete output
      const output: CompleteStoryOutput = {
        story: polishedStory,
        metadata,
        moralArchitecture,
        emotionGraph,
        memoryUpdates,
        voiceMapping,
        educationalMapping,
        safetyCertification: safetyReview,
      };

      console.log('\n✅ Story Generation Complete!');
      console.log(`   📖 Title: ${draft.outline.title}`);
      console.log(`   📄 Pages: ${polishedStory.scenes.length}`);
      console.log(`   📝 Words: ${polishedStory.finalWordCount}`);
      console.log(`   ⏱️  Read Time: ~${draft.outline.estimatedReadTime} minutes`);
      console.log(`   🏅 Safety: ${safetyReview.certificationLevel} (${safetyReview.safetyScore}/100)`);

      return output;
    } catch (error: any) {
      console.error('\n❌ Story Generation Failed:', error.message);
      throw error;
    }
  }

  /**
   * Quick story generation (skips some optional steps for faster results)
   */
  async generateQuickStory(
    request: StoryRequest,
    context: AgentContext
  ): Promise<CompleteStoryOutput> {
    console.log('⚡ Quick Story Mode - Streamlined Pipeline');

    // Run core agents only
    const draft = await this.writerAgent.execute(request, context);
    const critique = await this.criticAgent.execute(draft, request, context);
    const adaptation = await this.ageAdapterAgent.execute(draft, request, critique);
    const safetyReview = await this.safetyAgent.execute(
      { ...draft, scenes: adaptation.adaptedContent },
      request,
      context
    );

    if (!safetyReview.approved) {
      throw new Error('Safety check failed');
    }

    const polishedStory = await this.editorAgent.execute(adaptation);

    // Generate minimal required data
    const metadata = await this.metadataAgent.execute(polishedStory, request);
    const { moralArchitecture, emotionGraph } = await this.moralArchitectureAgent.execute(
      polishedStory,
      request,
      context
    );

    return {
      story: polishedStory,
      metadata,
      moralArchitecture,
      emotionGraph,
      memoryUpdates: { characterMemories: [], worldUpdates: [], relationshipChanges: [] },
      voiceMapping: { narrationMode: 'standard', language: 'en-US', segments: [], totalDuration: 0 },
      educationalMapping: {
        selStandards: [],
        ccssLiteracy: [],
        gradeLevel: [],
        readingLevel: '',
        comprehensionLevel: 'literal',
        vocabularyTier: 1,
        literaryDevices: [],
        discussionTopics: [],
        assessmentIdeas: [],
      },
      safetyCertification: safetyReview,
    };
  }
}
