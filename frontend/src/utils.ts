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

export const createDummyUser = (): LoggedInUser => {
  const date = new Date();
  let thisDay = date.getDate() - 1;
  const thisMonth = date.getMonth();
  const thisYear = date.getFullYear();

  const yesterdayObj = {
    thisDay,
    thisMonth,
    thisYear,
  };

  const dummyUser = {
    username: 'DummyUser',
    id: 'gadhqehqhh',
    habits: [
      {
        name: 'DummyHabit',
        id: 'h4q2h4h42h2',
        completions: [
          {
            ...yesterdayObj,
          },
        ],
      },
    ],
  };

  return dummyUser;
};
