import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import lottie from "lottie-web";

import confetti from "@/animations/confetti.json";
import useGame from "@/hooks/useGame";
import { GAME_STATE_GAME_OVER } from "@/utils/constants";

const AnimationContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
`;

const ConfettiAnimation = () => {
  const animationContainer = useRef(null);
  const { userRole, gameState, winner } = useGame();
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    let confettiTimeout;
    if (gameState === GAME_STATE_GAME_OVER && winner === userRole) {
      setShowConfetti(true);
      confettiTimeout = setTimeout(() => setShowConfetti(false), 5000);
    }

    return () => {
      setShowConfetti(false);
      clearTimeout(confettiTimeout);
    };
  }, [gameState, userRole, winner]);

  useEffect(() => {
    const anim = lottie.loadAnimation({
      container: animationContainer.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: confetti,
    });

    if (showConfetti) {
      anim.goToAndPlay(0);
    } else {
      anim.stop();
    }

    return () => anim.destroy();
  }, [showConfetti]);

  return <AnimationContainer ref={animationContainer} />;
};

export default ConfettiAnimation;
