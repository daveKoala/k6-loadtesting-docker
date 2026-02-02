// K6 Load Test Configuration
// Edit this file to configure your load test

export const config = {
  // ===========================================
  // REQUEST SETTINGS (convert your cURL here)
  // ===========================================
  request: {
    url: 'https://api-dev.zippd.com/api/demo/health',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      // 'Authorization': 'Bearer YOUR_TOKEN',
    },
    body: JSON.stringify({ key: 'value' }),
  },

  // ===========================================
  // LOAD PROFILE (virtual users & ramp)
  // ===========================================
  stages: [
    { duration: '30s', target: 10 },  // Ramp up to 10 VUs
    { duration: '1m', target: 10 },   // Stay at 10 VUs
    { duration: '30s', target: 0 },   // Ramp down to 0
  ],

  // ===========================================
  // THRESHOLDS (pass/fail criteria)
  // ===========================================
  thresholds: {
    http_req_duration: ['p(95)<500'],  // 95% of requests < 500ms
    http_req_failed: ['rate<0.01'],    // Error rate < 1%
  },
};
