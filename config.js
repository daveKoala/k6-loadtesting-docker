// K6 Load Test Configuration
// Edit this file to configure your load test

import { sleep } from "k6";

const BASE_URL = 'https://api-dev.zippd.com';

export const config = {
  // ===========================================
  // REQUEST SETTINGS (convert your cURL here)
  // ===========================================
  request: {
    //  url: 'https://api-dev.zippd.com/api/route-optimization/health',
    // url: 'https://api-dev.zippd.com/api/demo/health',
    // url: 'https://api.zippd.com/api/route-optimization/health',
    // url: 'https://api-dev.zippd.com/api/route-optimization/optimization/v2/result/e3bab215-28c6-4f77-859c-23c9b6201962',
    // url: 'https://api-dev.zippd.com/api/driver-location/status',
    url: BASE_URL + '/api/driver-location/location',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // 'Authorization': 'Bearer YOUR_TOKEN',
      // 'cookie': 'session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZTY5NzA2YTctMjY2ZC00NmVkLWIyZGYtMzBmYzBlOGNiMzZmIiwiZW1haWwiOiJkYXZpZC5jbGFyZUBkZWxpdmVyeWFwcC5jb20iLCJleHAiOjE3NzAwNjkxOTUsImlhdCI6MTc3MDAyNTk5NX0.3ev0a8znUA5Noow-xWd_byBlNNFtYeuPR8jBSCZvo1I'
    },
    body: JSON.stringify({user_id: `driver-${__VU}`,  // unique per virtual user
      latitude: 51.5074 + (Math.random() * 0.1),
      longitude: -0.1278 + (Math.random() * 0.1),
      device_details: '{"platform": "android"}',}
    ),
    // body: JSON.stringify({ key: 'value' }),
  },

  // ===========================================
  // LOAD PROFILE (virtual users & ramp)
  // ===========================================
  stages: [
    { duration: '30s', target: 100 },  // Ramp up to X VUs
    { duration: '2m', target: 300 },   // Stay at X VUs
    { duration: '30s', target: 10 },   // Ramp down to X VUs
  ],

  // ===========================================
  // THRESHOLDS (pass/fail criteria)
  // ===========================================
  thresholds: {
    http_req_duration: ['p(95)<500'],  // 95% of requests < 500ms
    http_req_failed: ['rate<0.01'],    // Error rate < 1%
  },
  sleep: () => sleep(Math.random() * (1 - 0.25) + 0.25)  // 0.25-2 seconds
};
