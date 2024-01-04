import Image from 'next/image';
import { getIdToNum } from '@/utils/getRandomNum';

export interface ProfileImageProps {
  userId: number | null;
  name: string;
  src: string | null;
  size?: string;
  textDiv?: boolean;
}

interface RandomColors {
  [key: number]: string;
}

const RANDOM_COLORS: RandomColors = {
  0: 'bg-lightgreen',
  1: 'bg-lightpurple',
  2: 'bg-lightorange',
  3: 'bg-pastelblue',
  4: 'bg-lightpink',
  5: 'bg-gray30',
  6: 'bg-lightbrown',
  7: 'bg-yellow',
  8: 'bg-pastelnavy',
  9: 'bg-lightred',
};

export default function ProfileImage({
  name,
  src,
  size,
  userId,
  textDiv,
}: ProfileImageProps) {
  const divSize = size === 'sm' ? 'w-26pxr h-26pxr' : 'w-38pxr h-38pxr';
  const num = getIdToNum(userId ?? 0);
  const bg = RANDOM_COLORS[num];
  return (
    <div
      className={`rounded-full flex-center  border-2 border-white relative overflow-hidden ${
        src ? `bg-gray20` : bg
      } ${divSize}`}
    >
      {src ? (
        <Image src={src} alt="프로필 이미지" fill />
      ) : (
        <p className="text-white">{textDiv ? name : name[0]}</p>
      )}
    </div>
  );
}
