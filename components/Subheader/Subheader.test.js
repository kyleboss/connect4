import React from "react";
import { render } from "@testing-library/react";

import Subheader from "./Subheader";

describe("Subheader", () => {
  it("renders correctly", () => {
    const { asFragment } = render(<Subheader>Sample Text</Subheader>);
    expect(asFragment()).toMatchSnapshot();
  });
});
