import React from "react";
import { render } from "@testing-library/react";

import Slot from "./Slot";
import { USER_ROLE_RED, USER_ROLE_YELLOW } from "@/utils/constants";

describe("Slot", () => {
  it("renders an empty slot correctly", () => {
    const { asFragment } = render(<Slot />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders a red slot correctly", () => {
    const { asFragment } = render(<Slot value={USER_ROLE_RED} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders a yellow slot correctly", () => {
    const { asFragment } = render(<Slot value={USER_ROLE_YELLOW} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders a disabled slot correctly", () => {
    const { getByRole } = render(<Slot disabled />);
    const slot = getByRole("button");
    expect(slot).toHaveStyle("cursor: default");
  });
});
