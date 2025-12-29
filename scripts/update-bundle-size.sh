#!/bin/bash

# Get the minified file size
SIZE=$(du -h src/core.min.js | awk '{print $1}')

# Update README.md with the new bundle size using custom tags
sed -i "s/<!-- BUNDLE_SIZE -->.*<!-- \/BUNDLE_SIZE -->/<!-- BUNDLE_SIZE -->~${SIZE}<!-- \/BUNDLE_SIZE -->/g" README.md

echo "Updated bundle size to ~${SIZE} in README.md"
