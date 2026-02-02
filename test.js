import http from 'k6/http';
import { check, sleep } from 'k6';
import { config } from './config.js';

// K6 options - loaded from config
export const options = {
  stages: config.stages,
  thresholds: config.thresholds,
};

// Main test function - runs once per VU iteration
export default function () {
  const { url, method, headers, body } = config.request;

  let response;

  switch (method.toUpperCase()) {
    case 'GET':
      response = http.get(url, { headers });
      break;
    case 'POST':
      response = http.post(url, body, { headers });
      break;
    case 'PUT':
      response = http.put(url, body, { headers });
      break;
    case 'PATCH':
      response = http.patch(url, body, { headers });
      break;
    case 'DELETE':
      response = http.del(url, body, { headers });
      break;
    default:
      response = http.request(method, url, body, { headers });
  }

  // Validate response
  check(response, {
    'status is 2xx': (r) => r.status >= 200 && r.status < 300,
  });

  // Small pause between requests (optional, adjust as needed)
  sleep(1);
}
