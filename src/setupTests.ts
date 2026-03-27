// eslint-disable


import "@testing-library/jest-dom";
import { TextEncoder, TextDecoder } from "util";

Object.assign(globalThis, {
  TextEncoder,
  TextDecoder,
});

globalThis.fetch = jest.fn();

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

beforeEach(() => {
  window.localStorage.clear();
  jest.clearAllMocks();
});