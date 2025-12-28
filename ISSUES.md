# Known Issues

## Critical Issues

### Prototype Pollution Vulnerability
- **Severity**: High
- **Description**: Setting `__proto__` on reactive objects pollutes the prototype chain
- **Location**: `src/core.js` - Proxy handler doesn't validate dangerous property names
- **Test**: `core.test.js` line 299-307
- **Fix**: Add whitelist/blacklist for dangerous properties (`__proto__`, `constructor`, `prototype`)

### No Effect Cleanup/Disposal
- **Severity**: Medium
- **Description**: Effects accumulate in a global Set and are never removed, causing memory leaks
- **Location**: `src/core.js` - `listeners` Set has no cleanup mechanism
- **Impact**: Long-running apps will accumulate unused effects
- **Fix**: Implement `cleanup()` or return disposal function from `effect()`

## Performance Issues

### Global Listener Pattern
- **Severity**: Medium
- **Description**: All effects trigger on any reactive state change, regardless of which state they depend on
- **Location**: `src/core.js` line 32 - `listeners.forEach((listener) => listener())`
- **Test**: `core.test.js` line 131-152 demonstrates the issue
- **Impact**: Scales poorly with many effects or state objects
- **Fix**: Implement dependency tracking so effects only re-run when their dependencies change

### No Value Change Detection
- **Severity**: Low
- **Description**: Setting a property to the same value still triggers all effects
- **Location**: `src/core.js` line 31 - no value comparison before triggering
- **Test**: `core.test.js` line 250-263
- **Impact**: Unnecessary effect re-runs
- **Fix**: Compare old and new values with `Object.is()` before triggering listeners

## Reactivity Limitations

### No Deep Reactivity
- **Severity**: Medium
- **Description**: Mutations to nested objects don't trigger effects, only direct property assignments on the proxy do
- **Location**: `src/core.js` line 25-38 - handler only wraps the top level
- **Test**: `core.test.js` line 105-129 documents this limitation
- **Example**: `state.user.age = 26` won't trigger, but `state.user = {...}` will
- **Fix**: Recursively wrap nested objects with Proxy handlers

### Array Mutations Not Tracked
- **Severity**: Medium
- **Description**: Array methods like `push()`, `splice()` may not properly trigger reactivity
- **Location**: `src/core.js` - arrays are passed through without special handling
- **Impact**: Mutations to array elements within nested structures don't trigger effects
- **Fix**: Implement Array trap handler for indexed property access

## Architectural Issues

### No Dependency Tracking
- **Severity**: High
- **Description**: No mechanism to track which properties/state an effect accesses
- **Impact**: Required for implementing efficient reactivity updates
- **Prerequisite**: For fixing global listener pattern and implementing computed values
- **Fix**: Instrument property access to build dependency graph during effect execution

### Single Global Listener Set
- **Severity**: Low  
- **Description**: All reactive objects share the same listener set, preventing scoped effects
- **Location**: `src/core.js` line 6 - global `listeners = new Set()`
- **Impact**: Can't isolate effects or manage them per-object
- **Fix**: Attach listeners to each reactive object individually
