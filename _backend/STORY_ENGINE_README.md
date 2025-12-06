# AI Children's Story Publishing Platform - Story Engine

## 🎨 Overview

The **Story Engine** is a sophisticated multi-agent AI system designed to generate award-quality children's stories with built-in safety, educational value, and emotional intelligence.

## 🏗️ Architecture

### Multi-Agent Pipeline

The Story Engine coordinates **10 specialized AI agents** in a carefully orchestrated pipeline:

```
User Request
    ↓
1. Writer Agent          → Generates outline & draft
    ↓
2. Critic Agent          → Reviews & provides feedback
    ↓
3. Age Adapter Agent     → Adapts for age appropriateness
    ↓
4. Safety Agent          → Ensures child safety ⚠️
    ↓
5. Editor Agent          → Polishes to publication quality
    ↓
6. Metadata Agent        → Generates publication metadata
    ↓
7. Moral Architecture    → Creates moral maps & emotion graphs
    ↓
8. Memory Agent          → Updates character/world memories
    ↓
9. Voice Engine          → Generates SSML narration
    ↓
10. Education Mapper     → Maps to SEL & CCSS standards
    ↓
Complete Story Output
```

## 🤖 Agent Descriptions

### 1. Writer Agent
**Role**: Story Creation
**Responsibilities**:
- Generate story outline with plot structure
- Create engaging character briefs
- Write full scene-by-scene narrative
- Design image prompts for each scene
- Establish pacing and emotional tone

**Output**: Complete story draft with outline, scenes, and metadata

---

### 2. Critic Agent
**Role**: Quality Assurance
**Responsibilities**:
- Evaluate story quality across 5 dimensions
- Assess pacing, character development, emotional impact
- Provide constructive, actionable feedback
- Score age-appropriateness
- Identify areas for improvement

**Output**: Comprehensive critique with scores and suggestions

---

### 3. Age Adapter Agent
**Role**: Age Appropriateness
**Responsibilities**:
- Adapt vocabulary to age-specific levels
- Adjust sentence complexity
- Simplify or elaborate concepts
- Ensure emotional content fits age range
- Track all modifications made

**Age Ranges**:
- **3-5**: Simple sentences (5-8 words), concrete concepts, basic emotions
- **6-8**: Compound sentences (8-12 words), beginning abstractions
- **9-12**: Complex sentences (12-20 words), sophisticated themes

**Output**: Age-adapted content with modification logs

---

### 4. Safety Agent ⚠️
**Role**: Child Safety & Protection
**Responsibilities**:
- Ensure 100% child-safe content
- Identify triggers, fears, or inappropriate themes
- Verify comfort resolution in all stories
- Assign safety certification levels
- Consider parent anxiety settings

**Safety Checks**:
- ❌ NO violence, gore, or harm
- ❌ NO scary content without resolution
- ❌ NO inappropriate themes
- ❌ NO copyrighted characters
- ✅ MUST have comforting resolution
- ✅ MUST teach positive values

**Certification Levels**:
- `CCS-A`: Universal (all children)
- `CCS-B`: Sensitive children
- `CCS-C`: Therapeutic use
- `CCS-Therapy`: Clinical (therapist-guided)
- `REJECTED`: Unsafe, must be rewritten

**Output**: Safety review with score and certification

---

### 5. Editor Agent
**Role**: Publication Polish
**Responsibilities**:
- Enhance prose to publication quality
- Optimize imagery and sensory language
- Perfect dialogue and character voice
- Fix grammar, punctuation, style
- Calculate readability scores

**Editing Principles**:
- Show, don't tell
- Engage all senses
- Strong verbs, vivid adjectives
- Rhythm and cadence
- Consistency in voice

**Output**: Polished story with refinement notes

---

### 6. Metadata Agent
**Role**: Publishing & Discovery
**Responsibilities**:
- Extract themes and lessons
- Identify cultural elements
- Determine language complexity
- Suggest illustration styles
- Write parent notes and teacher guides

**Output**: Complete publication metadata

---

### 7. Moral Architecture Agent
**Role**: Values & Emotional Design
**Responsibilities**:
- Identify moral lessons and values
- Map character growth arcs
- Design parent activities
- Create emotion graphs with comfort bands
- Track emotional intensity throughout story

**Emotion Graph Features**:
- Peak intensity limits by age
- Comfort floor (minimum safety level)
- Calming points (soothing scenes)
- Excitement points (high-energy moments)
- Age-specific comfort bands

**Output**: Moral map + Emotion graph

---

### 8. Memory Agent
**Role**: Continuity & Universe Persistence
**Responsibilities**:
- Extract significant character memories
- Track emotional impacts on characters
- Update world state and history
- Monitor relationship developments
- Ensure continuity across stories

**Memory Types**:
- Events (what happened)
- Emotions (how they felt)
- Relationships (connections formed)
- Victories (accomplishments)
- Fears (what scares them)

**Output**: Memory updates for characters & worlds

---

### 9. Voice Engine
**Role**: Audio Narration
**Responsibilities**:
- Generate SSML markup for emotional pacing
- Design voice modulation (pitch, pace, volume)
- Add strategic pauses
- Suggest ambient sounds
- Adapt for narration modes

