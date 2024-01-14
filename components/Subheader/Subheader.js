import styled from "styled-components";
import { TABLET_AND_LARGER_SIZE } from "@/utils/constants";

const Subheader = styled.h2`
  font-size: 1rem;
  margin-bottom: 30px;
  font-weight: 800;
  font-style: italic;
  text-align: center;

  @media (min-width: ${TABLET_AND_LARGER_SIZE}) {
    font-size: 2rem;
    margin-bottom: 50px;
  }
`;

export default Subheader;
