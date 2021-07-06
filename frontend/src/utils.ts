import { LoggedInUser } from './types';

export const consts = {
  appName: 'Simplify Success',
};

export const fetchWithTimeout = async (url: string, options?: RequestInit) => {
  const timeout = 12000;

  const controller = new AbortController();
  const signal = controller.signal;

  const ticToc = setTimeout(() => controller.abort(), timeout);

  const response = await fetch(url, {
    ...options,
    signal,
  });
  clearTimeout(ticToc);

  return response;
};

export const stringShortener = (value: string, maxVal?: number) => {
  const maxLength = maxVal ? maxVal : 36;
  if (value.length > maxLength) {
    const truncatedString = value.substr(0, maxLength).concat('...');
    return truncatedString;
  } else {
    return value;
  }
};
