import { LoggedInUser } from './types';

export const consts = {
  appName: 'Simplify Success',
};

export const dummyUser: LoggedInUser = {
  username: 'DummyDude',
  id: 'hasddhw4hww55',
  habits: [
    {
      completions: [
        {
          thisDay: 5,
          thisMonth: 4,
          thisYear: 2021,
        },
        {
          thisDay: 6,
          thisMonth: 4,
          thisYear: 2021,
        },
        {
          thisDay: 7,
          thisMonth: 4,
          thisYear: 2021,
        },
        {
          thisDay: 8,
          thisMonth: 4,
          thisYear: 2021,
        },
      ],
      id: 'sagassagsa',
      name: 'Pelaa Heroesta',
    },
    {
      completions: [
        {
          thisDay: 5,
          thisMonth: 4,
          thisYear: 2021,
        },
        {
          thisDay: 6,
          thisMonth: 4,
          thisYear: 2021,
        },
        {
          thisDay: 7,
          thisMonth: 4,
          thisYear: 2021,
        },
        {
          thisDay: 8,
          thisMonth: 4,
          thisYear: 2021,
        },
      ],
      id: 'sagassag322sa',
      name: 'A long walk',
    },
    {
      completions: [
        {
          thisDay: 5,
          thisMonth: 4,
          thisYear: 2021,
        },
        {
          thisDay: 6,
          thisMonth: 4,
          thisYear: 2021,
        },
        {
          thisDay: 7,
          thisMonth: 4,
          thisYear: 2021,
        },
        {
          thisDay: 8,
          thisMonth: 4,
          thisYear: 2021,
        },
      ],
      id: 'sagassaggagasgsa',
      name: 'See a friend',
    },
  ],
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
