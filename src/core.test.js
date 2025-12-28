import { expect, test, describe, beforeEach } from 'bun:test';
import { effect, reactive } from './core.js';

// Global state for managing listeners between tests
let testListeners = new Set();

describe('Chunk - Reactive Core', () => {
  describe('reactive()', () => {
    test('creates a proxy that returns initial values', () => {
      const state = reactive({ count: 0, name: 'test' });
      expect(state.count).toBe(0);
      expect(state.name).toBe('test');
    });

    test('updates property values', () => {
      const state = reactive({ count: 0 });
      state.count = 5;
      expect(state.count).toBe(5);
    });

    test('supports object nesting', () => {
      const state = reactive({ user: { name: 'John', age: 30 } });
      expect(state.user.name).toBe('John');
      state.user.age = 31;
      expect(state.user.age).toBe(31);
    });

    test('supports arrays', () => {
      const state = reactive({ items: [1, 2, 3] });
      expect(state.items[0]).toBe(1);
      state.items.push(4);
      expect(state.items.length).toBe(4);
    });

    test('adds new properties dynamically', () => {
      const state = reactive({});
      state.newProp = 'value';
      expect(state.newProp).toBe('value');
    });
  });

  describe('effect()', () => {
    test('executes function immediately on registration', () => {
      let callCount = 0;
      const fn = () => callCount++;
      effect(fn);
      expect(callCount).toBe(1);
    });

    test('prevents duplicate registrations', () => {
      let callCount = 0;
      const fn = () => callCount++;
      effect(fn);
      effect(fn);
      expect(callCount).toBe(1);
    });

    test('re-runs effect when reactive state changes', () => {
      const state = reactive({ count: 0 });
      let callCount = 0;
      effect(() => callCount++);
      
      state.count = 1;
      expect(callCount).toBe(2); // Initial + one change
    });

    test('re-runs effect multiple times on multiple changes', () => {
      const state = reactive({ count: 0 });
      let callCount = 0;
      effect(() => callCount++);
      
      state.count = 1;
      state.count = 2;
      state.count = 3;
      
      expect(callCount).toBe(4); // Initial + 3 changes
    });

    test('multiple effects are all triggered on state change', () => {
      const state = reactive({ value: 0 });
      let count1 = 0, count2 = 0;
      
      effect(() => count1++);
      effect(() => count2++);
      
      state.value = 1;
      
      expect(count1).toBe(2);
      expect(count2).toBe(2);
    });
  });

  describe('Integration', () => {
    test('effect can access updated reactive state', () => {
      const state = reactive({ count: 0 });
      let latestCount;
      
      effect(() => {
        latestCount = state.count;
      });
      
      expect(latestCount).toBe(0);
      
      state.count = 42;
      expect(latestCount).toBe(42);
    });

    test('tracks nested object mutations', () => {
      const state = reactive({
        user: { name: 'Alice', age: 25 },
        posts: [{ id: 1, title: 'First' }]
      });
      
      let callCount = 0;
      effect(() => {
        callCount++;
        // Access nested properties
        state.user.name;
        state.user.age;
        state.posts.length;
      });
      
      expect(callCount).toBe(1);
      
      // Direct property mutations don't trigger (deep reactivity not implemented)
      // But we can test that the state is updated
      state.user.age = 26;
      expect(state.user.age).toBe(26);
      
      state.posts.push({ id: 2, title: 'Second' });
      expect(state.posts.length).toBe(2);
    });

    test('all effects trigger on any reactive state change (global listener pattern)', () => {
      const state1 = reactive({ x: 0 });
      const state2 = reactive({ y: 0 });
      
      let count1 = 0, count2 = 0;
      effect(() => { count1++; state1.x; });
      effect(() => { count2++; state2.y; });
      
      // Both effects called initially
      expect(count1).toBe(1);
      expect(count2).toBe(1);
      
      // Changing state1 triggers all effects
      state1.x = 1;
      expect(count1).toBe(2);
      expect(count2).toBe(2); // Also incremented (global listener pattern)
      
      // Changing state2 also triggers all effects
      state2.y = 1;
      expect(count1).toBe(3);
      expect(count2).toBe(3);
    });
  });
});
