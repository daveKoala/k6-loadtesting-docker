# K6 Load Testing

Simple K6 load testing setup with configurable requests and load profiles.

## Quick Start

1. Edit `config.js` with your endpoint and load settings
2. Run `make test`

## Configuration

Edit [config.js](config.js) to configure:

```javascript
request: {
  url: 'https://api.example.com/endpoint',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_TOKEN',
  },
  body: JSON.stringify({ key: 'value' }),
},

stages: [
  { duration: '30s', target: 10 },  // Ramp up to 10 VUs
  { duration: '1m', target: 10 },   // Stay at 10 VUs
  { duration: '30s', target: 0 },   // Ramp down
],

thresholds: {
  http_req_duration: ['p(95)<500'],  // 95% requests < 500ms
  http_req_failed: ['rate<0.01'],    // Error rate < 1%
},
```

## cURL Conversion

```bash
# From:
curl -X POST https://api.example.com/users \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer abc123" \
  -d '{"name": "test"}'

# To config.js:
request: {
  url: 'https://api.example.com/users',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer abc123',
  },
  body: JSON.stringify({ name: 'test' }),
}
```

## Requirements

- Docker
