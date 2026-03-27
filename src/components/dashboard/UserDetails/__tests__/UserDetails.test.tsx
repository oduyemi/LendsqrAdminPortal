import { render, screen } from "@testing-library/react";
import { Routes, Route } from "react-router-dom";
import { UserDetails } from "../UserDetails";
import { TestWrapper } from "../../../../utils/tests";

const mockUser = {
  id: "1",
  username: "John",
  phone: "123456",
};

const renderComponent = () =>
  render(
    <Routes>
      <Route path="/admin/users/:id" element={<UserDetails />} />
    </Routes>,
    { wrapper: TestWrapper }
  );

describe("UserDetails", () => {
  beforeEach(() => {
    localStorage.setItem("selectedUser", JSON.stringify(mockUser));
    jest.spyOn(Math, "random").mockReturnValue(0.5);
  });

  afterEach(() => {
    localStorage.clear();
    jest.restoreAllMocks();
  });

  it("renders user details from localStorage", async () => {
    window.history.pushState({}, "Test", "/admin/users/1");

    renderComponent();

  expect(await screen.findByRole("heading", { name: "John" }))
  .toBeInTheDocument();
  });

  it("shows correct user id", async () => {
    window.history.pushState({}, "Test", "/admin/users/1");

    renderComponent();

    expect(await screen.findByText("1")).toBeInTheDocument();
  });

  it("shows loading skeleton if no user in localStorage", () => {
    localStorage.clear();

    window.history.pushState({}, "Test", "/admin/users/1");

    renderComponent();

    expect(document.querySelector(".skeleton-table")).toBeInTheDocument();
  });
});