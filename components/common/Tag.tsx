import Image from 'next/image';
import { MouseEvent } from 'react';
import cancelIcon from '@/public/icons/cancel-icon.svg';
import { getTextToNum } from '@/utils/getRandomNum';

interface TagProps {
  tag: string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  isEdit?: boolean;
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
  9: 'bg-pastelred',
};

interface RandomColorComb {
  [key: string]: string;
}
export const RANDOM_COLOR_COMB: RandomColorComb = {
  'bg-lightgreen': 'text-green',
  'bg-lightpurple': 'text-purple',
  'bg-lightorange': 'text-orange',
  'bg-pastelblue': 'text-blue',
  'bg-lightpink': 'text-pink',
  'bg-gray30': 'text-gray60',
  'bg-lightbrown': 'text-brown',
  'bg-yellow': 'text-greenyellow',
  'bg-pastelnavy': 'text-lightblue',
  'bg-pastelred': 'text-lightred',
};

export default function Tag({ tag, onClick, isEdit = false }: TagProps) {
  const num = getTextToNum(tag ?? '텍스트');
  const bg = RANDOM_COLORS[num];
  const text = RANDOM_COLOR_COMB[bg];
  return (
    <div
      className={`inline-flex whitespace-nowrap items-center gap-5pxr py-4pxr px-6pxr border rounded-md ${bg}`}
    >
      <span className={`text-12pxr ${text}`}>{tag}</span>
      {isEdit && (
        <button onClick={onClick}>
          <Image src={cancelIcon} alt="태그 삭제 아이콘" />
        </button>
      )}
    </div>
  );
}
