import { RANDOM_COLOR_COMB } from '@/constants/constants';

const colors = Object.keys(RANDOM_COLOR_COMB);

//10개 색상 중 하나 배정 ex. bg-lightgreen
const getRandomColor = () => {
  const num = Math.floor(Math.random() * 10);
  return colors[num];
};

export default getRandomColor;

//#0~#9 사이 랜덤
export const getRandomNumber = () => {
  const num = Math.floor(Math.random() * 10);
  return `#${num}`;
};
