import styled, { keyframes } from "styled-components";

const pulse = keyframes`
  0%, 100% {
    opacity: 0.6;
    transform: scale(0.98);
  }

  50% {
    opacity: 1;
    transform: scale(1);
  }
`;

const dotBounce = keyframes`
  0%, 80%, 100% {
    transform: translateY(0);
    opacity: 0.4;
  }

  40% {
    transform: translateY(-6px);
    opacity: 1;
  }
`;

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const StyledOverlay = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #f8fbfd 0%, #eef6fa 100%);
`;

const LoaderContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Logo = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;

  background: #144c6f;
  color: white;
  font-size: 1.8rem;
  font-weight: 800;

  box-shadow: 0 10px 30px rgba(20, 76, 111, 0.2);

  animation: ${pulse} 1.8s infinite ease-in-out;
`;

const SchoolName = styled.h1`
  margin: 0;
  color: #144c6f;
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: -0.5px;

  animation: ${pulse} 1.8s infinite ease-in-out;
`;

const LoadingText = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  margin-top: 12px;

  color: #718096;
  font-size: 0.9rem;
`;

const Dot = styled.span`
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #144c6f;

  animation: ${dotBounce} 1.4s infinite ease-in-out;

  &:nth-child(2) {
    animation-delay: 0.2s;
  }

  &:nth-child(3) {
    animation-delay: 0.4s;
  }
`;

const SpinnerCircle = styled.div`
  width: 24px;
  height: 24px;
  margin-bottom: 18px;

  border: 3px solid #d9e7ef;
  border-top-color: #144c6f;
  border-radius: 50%;

  animation: ${spin} 0.9s linear infinite;
`;

export const Spinner = () => {
  return (
    <StyledOverlay>
      <LoaderContent>
        <Logo>S</Logo>

        <SpinnerCircle />

        <SchoolName>Scholar School</SchoolName>

        <LoadingText>
          Loading
          <Dot />
          <Dot />
          <Dot />
        </LoadingText>
      </LoaderContent>
    </StyledOverlay>
  );
};
