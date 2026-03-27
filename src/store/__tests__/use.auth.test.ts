import { act } from "@testing-library/react";
import { useAuthStore } from "../use-auth";

describe("Auth Store (Zustand)", () => {
  beforeEach(() => {
    useAuthStore.getState().logout();
    localStorage.clear();
  });

  it("sets email and password", () => {
    act(() => {
      useAuthStore.getState().setEmail("test@mail.com");
      useAuthStore.getState().setPassword("123456");
    });

    const state = useAuthStore.getState();

    expect(state.email).toBe("test@mail.com");
    expect(state.password).toBe("123456");
  });

  it("logs in correctly", () => {
    act(() => {
      useAuthStore.getState().login({
        email: "test@mail.com",
        token: "abc123",
      });
    });

    const state = useAuthStore.getState();

    expect(state.user).toEqual({ email: "test@mail.com" });
    expect(state.token).toBe("abc123");
    expect(state.isAuthenticated).toBe(true);
    expect(state.password).toBe(""); // cleared
  });

  it("logs out correctly", () => {
    act(() => {
      useAuthStore.getState().login({
        email: "test@mail.com",
        token: "abc123",
      });

      useAuthStore.getState().logout();
    });

    const state = useAuthStore.getState();

    expect(state.user).toBeNull();
    expect(state.token).toBeNull();
    expect(state.isAuthenticated).toBe(false);
  });

  it("persists to localStorage", () => {
    act(() => {
      useAuthStore.getState().login({
        email: "persist@test.com",
        token: "persist-token",
      });
    });

    const stored = JSON.parse(
      localStorage.getItem("auth-storage") || "{}"
    );

    expect(stored.state.user.email).toBe("persist@test.com");
    expect(stored.state.token).toBe("persist-token");
  });
});