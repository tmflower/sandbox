import { render, screen } from "@testing-library/react";
import { Signup } from "./Signup";
import userEvent from "@testing-library/user-event";
import axios from "axios";

test("renders without crashing", function() {
    render(<Signup />);
});

test("matches snapshot", () => {
    const { asFragment } = render(<Signup />);
    expect(asFragment()).toMatchSnapshot();
  });

test("renders Signup component correctly", () => {
    render(<Signup />)
    const heading = screen.getByText("Sign up");
    const username = screen.getByPlaceholderText("username");
    const password = screen.getByPlaceholderText("password");
    expect(heading).toBeInTheDocument();
    expect(username).toBeInTheDocument();
    expect(password).toBeInTheDocument();
});

jest.mock("axios");

test("handles user signup", () => {
    const newUser = { username: "user", password: "abc123$"}
    axios.post.mockImplementation(() => Promise.resolve({ data: { newUser } }));
});

test("handles submit button click", async() => {
    render(<Signup />);
    const buttonElement = screen.getByRole("button");
    const message = screen.queryByText("Signup successful!");
    expect(message).not.toBeInTheDocument();

    await userEvent.click(buttonElement);

    const message2 = screen.queryByText("Signup successful!");
    expect(message2).toBeInTheDocument();
});