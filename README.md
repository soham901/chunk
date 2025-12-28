# Chunk

A lightweight reactive core for learning and experimentation.

## Features

- Deep reactive state with Proxy
- Auto-tracking effects
- ~~TypeScript support~~

## Quick Start

### Via CDN

```html
<script src="https://cdn.jsdelivr.net/gh/soham901/chunk/src/core.js"></script>
<script>
  const state = reactive({ count: 0 });
  effect(() => console.log(`Count: ${state.count}`));
  state.count++; // Triggers effect
</script>
```

## API

**`reactive(target)`** – Creates a deeply reactive proxy

**`effect(fn)`** – Runs a function; re-runs when dependencies change

## Not Included Yet

Computed values with dependency tracking, array reactivity, Map/Set support, effect cleanup, batched updates, component system, DOM rendering

## Resources

- [Roadmap](./ROADMAP.md) - Feature roadmap and version planning
- [Issues](./ISSUES.md) - Known issues and technical debt

## Status

Developer is busy with coffee. Check back later for v0.0.1
