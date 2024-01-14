import styled from "styled-components";

const StyledButton = styled.button`
  font-size: 2rem;
  padding: 1.5rem 2rem;
  opacity: 0.9;
  transition: opacity 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  border-radius: 10px;

  &:hover {
    opacity: 1;
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
  }
`;

const Button = ({ children, onClick }) => {
  return <StyledButton onClick={onClick}>{children}</StyledButton>;
};

export default Button;
