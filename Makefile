.PHONY: test help

# Run K6 load test in Docker
test:
	docker run --rm -i --network host \
		-v $(PWD)/config.js:/scripts/config.js:ro \
		-v $(PWD)/test.js:/scripts/test.js:ro \
		grafana/k6 run /scripts/test.js

help:
	@echo "Usage:"
	@echo "  make test   - Run K6 load test in Docker"
	@echo ""
	@echo "Configuration:"
	@echo "  Edit config.js to change:"
	@echo "    - request.url, method, headers, body"
	@echo "    - stages (VUs and ramp profile)"
	@echo "    - thresholds (pass/fail criteria)"
