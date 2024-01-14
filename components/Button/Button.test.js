import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";

import Button from "./Button";

describe("Button", () => {
  it("renders correctly", () => {
    const { asFragment } = render(<Button>Click me</Button>);
    expect(asFragment()).toMatchSnapshot();
  });

  it("calls the onClick handler when clicked", () => {
    const onClickMock = jest.fn();
    render(<Button onClick={onClickMock}>Click me</Button>);
    fireEvent.click(screen.getByText("Click me"));
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it("displays the correct children", () => {
    render(<Button>Test Button</Button>);
    expect(screen.getByText("Test Button")).toBeInTheDocument();
  });
});
