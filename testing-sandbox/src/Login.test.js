import { render, screen } from "@testing-library/react";
import { Login } from "./Login";
import userEvent from "@testing-library/user-event";
import axios from "axios";

test("renders without crashing", function() {
    render(<Login />);
});

test("matches snapshot", () => {
    const { asFragment } = render(<Login />);
    expect(asFragment()).toMatchSnapshot();
  });

test("renders Login component correctly", () => {
    render(<Login />)
    const heading = screen.getByText("Login");
    const username = screen.getByPlaceholderText("username");
    const password = screen.getByPlaceholderText("password");
    expect(heading).toBeInTheDocument();
    expect(username).toBeInTheDocument();
    expect(password).toBeInTheDocument();
});

jest.mock("axios");

test("handles user login", () => {
    const returningUser = { username: "user", password: "abc123$"}
    axios.post.mockImplementation(() => Promise.resolve({ data: { returningUser } }));
});

test("handles submit button click", async() => {
    render(<Login />);
    const buttonElement = screen.getByRole("button");
    const message = screen.queryByText("Login successful!");
    expect(message).not.toBeInTheDocument();

    await userEvent.click(buttonElement);

    const message2 = screen.queryByText("Login successful!");
    expect(message2).toBeInTheDocument();
});