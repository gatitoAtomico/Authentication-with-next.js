import styled from "styled-components";
import loadingAnimation from "../public/assets/animations/tioLoader.json";
import { Lottie } from "./Lottie";

const LoadingContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const Loader = () => {
  return (
    <LoadingContainer>
      <Lottie
        animationData={loadingAnimation}
        mBottom="0"
        autoPlay={true}
        loop={true}
        width={100}
        height={100}
      />
    </LoadingContainer>
  );
};
