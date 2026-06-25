const axios = require('axios');

const postN8nWebhook = async (url, payload) => {
  if (!url) {
    const err = new Error('Missing n8n webhook URL');
    err.isN8nUnreachable = true;
    throw err;
  }

  try {
    const response = await axios.post(url, payload);
    return response.data;
  } catch (err) {
    const message = err.response?.data?.error || err.message || 'Unknown webhook error';
    const wrapped = new Error(`n8n webhook error: ${message}`);
    wrapped.isN8nUnreachable = err.code === 'ECONNREFUSED' || err.response?.status >= 500;
    throw wrapped;
  }
};

const sendDeadlineReminder = async (payload) => postN8nWebhook(process.env.N8N_DEADLINE_WEBHOOK, payload);
const sendNoticeBroadcast = async (payload) => postN8nWebhook(process.env.N8N_NOTICE_WEBHOOK, payload);

const getN8nWebhookStatus = async () => {
  const deadlineUrl = process.env.N8N_DEADLINE_WEBHOOK;
  const noticeUrl = process.env.N8N_NOTICE_WEBHOOK;

  const status = {
    deadlineWebhook: deadlineUrl ? 'configured' : 'missing',
    noticeWebhook: noticeUrl ? 'configured' : 'missing',
  };

  if (!deadlineUrl || !noticeUrl) {
    return status;
  }

  const checkWebhook = async (url) => {
    try {
      await axios.options(url, { timeout: 3000 });
      return 'reachable';
    } catch {
      return 'unreachable';
    }
  };

  const [deadlineStatus, noticeStatus] = await Promise.all([
    checkWebhook(deadlineUrl),
    checkWebhook(noticeUrl),
  ]);

  return {
    deadlineWebhook: deadlineStatus,
    noticeWebhook: noticeStatus,
  };
};

module.exports = {
  sendDeadlineReminder,
  sendNoticeBroadcast,
  getN8nWebhookStatus,
};
