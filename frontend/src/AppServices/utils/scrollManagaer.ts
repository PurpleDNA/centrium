export const saveScrollPosition = (key: string, scrolled: number) => {
  sessionStorage.setItem(`scroll-pos-${key}`, scrolled.toString());
  // console.log(scrolled);
};

export const getScrollPosition = (key: string): number => {
  const value = sessionStorage.getItem(`scroll-pos-${key}`);
  return value ? parseInt(value, 10) : 0;
};
