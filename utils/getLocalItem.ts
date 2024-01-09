const getLocalItem = (item: string) => {
  if (typeof window !== 'undefined') return localStorage.getItem(item);
};

export default getLocalItem;
