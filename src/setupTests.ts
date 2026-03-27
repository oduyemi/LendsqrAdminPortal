import "@testing-library/jest-dom";
import { TextEncoder, TextDecoder } from "util";

Object.assign(global, {
  TextEncoder,
  TextDecoder,
});

// Mock fetch
global.fetch = jest.fn();

// Mock localStorage
class LocalStorageMock {
  store: Record<string, string> = {};

  clear() {
    this.store = {};
  }

  getItem(key: string) {
    return this.store[key] ?? null;
  }

  setItem(key: string, value: string) {
    this.store[key] = String(value);
  }

  removeItem(key: string) {
    delete this.store[key];
  }
}

Object.defineProperty(window, "localStorage", {
  value: new LocalStorageMock(),
  writable: true,
});

// Reset before each test
beforeEach(() => {
  window.localStorage.clear();
  jest.clearAllMocks();
});