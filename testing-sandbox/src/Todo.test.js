import { render, screen } from "@testing-library/react";
import { Todo } from "./Todo";
import { Todos } from "./Todos";
import userEvent from "@testing-library/user-event";

jest.mock("axios");

test("renders without crashing", function() {
    render(<Todo todo={{ task: "Walk the dog" }}/>);
});

test("matches snapshot", () => {
    const { asFragment } = render(<Todo todo={{ task: "Walk the dog"}}/>);
    expect(asFragment()).toMatchSnapshot();
  });

test("renders Todo component correctly", () => {
    render(<Todo todo={{ task: "Walk the dog" }}/>);
    const p = screen.queryByText("Walk the dog");
    expect(p).toBeInTheDocument();
    const deleteIcon = screen.getByText("🗑️");
    expect(deleteIcon).toBeInTheDocument();
});

test("handles click to delete", async () => {
    render(<Todo todo={{ task: "Walk the dog", todo_id: 4 }}/>);
    const deleteIcon = screen.getByText("🗑️");
    const message = screen.queryByText("Task deleted");
    expect(message).not.toBeInTheDocument();

    await userEvent.click(deleteIcon);

    const messageAfterClick = screen.getByText("Task deleted");
    expect(messageAfterClick).toBeInTheDocument();
})