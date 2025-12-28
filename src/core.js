/**
 * Chunk - A lightweight reactive core
 * Core reactive logic for state management
 */

const listeners = new Set([]);

/**
 * Creates an effect that tracks dependencies and re-runs on state changes
 * @param {Function} fn - Function to run when dependencies change
 */
function effect(fn) {
  // Ignore if already registered
  if (listeners.has(fn)) return;
  fn(); // Call once at registration
  listeners.add(fn);
}

/**
 * Creates a deeply reactive proxy object
 * Changes to the proxy trigger all registered effects
 * @param {Object} initial - Initial state object
 * @returns {Proxy} Reactive proxy of the object
 */
function reactive(initial) {
  const handler = {
    get(target, prop) {
      return target[prop];
    },
    set(target, prop, value) {
      target[prop] = value;
      listeners.forEach((listener) => listener());
      return true;
    },
  };
  const proxy = new Proxy(initial, handler);
  return proxy;
}

export { effect, reactive };
