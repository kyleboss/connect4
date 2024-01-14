import { useCallback, useEffect, useState, useRef } from "react";
import useSound from "use-sound";
import styled, { css, keyframes } from "styled-components";

import notificationSound from "@/sounds/notification.mp3";
import winnerSound from "@/sounds/winner.mp3";
import useGame from "@/hooks/useGame";

const shakeAnimation = keyframes`
  0% { transform: rotate(0deg); }
  20% { transform: rotate(-10deg); }
  40% { transform: rotate(10deg); }
  60% { transform: rotate(-5deg); }
  80% { transform: rotate(5deg); }
  100% { transform: rotate(0deg); }
`;

const Container = styled.span.attrs({ role: "button" })`
  font-size: 3rem;
  position: fixed;
  bottom: 20px;
  left: 20px;
  transition: transform 0.3s ease;
  cursor: pointer;

  &:hover {
    animation: ${css`
      ${shakeAnimation} 0.5s ease-in-out
    `};
  }
`;

const SoundEffects = () => {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [playWinnerSound] = useSound(winnerSound);
  const [playNotificationSound] = useSound(notificationSound);
  const { currentPlayer, userRole, winner } = useGame();
  const justEnabledSound = useRef(false);

  useEffect(() => {
    if (
      soundEnabled &&
      currentPlayer === userRole &&
      !justEnabledSound.current
    ) {
      playNotificationSound();
    }

    justEnabledSound.current = false;
  }, [currentPlayer, playNotificationSound, soundEnabled, userRole]);

  useEffect(() => {
    if (soundEnabled && winner === userRole) {
      playWinnerSound();
    }
  }, [currentPlayer, playWinnerSound, soundEnabled, userRole, winner]);

  const handleClick = useCallback(() => {
    setSoundEnabled((prevSoundEnabled) => {
      if (!prevSoundEnabled) {
        justEnabledSound.current = true;
      }
      return !prevSoundEnabled;
    });
  }, []);

  return (
    <Container onClick={handleClick}>{soundEnabled ? "🔔" : "🔕"}</Container>
  );
};

export default SoundEffects;
