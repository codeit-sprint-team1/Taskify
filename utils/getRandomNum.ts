//0~9 중 배정
export const getIdToNum = (userId: number) => {
  const num = userId % 10;
  return num;
};

export const getTextToNum = (text: string) => {
  let num = 0;
  for (let i = 0; i < text.length; i++) {
    num += text.charCodeAt(i);
  }
  return num % 10;
};
