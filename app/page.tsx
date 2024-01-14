'use client'
import dynamic from 'next/dynamic';
import styled from 'styled-components';

import { GameProvider } from '@/state/GameContext';
import SoundEffects from '@/components/SoundEffects'
import ConfettiAnimation from '@/components/ConfettiAnimation'
const Game = dynamic(() => import('@/components/Game'), {
  ssr: false,
})

const Container = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;


export default function Home() {
  return (
    <Container>
      <GameProvider>
        <Game />
        <SoundEffects />
        <ConfettiAnimation />
      </GameProvider>
    </Container>
  )
}
