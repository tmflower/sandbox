import { render, screen, act } from "@testing-library/react";
import { Todos } from "./Todos";
import userEvent from "@testing-library/user-event";
import axios from "axios";

jest.mock("axios");
const todos = [{ task: "Walk the dog" }, {task: "Feed the fish"}, {task: "Water plants"}];

beforeEach(() => {  
    act(() => {        
        axios.get.mockImplementation(() => Promise.resolve({ data: { todos } }));
      });
});

test("renders without crashing", function() {
    render(<Todos />);
});

test("matches snapshot", () => {
    const { asFragment } = render(<Todos />);
    expect(asFragment()).toMatchSnapshot();
  });

test("renders Todos component correctly", () => {  
    render(<Todos />);      
    const heading = screen.queryByText("Todos");    
    const h4 = screen.getByText("Add a new task");    
    const label = screen.getByText("Task:");    
    const button = screen.getByRole("button");
    screen.debug();
    expect(heading).toBeInTheDocument();
    expect(h4).toBeInTheDocument();
    expect(label).toBeInTheDocument();
    expect(button).toBeInTheDocument();    
});


test("handles submit button click", async() => {
    render(<Todos />);
    const buttonElement = screen.getByRole("button");
    const task = screen.queryByText("Grocery shopping");
    expect(task).not.toBeInTheDocument();

    const newTask = { task: "Grocery shopping" }
    await axios.post.mockImplementation(() => Promise.resolve({ data: { newTask } }));
    await userEvent.click(buttonElement);

    const newTaskRendered = screen.getByText("Grocery shopping");
    expect(newTaskRendered).toBeInTheDocument();
});