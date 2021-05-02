export const consts = {
  appName: 'Simplify Success',
};

export const stringShortener = (value: string, maxVal?: number) => {
  let maxLength = maxVal ? maxVal : 26;
  if (value.length > maxLength) {
    const truncatedString = value.substr(0, maxLength).concat('...');
    return truncatedString;
  } else {
    return value;
  }
};