**Narration Modes**:
- **Bedtime**: Slow, calm, soothing
- **Excitement**: Fast, dynamic, energetic
- **Standard**: Moderate, clear, natural
- **Autism-Friendly**: Consistent, predictable

**Output**: Complete SSML mapping for TTS

---

### 10. Education Mapper
**Role**: Educational Standards Alignment
**Responsibilities**:
- Map to SEL standards (CASEL framework)
- Align with CCSS literacy standards
- Determine grade levels
- Assess reading complexity
- Create discussion topics and assessments

**Standards Coverage**:
- **SEL**: Social-Emotional Learning competencies
- **CCSS**: Common Core State Standards
- **Lexile**: Reading level measures
- **Vocabulary Tiers**: Academic word usage

**Output**: Educational mapping for teachers

---

## 📊 Complete Story Output

Each story generation produces:

```typescript
{
  // Story Content
  story: {
    scenes: [...],
    refinements: [...],
    finalWordCount: 850,
    readabilityScore: 2.5  // Grade level
  },

  // Publishing Data
  metadata: {
    themes: ["friendship", "courage"],
    lessonsTaught: ["kindness", "perseverance"],
    parentNotes: "...",
    teacherGuide: "..."
  },

  // Moral & Emotional
  moralArchitecture: {
    primaryLesson: "...",
    parentActivities: [...],
    valueTags: [...]
  },
  emotionGraph: {
    overallIntensity: 5,
    peakIntensity: 7,
    comfortFloor: 3,
    nodes: [...]
  },

  // Memory & Continuity
  memoryUpdates: {
    characterMemories: [...],
    worldUpdates: [...],
    relationshipChanges: [...]
  },

  // Voice & Audio
  voiceMapping: {
    segments: [...],  // SSML for each scene
    totalDuration: 420  // seconds
  },

  // Education
  educationalMapping: {
    selStandards: [...],
    ccssLiteracy: [...],
    assessmentIdeas: [...]
  },

  // Safety
  safetyCertification: {
    approved: true,
    safetyScore: 95,
    certificationLevel: "CCS-A"
  }
}
```

## 🚀 API Usage

### Generate Complete Story

```bash
POST /api/stories/generate

{
  "request": {
    "prompt": "A story about a brave little robot learning to make friends",
    "ageRange": "6-8",
    "genre": ["adventure", "friendship"],
    "length": "medium",
    "illustrationStyle": "soft_storybook",
    "voiceMode": "bedtime"
  },
  "context": {
    "userId": "user-123",
    "parentSettings": {
      "anxietyLevel": 5,
      "contentFilterLevel": "moderate",
      "educationalFocus": ["sel", "literacy"]
    }
  }
}
```

### Quick Story (Streamlined)

```bash
POST /api/stories/generate/quick

{
  "request": {
    "prompt": "A bunny discovers a magical garden",
    "ageRange": "3-5"
  }
}
```

## ⚙️ Configuration

### Environment Variables

```bash
# Required
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-4o

# Optional
ENABLE_IMAGE_GENERATION=true
ENABLE_VOICE_GENERATION=false
SAFETY_LEVEL=strict
MAX_STORIES_PER_DAY=10
```

### Parent Controls

Parents can adjust:
- **Anxiety Slider** (1-10): Controls emotional intensity
- **Content Filter**: strict | moderate | relaxed
- **Educational Focus**: Areas to emphasize

## 🛡️ Safety Features

1. **Multi-Layer Review**: Every story reviewed by Safety Agent
2. **Certification System**: CCS-A through CCS-Therapy levels
3. **Comfort Resolution**: All fear/tension must resolve safely
4. **Age-Appropriate Bounds**: Strict emotional intensity limits
5. **Trigger Warnings**: Automatic identification and labeling
6. **COPPA Compliance**: Built-in child data protection

## 📈 Performance

- **Average Generation Time**: 60-90 seconds (complete pipeline)
- **Quick Mode**: 30-45 seconds (streamlined)
- **Token Usage**: ~15,000-25,000 tokens per story
- **Cost**: ~$0.30-0.50 per complete story (with GPT-4)

## 🔧 Development

### Running Locally

```bash
cd _backend
npm install
cp .env.example .env
# Add your OPENAI_API_KEY to .env
npm run dev
```

### Testing the API

```bash
# Health check
curl http://localhost:4000/api/stories/test

# Generate test story
curl -X POST http://localhost:4000/api/stories/generate/quick \
  -H "Content-Type: application/json" \
  -d '{
    "request": {
      "prompt": "A dragon learns to share",
      "ageRange": "6-8"
    }
  }'
```

## 📚 Next Steps

See the main project roadmap for:
- Image Generation Module (DALL-E 3, SDXL, ControlNet)
- Voice Immersion Engine (ElevenLabs integration)
- Parent Dashboard
- Character IP Factory
- Creator Marketplace

## 📝 License

Proprietary - AI Children's Story Publishing Platform

---

**Built with ❤️ for creating safe, educational, award-quality children's stories**
