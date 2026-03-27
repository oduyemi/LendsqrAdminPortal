import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { LoginForm } from "../Login";
import { TestWrapper } from "../../../utils/tests";
import * as api from "../../../features/users/api/login/index";

jest.mock("../../../features/users/api/login");

const renderComponent = () =>
  render(<LoginForm />, { wrapper: TestWrapper });

describe("LoginForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders inputs and button", () => {
    renderComponent();

    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /log in/i })).toBeInTheDocument();
  });

  it("shows validation error", async () => {
    renderComponent();

    fireEvent.click(screen.getByRole("button", { name: /log in/i }));

    expect(screen.getByRole("button", { name: /log in/i })).toBeDisabled();
  });

  it("logs in successfully", async () => {
    (api.loginUser as jest.Mock).mockResolvedValue({
      email: "test@mail.com",
      token: "123",
    });

    renderComponent();

    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: "test@mail.com" },
    });

    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: "123456" },
    });

    fireEvent.click(screen.getByRole("button", { name: /log in/i }));

    await waitFor(() => {
      expect(api.loginUser).toHaveBeenCalled();
    });
  });

  it("shows error on failed login", async () => {
    (api.loginUser as jest.Mock).mockRejectedValue(
      new Error("Login failed")
    );

    renderComponent();

    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: "wrong@mail.com" },
    });

    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: "123456" },
    });

    fireEvent.click(screen.getByRole("button", { name: /log in/i }));

    expect(await screen.findByText(/login failed/i)).toBeInTheDocument();
  });
});