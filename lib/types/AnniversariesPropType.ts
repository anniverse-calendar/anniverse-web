export type Anniversary = {
  name: string;
  description: string;
  author: string;
  authorUrl: string;
  isEmpty: boolean;
};

export type AnniversariesPropType = {
  calendar: {
    [month: number]: {
      [day: number]: Anniversary;
    };
  };
};
