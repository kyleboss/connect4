import styled from "styled-components";
import { TABLET_AND_LARGER_SIZE } from "@/utils/constants";

const Header = styled.h1`
  font-size: 3rem;
  margin-bottom: 10px;
  font-weight: 800;
  text-align: center;

  @media (min-width: ${TABLET_AND_LARGER_SIZE}) {
    font-size: 4rem;
    margin-bottom: 20px;
  }
`;

export default Header;
