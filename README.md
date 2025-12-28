# Chunk

A lightweight reactive core for learning and experimentation.

## Features

- Deep reactive state with Proxy
- Auto-tracking effects
- TypeScript support

## Quick Start

```typescript
const state = reactive({ count: 0 });

effect(() => console.log(`Count: ${state.count}`));

state.count++; // Triggers effect
```

## API

**`reactive(target)`** – Creates a deeply reactive proxy

**`effect(fn)`** – Runs a function; re-runs when dependencies change

## Not Included Yet

Computed values with dependency tracking, array reactivity, Map/Set support, effect cleanup, batched updates, component system, DOM rendering

## Status

Developer is busy with coffee. Check back later for v0.0.1
