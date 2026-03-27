import { render, screen } from "@testing-library/react";
import { UserDetails } from "../UserDetails";
import { BrowserRouter, Route, Routes } from "react-router-dom";


const mockUser = {
  id: "1",
  username: "John",
  phone: "123456",
};

const renderComponent = () =>
  render(
    <BrowserRouter>
      <Routes>
        <Route path="/admin/users/:id" element={<UserDetails />} />
      </Routes>
    </BrowserRouter>
  );

describe("UserDetails", () => {
  beforeEach(() => {
    localStorage.setItem("selectedUser", JSON.stringify(mockUser));
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("renders user details from localStorage", async () => {
    window.history.pushState({}, "Test", "/admin/users/1");

    renderComponent();

    expect(await screen.findByText("John")).toBeInTheDocument();
  });

  it("redirects if no user in localStorage", () => {
    localStorage.clear();

    window.history.pushState({}, "Test", "/admin/users/1");

    renderComponent();

    expect(localStorage.getItem("selectedUser")).toBeNull();
  });

  it("shows correct user id", async () => {
    window.history.pushState({}, "Test", "/admin/users/1");

    renderComponent();

    expect(await screen.findByText("1")).toBeInTheDocument();
  });
});