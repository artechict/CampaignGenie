
export const isRTL = (text: string): boolean => {
  const rtlChars = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;
  return rtlChars.test(text);
};

export const getDir = (text: string): "rtl" | "ltr" => {
  return isRTL(text) ? "rtl" : "ltr";
};
