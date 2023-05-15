import { styled } from "styled-components";

const Header = () => (
  <Wrapper>
    <Title>Image Puzzle</Title>
  </Wrapper>
);

export default Header;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: ${({ theme }) => theme.height.header}px;
`;

export const Title = styled.h1`
  color: ${({ theme }) => theme.color.bright || "#FFF"};
  margin: 32px 0 0;
`;
