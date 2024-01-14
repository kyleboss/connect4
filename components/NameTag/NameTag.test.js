import React from "react";
import { render } from "@testing-library/react";

import NameTag from "./NameTag";
import useGame from "../../hooks/useGame";
import { USER_ROLE_RED, USER_ROLE_YELLOW } from "../../utils/constants";

jest.mock("../../hooks/useGame", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("NameTag", () => {
  it("renders the user role correctly", () => {
    useGame.mockImplementation(() => ({
      userRole: USER_ROLE_RED,
    }));

    const { getByText } = render(<NameTag />);
    expect(getByText("Red")).toBeInTheDocument();
  });

  it("matches the snapshot for a specific user role", () => {
    useGame.mockImplementation(() => ({
      userRole: USER_ROLE_YELLOW,
    }));

    const { asFragment } = render(<NameTag />);
    expect(asFragment()).toMatchSnapshot();
  });
});
