# 🚀 How to Preview Your AI Children's Story Platform

## Quick Start

### 1️⃣ Start the Backend (Story Engine API)

```bash
cd _backend
npm install
npm run dev
```

**Backend will run on**: `http://localhost:4000`

**Test it**:
```bash
# Health check
curl http://localhost:4000/health

# Story API test
curl http://localhost:4000/api/stories/test
```

---

### 2️⃣ Start the Frontend (Next.js UI)

```bash
# In a new terminal
npm install
npm run dev
```

**Frontend will run on**: `http://localhost:3000`

**Open in browser**: `http://localhost:3000`

---

## 🎨 Test the Story Engine

### Generate Your First Story!

**Option A: Using curl**

```bash
curl -X POST http://localhost:4000/api/stories/generate/quick \
  -H "Content-Type: application/json" \
  -d '{
    "request": {
      "prompt": "A brave little robot who learns to make friends",
      "ageRange": "6-8"
    }
  }'
```

**Option B: Using a tool like Postman or Insomnia**

```
POST http://localhost:4000/api/stories/generate/quick

Body (JSON):
{
  "request": {
    "prompt": "A shy turtle discovers courage",
    "ageRange": "3-5",
    "genre": ["animals", "friendship"],
    "length": "short"
  }
}
```

---

## ⚙️ Configuration

### Required: OpenAI API Key

Edit `_backend/.env` and add your OpenAI API key:

```bash
OPENAI_API_KEY=sk-your-actual-openai-api-key-here
```

**Get one at**: https://platform.openai.com/api-keys

---

## 🎯 Available Endpoints

### Story Generation

**Quick Mode** (30-45 seconds):
```
POST /api/stories/generate/quick
```

**Complete Mode** (60-90 seconds - all 10 agents):
```
POST /api/stories/generate
```

**Test Endpoint**:
```
GET /api/stories/test
```

---

## 📊 Example Request

```json
{
  "request": {
    "prompt": "A dragon who learns to share their treasure",
    "ageRange": "6-8",
    "genre": ["fantasy", "friendship"],
    "themes": ["sharing", "kindness"],
    "length": "medium",
    "illustrationStyle": "soft_storybook",
    "voiceMode": "bedtime"
  },
  "context": {
    "userId": "demo-user",
    "parentSettings": {
      "anxietyLevel": 5,
      "contentFilterLevel": "moderate",
      "educationalFocus": ["sel", "literacy"]
    }
  }
}
```

---

## 📖 Example Response

You'll receive:
- ✅ Complete story with scenes
- ✅ Safety certification (CCS-A/B/C)
- ✅ Moral architecture
- ✅ Emotion graph
- ✅ Educational standards mapping
- ✅ SSML narration scripts
- ✅ Parent discussion activities
- ✅ Teacher lesson plans

---

## 🛠️ Troubleshooting

### Backend won't start?
```bash
cd _backend
npm install
# Check for errors
npm run dev
```

### Frontend won't start?
```bash
npm install
# Check for errors
npm run dev
```

### Story generation fails?
1. Check that your `OPENAI_API_KEY` is set in `_backend/.env`
2. Make sure you have credits on your OpenAI account
3. Check the backend logs for errors

---

## 🎉 What You Can Do Now

### Test Story Generation
Generate complete AI children's stories with:
- Age-appropriate content
- Safety certification
- Educational value
- Moral lessons
- Emotion tracking

### Explore the Frontend
The existing Strategy Guru UI is still there at `http://localhost:3000`

### Build New UI
Ready to create the Story Platform frontend? I can help build:
- Story creation interface
- Parent dashboard
- Story reader/viewer
- Character creator
- World builder

---

## 📝 Next Steps

1. **Start backend**: `cd _backend && npm run dev`
2. **Add OpenAI key**: Edit `_backend/.env`
3. **Test story API**: `curl http://localhost:4000/api/stories/test`
4. **Generate a story**: Use the curl example above
5. **Start frontend**: `npm run dev` (in new terminal)

---

**Need help?** Just ask! I can help you:
- Build frontend UI components
- Test the Story Engine
- Add image generation
- Implement voice narration
- Create the parent dashboard
