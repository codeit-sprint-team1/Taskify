import { getTextToNum } from '@/utils/getRandomNum';

interface ColumnStateProps {
  state: string;
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

export const RANDOM_COLOR_CIRCLE: RandomColorComb = {
  'bg-lightgreen': 'bg-green',
  'bg-lightpurple': 'bg-purple',
  'bg-lightorange': 'bg-orange',
  'bg-pastelblue': 'bg-blue',
  'bg-lightpink': 'bg-pink',
  'bg-gray30': 'bg-gray60',
  'bg-lightbrown': 'bg-brown',
  'bg-yellow': 'bg-greenyellow',
  'bg-pastelnavy': 'bg-lightblue',
  'bg-pastelred': 'bg-lightred',
};

export default function ColumnState({ state }: ColumnStateProps) {
  const num = getTextToNum(state ?? '텍스트');
  const bg = RANDOM_COLORS[num + 1];
  const text = RANDOM_COLOR_COMB[bg];
  const circle = RANDOM_COLOR_CIRCLE[bg];
  return (
    <div
      className={`inline-flex whitespace-nowrap items-center h-22pxr gap-6pxr px-8pxr border rounded-xl ${bg}`}
    >
      <div className={`rounded-full ${circle} w-6pxr h-6pxr`}></div>
      <span className={`text-12pxr ${text}`}>{state}</span>
    </div>
  );
}
