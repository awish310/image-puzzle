import { styled } from "styled-components";

const Instructions = () => {
  return (
    <Wrapper>
      <Text>Please draw a path to create a puzzle piece</Text>
    </Wrapper>
  );
};

export default Instructions;

const Wrapper = styled.div`
  width: 100%;
  padding: 24px 0;
  position: absolute;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Text = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.color.bright};
  font-size: 24px;
`;
