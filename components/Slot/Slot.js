import styled, { css, keyframes } from "styled-components";

import { USER_ROLE_RED, USER_ROLE_YELLOW } from "@/utils/constants";

const dropAnimation = keyframes`
  0% { transform: translateY(-150px); }
  60% { transform: translateY(10px); }
  80% { transform: translateY(-5px); }
  100% { transform: translateY(0); }
`;

const StyledSlot = styled.div.attrs({ role: "button " })`
  position: relative;
  width: 50px;
  height: 50px;
  border: 1px solid rgb(var(--color-black));
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  background-color: rgb(var(--color-white));

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${({ value }) =>
      value === USER_ROLE_RED
        ? `rgb(var(--color-red))`
        : value === USER_ROLE_YELLOW
        ? `rgb(var(--color-yellow))`
        : `rgb(var(--color-white))`};
    animation: ${({ value }) =>
      value
        ? css`
            ${dropAnimation} 0.5s ease
          `
        : "none"};
    border-radius: 50%;
  }
`;

const Slot = ({ value, onClick, disabled }) => {
  return <StyledSlot value={value} onClick={onClick} disabled={disabled} />;
};

export default Slot;
