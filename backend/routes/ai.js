const express = require('express');
const router = express.Router();
const axios = require('axios');

// ----------------------------------------------------------------
// Helper: call Groq API
// ----------------------------------------------------------------
async function callGroq(prompt, maxTokens = 500) {
  const response = await axios.post(
    'https://api.groq.com/openai/v1/chat/completions',
    {
      model:      'llama3-8b-8192',
      max_tokens: maxTokens,
      messages:   [{ role: 'user', content: prompt }],
    },
    {
      headers: {
        Authorization:  `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data.choices[0].message.content;
}

// ----------------------------------------------------------------
// POST /ai/summarize
// Body: { noticeText }
// Returns: { summary, bulletPoints: [string, string, string] }
// ----------------------------------------------------------------
router.post('/summarize', async (req, res, next) => {
  try {
    const { noticeText } = req.body;

    if (!noticeText || noticeText.trim().length < 10) {
      return res.status(400).json({ error: 'noticeText is required (min 10 chars)' });
    }

    const prompt = `
You are a college notice summarizer. Summarize the following notice into exactly 3 concise bullet points.

Return ONLY valid JSON. No explanation. No markdown. No backticks. Just raw JSON.

Format:
{"summary": "One sentence overview", "bulletPoints": ["Point 1", "Point 2", "Point 3"]}

Notice:
${noticeText.trim()}
`.trim();

    const raw = await callGroq(prompt, 300);

    let parsed;
    try {
      parsed = JSON.parse(raw.replace(/```json|```/g, '').trim());
    } catch {
      return res.status(500).json({ error: 'AI returned invalid JSON', raw });
    }

    console.log('[/ai/summarize] Summary generated');
    return res.json(parsed);
  } catch (err) {
    next(err);
  }
});

// ----------------------------------------------------------------
// POST /ai/studyplan
// Body: { subject, deadline }
// Returns: { studyPlan: [{ day: "YYYY-MM-DD", task: "..." }] }
// ----------------------------------------------------------------
router.post('/studyplan', async (req, res, next) => {
  try {
    const { subject, deadline } = req.body;

    if (!subject || !deadline) {
      return res.status(400).json({ error: 'subject and deadline are required' });
    }

    const today = new Date().toISOString().split('T')[0];
    const deadlineDate = new Date(deadline);
    const daysLeft = Math.ceil((deadlineDate - new Date()) / (1000 * 60 * 60 * 24));

    if (daysLeft <= 0) {
      return res.status(400).json({ error: 'Deadline must be in the future' });
    }

    const prompt = `
Today is ${today}. A student has a ${subject} assignment due on ${deadline} (${daysLeft} days away).

Create a practical day-by-day study plan for these ${daysLeft} days.

Return ONLY valid JSON. No explanation. No markdown. No backticks. Just raw JSON.

Format (array of objects, one per day):
[{"day": "YYYY-MM-DD", "task": "What to study or do on this day"}]
`.trim();

    const raw = await callGroq(prompt, 600);

    let studyPlan;
    try {
      studyPlan = JSON.parse(raw.replace(/```json|```/g, '').trim());
    } catch {
      return res.status(500).json({ error: 'AI returned invalid JSON', raw });
    }

    console.log(`[/ai/studyplan] Plan generated for ${subject} — ${daysLeft} days`);
    return res.json({ studyPlan });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
