const express = require('express');
const router = express.Router();
const { getN8nWebhookStatus } = require('../webhooks/n8n');

// GET /n8n/status
// Returns whether the webhook URLs are configured and valid.
router.get('/status', async (req, res, next) => {
  try {
    const status = await getN8nWebhookStatus();
    return res.json({ status });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
