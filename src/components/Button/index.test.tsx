import React from "react";
import { render, fireEvent, screen} from "@testing-library/react";
import Button from './index';


describe("Button component", () => {
  it("should render the button with primary variant", () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveStyle("background-color: #516799");
    expect(button).toHaveStyle("border-color: #516799");
    expect(button).toHaveStyle("color: #fff");
  });

  it("should render the button with danger variant", () => {
    render(
      <Button variant="danger">Click me if you dare</Button>
    );
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveStyle("background-color: #d9534f");
    expect(button).toHaveStyle("border-color: #d9534f");
    expect(button).toHaveStyle("color: #fff");
  });

  it("should call onClick function when button is clicked", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("should be disabled when disabled prop is true", () => {
    render(<Button disabled>Can't click me</Button>);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });
});