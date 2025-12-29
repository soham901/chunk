.PHONY: test coverage minify build demo help

test:
	bun test src/core.test.js

coverage:
	bash scripts/update-coverage.sh

minify:
	npx terser -c -m -o src/core.min.js -- src/core.js
	@echo "Script sizes:"
	@du -h src/core.js | awk '{print "  core.js: " $$1}'
	@du -h src/core.min.js | awk '{print "  core.min.js: " $$1}'
	@bash scripts/update-bundle-size.sh

build: minify
	@echo "Build complete"

demo:
	npx live-server --port=8000 --open=demo/index.html

help:
	@echo "Available targets:"
	@echo "  test      - Run tests"
	@echo "  coverage  - Run tests and update COVERAGE.md"
	@echo "  minify    - Minify core.js to core.min.js"
	@echo "  build     - Build (minify)"
	@echo "  demo      - Serve demo folder on port 8000"
	@echo "  help      - Show this help message"
