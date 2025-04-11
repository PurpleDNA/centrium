export const saveScrollPosition = (key: string) => {
  sessionStorage.setItem(`scroll-pos-${key}`, "2000");
  console.log(sessionStorage.getItem(`scroll-pos-${key}`) + "  home");
};

export const getScrollPosition = (key: string): number => {
  const value = sessionStorage.getItem(`scroll-pos-${key}`);
  return value ? parseInt(value, 10) : 0;
};
