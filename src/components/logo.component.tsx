import LogoSvg from "../assets/logo.svg";
import styled from "styled-components";

export const Logo = styled.img.attrs(() => ({
  src: LogoSvg,
}))`
  width: 40px;
  height: 32px;
`;
