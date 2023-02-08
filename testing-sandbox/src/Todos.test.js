import { render, screen } from "@testing-library/react";
import { Todos } from "./Todos";
import userEvent from "@testing-library/user-event";
// import axios from "axios";

jest.mock("axios");

test("renders without crashing", function() {
    render(<Todos todos={[{ task: "Walk the dog" }, {task: "Feed the fish"}, {task: "Water plants"}]}/>);
});

test("matches snapshot", () => {
    const { asFragment } = render(<Todos todos={[{ task: "Walk the dog" }, {task: "Feed the fish"}, {task: "Water plants"}]}/>);
    expect(asFragment()).toMatchSnapshot();
  });

test("renders Todos component correctly", () => {  
    render(<Todos todos={[{ task: "Walk the dog" }, {task: "Feed the fish"}, {task: "Water plants"}]}/>);      
    const heading = screen.queryByText("Todos");    
    const h4 = screen.getByText("Add a new task");    
    const label = screen.getByText("Task:");    
    const button = screen.getByRole("button");
    const task = screen.getByText("Feed the fish");
    
    expect(heading).toBeInTheDocument();
    expect(h4).toBeInTheDocument();
    expect(label).toBeInTheDocument();
    expect(button).toBeInTheDocument();   
    expect(task).toBeInTheDocument(); 
});

test("renders prompt if todos list is empty", () => {
    render(<Todos todos={[]} />);
    const heading = screen.queryByText("Todos");    
    const h4 = screen.getByText("Add a new task");  
    const message = screen.getByText("No tasks yet. Add a new task above.");

    expect(heading).toBeInTheDocument();
    expect(h4).toBeInTheDocument();
    expect(message).toBeInTheDocument();
});

test("handles submit button click", async() => {
    render(<Todos todos={[{ task: "Walk the dog" }, {task: "Feed the fish"}, {task: "Water plants"}]}/>);

    const buttonElement = screen.getByRole("button");
    let message = screen.queryByText("Task added!");
    expect(message).not.toBeInTheDocument();

    // const newTask = { task: "Grocery shopping" }
    // await axios.post.mockImplementation(() => Promise.resolve({ data: { newTask } }));
    await userEvent.click(buttonElement);
    
    // screen.debug();
    message = screen.getByText("Task added!");
    expect(message).toBeInTheDocument();
});