const express = require('express');
const router = express.Router();
const axios = require('axios');
const { sendNoticeBroadcast } = require('../webhooks/n8n');

// ----------------------------------------------------------------
// POST /notice/broadcast
// Body: { noticeText, eventDate, phoneList: ["+91...", "+91..."] }
// Triggers n8n Workflow 2 which:
//   1. Calls Groq to summarize the notice
//   2. Creates a Google Calendar event
//   3. Sends WhatsApp to every phone in phoneList
// ----------------------------------------------------------------
router.post('/broadcast', async (req, res, next) => {
  try {
    const { noticeText, eventDate, phoneList } = req.body;

    if (!noticeText || !phoneList || !Array.isArray(phoneList) || phoneList.length === 0) {
      return res.status(400).json({
        error: 'Required: noticeText (string), phoneList (non-empty array)',
      });
    }

    // Optionally pre-summarize here so the n8n payload already has bullets
    let summary = null;
    let bulletPoints = [];
    try {
      const aiRes = await axios.post(
        `http://localhost:${process.env.PORT || 5000}/ai/summarize`,
        { noticeText }
      );
      summary      = aiRes.data.summary      || null;
      bulletPoints = aiRes.data.bulletPoints || [];
    } catch (aiErr) {
      console.warn('[/notice/broadcast] Pre-summarize failed (n8n will handle it):', aiErr.message);
    }

    // Fire n8n Workflow 2 webhook
    await sendNoticeBroadcast(process.env.N8N_NOTICE_WEBHOOK, {
      noticeText,
      summary,
      bulletPoints,
      eventDate:  eventDate || null,
      phoneList,
    });

    console.log(`[/notice/broadcast] n8n webhook fired — ${phoneList.length} recipients`);
    return res.json({ status: 'broadcast triggered', recipients: phoneList.length });
  } catch (err) {
    // Specifically handle n8n being unreachable
    if (err.isN8nUnreachable) {
      return res.status(502).json({ error: 'n8n webhook unreachable. Is the workflow active?' });
    }
    next(err);
  }
});

module.exports = router;
