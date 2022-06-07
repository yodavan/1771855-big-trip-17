import dayjs from 'dayjs';

const filter = {
  'everything': ( points ) => points,
  'future': ( points ) => points.filter(({ dateFrom }) => new Date < dayjs( dateFrom )),
  'past': ( points ) => points.filter(({ dateFrom }) => new Date > dayjs( dateFrom )),
};

export { filter };
