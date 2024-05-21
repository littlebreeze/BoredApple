'use client';

import Image from 'next/image';
import ReactHowler from 'react-howler';

import soundOn from '@/../public/game/soundOn.svg';
import soundOff from '@/../public/game/soundOff.svg';
import bgm from '@/../public/sound/bgm.mp3';
import { useSoundControlStore } from '@/stores/sound-control';

export default function SoundSection() {
  const { isWaitingPage, isPlaying, setIsPlaying } = useSoundControlStore();

  return (
    <>
      <ReactHowler
        src={bgm}
        loop={true}
        playing={isPlaying}
        volume={0.05}
      />
      {isWaitingPage ? (
        <div
          className='absolute bottom-24 right-12 w-16 h-16 duration-150 hover:w-20 hover:h-20'
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {!isPlaying ? (
            <Image
              className='w-full drop-shadow-[2px_2px_2px_rgba(0,0,0,0.3)]'
              src={soundOff}
              alt='음소거상태'
            />
          ) : (
            <Image
              className='w-full drop-shadow-[2px_2px_2px_rgba(0,0,0,0.3)]'
              src={soundOn}
              alt='재생상태'
            />
          )}
        </div>
      ) : null}
    </>
  );
}
