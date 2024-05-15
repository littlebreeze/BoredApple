import { Howl } from 'howler';

export default function effectSound(src: string, volume: number = 1) {
  const sound = new Howl({ src, volume });
  return sound;
}
