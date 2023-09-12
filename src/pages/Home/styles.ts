import styled from "styled-components";
import { breakpoints } from "@/shared/themes/breakpoints";

export const StyledSectionWrapper = styled.section`
  display: flex;
  flex-direction: column;
  width: 68.3%;

  @media screen and (max-width: ${breakpoints.sm}) {
    width: 80%;
  }
`

export const StyledNavWrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;

  @media screen and (max-width: ${breakpoints.sm}) {
    display: block;
    margin-inline: auto;
  }
`
export const StyledProductsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
`