.PHONY: test coverage minify build demo help

test:
	bun test src/core.test.js

coverage:
	bash scripts/update-coverage.sh

minify:
	esbuild src/core.js --minify --outfile=src/core.min.js

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
