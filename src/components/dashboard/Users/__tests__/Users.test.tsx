import { render, screen, fireEvent } from "@testing-library/react";
import { Users } from "../Users";
import { BrowserRouter } from "react-router-dom";
import * as service from "../../../../services/users.service";

jest.mock("../../services/users.service");

const mockUsers = [
  {
    id: "1",
    username: "John",
    email: "john@mail.com",
    phone: "123",
    organization: "Org",
    dateJoined: "2024-01-01",
    status: "active",
  },
];

const renderComponent = () =>
  render(
    <BrowserRouter>
      <Users />
    </BrowserRouter>
  );

describe("Users Page", () => {
  it("renders users from API", async () => {
    (service.getUsers as jest.Mock).mockResolvedValue({
      data: mockUsers,
    });

    renderComponent();

    expect(await screen.findByText("John")).toBeInTheDocument();
  });

  it("stores selected user in localStorage", async () => {
    (service.getUsers as jest.Mock).mockResolvedValue({
      data: mockUsers,
    });

    renderComponent();

    const menuButton = await screen.findByRole("button", { hidden: true });

    fireEvent.click(menuButton);

    const viewDetails = await screen.findByText(/view details/i);
    fireEvent.click(viewDetails);

    const stored = JSON.parse(localStorage.getItem("selectedUser")!);

    expect(stored.username).toBe("John");
  });
});