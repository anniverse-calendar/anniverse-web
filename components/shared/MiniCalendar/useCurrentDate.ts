import dayjs from 'dayjs';
import { useReducer } from 'react';

type Current = {
  year: number;
  month: number;
};

type Action =
  | {
      type: 'addMonth';
      payload: number;
    }
  | {
      type: 'addYear';
      payload: number;
    };

function reducer(state: Current, action: Action) {
  const current = dayjs(new Date(state.year, state.month - 1, 1));
  switch (action.type) {
    case 'addMonth': {
      const newDate = current.add(action.payload, 'month');
      return {
        year: newDate.year(),
        month: newDate.month() + 1,
      };
    }
    case 'addYear': {
      const newDate = current.add(action.payload, 'year');
      return {
        year: newDate.year(),
        month: newDate.month() + 1,
      };
    }
    default:
      throw new Error();
  }
}

export const useCalendarDate = (year?: number, month?: number) =>
  useReducer(reducer, {
    year: year ?? dayjs().year(),
    month: month ?? dayjs().month() + 1,
  });
