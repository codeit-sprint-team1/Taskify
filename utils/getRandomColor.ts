import { COLOR_COMB } from '@/constants/constants';

const colors = Object.keys(COLOR_COMB);

const getRandomColor = () => {
  const num = Math.floor(Math.random() * 10);
  return colors[num];
};

export default getRandomColor;
