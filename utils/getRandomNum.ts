//0~9 중 배정
const getRandomNum = (userId: number) => {
  const num = userId % 10;
  return num;
};

export default getRandomNum;
