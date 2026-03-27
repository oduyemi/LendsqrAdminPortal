import { render, screen, fireEvent } from "@testing-library/react";
import { Users } from "../Users";
import { TestWrapper } from "../../../../utils/tests";
import * as service from "../../../../services/users.service";

jest.mock("../../../../services/users.service");

jest.mock("../../../../layouts/Dashboard", () => ({
  DashboardLayout: ({ children }: any) => <div>{children}</div>,
}));

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
  render(<Users />, { wrapper: TestWrapper });

describe("Users Page", () => {
  beforeEach(() => {
    (service.getUsers as jest.Mock).mockResolvedValue({
      data: mockUsers,
    });
    localStorage.clear();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders users from API", async () => {
    renderComponent();

    expect(await screen.findByText("John")).toBeInTheDocument();
  });

  

  it("stores selected user in localStorage", async () => {
    renderComponent();
    const menuButton = await screen.findByTestId("menu-btn-0");
    fireEvent.click(menuButton);
    const viewDetails = await screen.findByText(/view details/i);
    fireEvent.click(viewDetails);
    const stored = JSON.parse(localStorage.getItem("selectedUser")!);
    expect(stored.username).toBe("John");
  });
});