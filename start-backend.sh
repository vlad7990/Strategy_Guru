#!/bin/bash
# Start the AI Children's Story Publishing Platform Backend

echo "🎨 Starting AI Children's Story Platform Backend..."
echo ""
echo "⚠️  IMPORTANT: Add your OpenAI API key to _backend/.env"
echo "   Get one at: https://platform.openai.com/api-keys"
echo ""
echo "📍 Starting server on http://localhost:4000"
echo "📚 Story API: http://localhost:4000/api/stories/test"
echo ""
echo "Press Ctrl+C to stop"
echo ""

cd /home/user/Strategy_Guru/_backend
npm run dev
