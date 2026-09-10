import styled, { keyframes } from "styled-components";

const pulse = keyframes`
  0% {
    opacity: 0.4;
    transform: scale(0.98);
  }

  50% {
    opacity: 1;
    transform: scale(1);
  }

  100% {
    opacity: 0.4;
    transform: scale(0.98);
  }
`;

const StyledOverlay = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SchoolName = styled.h1`
  color: #144c6f;
  font-size: 2.5rem;
  font-weight: 700;
  animation: ${pulse} 1.5s infinite ease-in-out;
`;

export const Spinner = () => {
  return (
    <StyledOverlay>
      <SchoolName>Scholar School</SchoolName>
    </StyledOverlay>
  );
};
